"use client"
import React, { useState, use, useEffect } from 'react'
import { Calendar, User, Clock, Heart, MessageSquare, Send, ChevronDown, ChevronUp, ArrowLeft, X, Share2 } from 'lucide-react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Wrapper from '@/app/wrapper/page'

export default function BlogPostPage({ params }) {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [liked, setLiked] = useState(false)
    const [commentText, setCommentText] = useState('')
    const [replyTo, setReplyTo] = useState(null)
    const [expandedComments, setExpandedComments] = useState(new Set())
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [authAction, setAuthAction] = useState(null) // 'like' or 'comment'
    const slug = use(params)?.slug

    useEffect(() => {
        if (slug) {
            fetchBlog()
        }
    }, [slug])

    const fetchBlog = async () => {
        try {
            setLoading(true)
            const res = await fetch(`/api/blog/slug/${slug}`)
            const data = await res.json()

            if (data.success) {
                setPost(data.data)
                setComments(data.data.comments || [])
            } else {
                toast.error('Blog post not found')
                router.push('/blog')
            }
            setLoading(false)
        } catch (error) {
            toast.error('Failed to load blog post')
            router.push('/blog')
        } finally {
            setLoading(false)
        }
    }

    const requireAuth = (action) => {
        if (!session) {
            setAuthAction(action)
            setShowAuthModal(true)
            return false
        }
        return true
    }

    const handleLike = async () => {
        if (!requireAuth('like')) return

        try {
            const method = liked ? 'DELETE' : 'POST'
            const res = await fetch(`/api/blog/slug/${slug}/like`, { method })
            const data = await res.json()

            if (data.success) {
                setLiked(!liked)
                setPost(prev => ({
                    ...prev,
                    likes: prev.likes + (liked ? -1 : 1)
                }))
                toast.success(liked ? 'Like removed' : 'Post liked!')
            }
        } catch (error) {
            toast.error('Failed to update like')
        }
    }

    const handleCommentSubmit = async (e, parentId = null) => {
        e.preventDefault()

        if (!requireAuth('comment')) return

        if (!commentText.trim()) {
            toast.error('Please enter a comment')
            return
        }

        try {
            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    blogSlug: slug,
                    parentId,
                    userName: session.user.name || session.user.email,
                    userEmail: session.user.email,
                    text: commentText
                })
            })

            const data = await res.json()

            if (data.success) {
                toast.success('Comment added successfully')
                setCommentText('')
                setReplyTo(null)
                fetchBlog()
            } else {
                toast.error(data.message || 'Failed to add comment')
            }
        } catch (error) {
            toast.error('Failed to add comment')
        }
    }

    const toggleCommentExpansion = (commentId) => {
        setExpandedComments(prev => {
            const newSet = new Set(prev)
            if (newSet.has(commentId)) {
                newSet.delete(commentId)
            } else {
                newSet.add(commentId)
            }
            return newSet
        })
    }

    const shareOnTwitter = () => {
        const url = window.location.href
        const text = post.title
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank')
    }

    const shareOnFacebook = () => {
        const url = window.location.href
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
    }

    const shareOnLinkedIn = () => {
        const url = window.location.href
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
    }

    const copyToClipboard = () => {
        const url = window.location.href
        navigator.clipboard.writeText(url)
        toast.success('Link copied to clipboard!')
    }

    const ShareButtons = () => (
        <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-700">
                    <Share2 className="w-5 h-5" />
                    <span className="font-semibold">Share this post:</span>
                </div>
                <div className="flex items-center gap-3">
                    {/* Twitter/X */}
                    <button
                        onClick={shareOnTwitter}
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                        title="Share on X (Twitter)"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                    </button>

                    {/* Facebook */}
                    <button
                        onClick={shareOnFacebook}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        title="Share on Facebook"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        {/* <span>Facebook</span> */}
                    </button>

                    {/* LinkedIn */}
                    <button
                        onClick={shareOnLinkedIn}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                        title="Share on LinkedIn"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        {/* <span>LinkedIn</span> */}
                    </button>

                    {/* Copy Link */}
                    <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        title="Copy link"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Copy</span>
                    </button>
                </div>
            </div>
        </div>
    )

    const CommentItem = ({ comment, depth = 0 }) => {
        const hasReplies = comment.replies && comment.replies.length > 0
        const isExpanded = expandedComments.has(comment._id)

        return (
            <div className={`${depth > 0 ? 'ml-8 mt-4' : 'mt-6'}`}>
                <div className="flex gap-3">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-orange-600" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <p className="font-semibold text-gray-900">{comment.userName}</p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(comment.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-700">{comment.text}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                            <button
                                onClick={() => {
                                    if (requireAuth('comment')) {
                                        setReplyTo(comment._id)
                                    }
                                }}
                                className="text-orange-600 hover:text-orange-700 font-medium"
                            >
                                Reply
                            </button>
                            {hasReplies && (
                                <button
                                    onClick={() => toggleCommentExpansion(comment._id)}
                                    className="flex items-center gap-1 text-gray-600 hover:text-gray-700"
                                >
                                    {isExpanded ? (
                                        <>
                                            <ChevronUp className="w-4 h-4" />
                                            Hide {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                                        </>
                                    ) : (
                                        <>
                                            <ChevronDown className="w-4 h-4" />
                                            Show {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                                        </>
                                    )}
                                </button>
                            )}
                        </div>

                        {replyTo === comment._id && (
                            <form onSubmit={(e) => handleCommentSubmit(e, comment._id)} className="mt-4">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        placeholder="Write a reply..."
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                                        autoFocus
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setReplyTo(null)
                                            setCommentText('')
                                        }}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}

                        {hasReplies && isExpanded && (
                            <div className="mt-4">
                                {comment.replies.map(reply => (
                                    <CommentItem key={reply._id} comment={reply} depth={depth + 1} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    // Auth Modal Component
    const AuthModal = () => (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-200">
                <button
                    onClick={() => setShowAuthModal(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        {authAction === 'like' ? (
                            <Heart className="w-8 h-8 text-orange-600" />
                        ) : (
                            <MessageSquare className="w-8 h-8 text-orange-600" />
                        )}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Sign in to continue
                    </h3>
                    <p className="text-gray-600">
                        {authAction === 'like'
                            ? 'Sign in to like this post and show your support'
                            : 'Sign in to join the conversation and share your thoughts'
                        }
                    </p>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() =>{ localStorage.setItem('postAuthRedirect', `/blog/${slug}`); signIn('google') }}
                        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>

                    <button
                        onClick={() => router.push(`/auth?redirect=/blog/${slug}`)}
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
                    >
                        Sign in with Email
                    </button>
                </div>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?{' '}
                    <button
                        onClick={() => router.push(`/blog/auth?redirect=/blog/${slug}`)}
                        className="text-orange-600 hover:text-orange-700 font-semibold"
                    >
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    )

    if (loading) {
        return (
            <Wrapper whiteLogo>
                <div className="min-h-screen flex items-center justify-center mt-20">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
                        <p className="text-gray-600">Loading blog post...</p>
                    </div>
                </div>
            </Wrapper>
        )
    }

    if (!post) {
        return (
            <Wrapper whiteLogo>
                <div className="min-h-screen flex items-center justify-center mt-20">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Blog post not found</h2>
                        <button
                            onClick={() => router.push('/blog')}
                            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                        >
                            Back to Blog
                        </button>
                    </div>
                </div>
            </Wrapper>
        )
    }

    return (
        <Wrapper whiteLogo>
            <div className="min-h-screen bg-gray-50 !text-black mt-[70px]">
                {/* Auth Modal */}
                {showAuthModal && <AuthModal />}

                {/* Navigation */}
                <nav className="bg-white border-b sticky top-[70px] z-40">
                    <div className="max-w-6xl mx-auto px-4 py-4">
                        <button
                            onClick={() => router.push('/blog')}
                            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back to Blog</span>
                        </button>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-orange-600 to-orange-800 text-white">
                    <div className="max-w-7xl mx-auto px-4 py-16">
                        <div className="text-center">
                            {post.category && (
                                <span className="inline-block bg-black bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium mb-4">
                                    {post.category}
                                </span>
                            )}
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                {post.title}
                            </h1>
                            <p className="text-xl text-orange-100 mb-8">
                                {post.excerpt}
                            </p>

                            <div className="flex items-center justify-center space-x-6 text-orange-100">
                                <div className="flex items-center space-x-2">
                                    <User className="w-4 h-4" />
                                    <span>{post.author}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{post.readTime || '5 min read'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-4 py-12">
                    {/* {post.image && (
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-96 object-cover rounded-xl mb-8"
                        />
                    )} */}

                    <article className="bg-white rounded-xl shadow-lg p-8 mb-8">
                        <div
                            className="prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {post.tags && post.tags.length > 0 && (
                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-8 pt-8 border-t border-gray-200 flex items-center gap-4">
                            <button
                                onClick={handleLike}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${liked
                                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                                <span>{post.likes || 0} Likes</span>
                            </button>
                            <div className="flex items-center gap-2 text-gray-600">
                                <MessageSquare className="w-5 h-5" />
                                <span>{comments.length} Comments</span>
                            </div>
                        </div>

                        <ShareButtons />
                    </article>

                    {/* Comments Section */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Comments</h3>

                        {session ? (
                            <form onSubmit={(e) => handleCommentSubmit(e)} className="mb-8">
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                            <User className="w-5 h-5 text-orange-600" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <textarea
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                            placeholder="Write a comment..."
                                            rows={3}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                                        />
                                        <div className="mt-2 flex justify-end">
                                            <button
                                                type="submit"
                                                className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                                            >
                                                <Send className="w-4 h-4" />
                                                Post Comment
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <div className="bg-gray-50 rounded-lg p-6 text-center mb-8">
                                <p className="text-gray-600 mb-4">Sign in to leave a comment</p>
                                <button
                                    onClick={() => {
                                        setAuthAction('comment')
                                        setShowAuthModal(true)
                                    }}
                                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                                >
                                    Sign In
                                </button>
                            </div>
                        )}

                        {comments.length > 0 ? (
                            <div className="space-y-6">
                                {comments.map(comment => (
                                    <CommentItem key={comment._id} comment={comment} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}