"use client"
import React, { useState, useEffect } from 'react'
import { Calendar, User, Clock, Heart, MessageSquare, Eye, Search, Filter, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Wrapper from '@/app/wrapper/page'

export default function BlogListPage() {
    const router = useRouter()
    const [blogs, setBlogs] = useState([])
    const [filteredBlogs, setFilteredBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchBlogs()
    }, [])

    useEffect(() => {
        filterBlogs()
    }, [blogs, searchTerm, selectedCategory])

    const fetchBlogs = async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/blog?published=true')
            const data = await res.json()

            if (data.success) {
                setBlogs(data.data)
                // Extract unique categories
                const uniqueCategories = [...new Set(data.data.map(blog => blog.category).filter(Boolean))]
                setCategories(uniqueCategories)
            } else {
                toast.error('Failed to load blogs')
            }
        } catch (error) {
            toast.error('Failed to load blogs')
        } finally {
            setLoading(false)
        }
    }

    const filterBlogs = () => {
        let filtered = [...blogs]

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(blog =>
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(blog => blog.category === selectedCategory)
        }

        // Sort by date (newest first)
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

        setFilteredBlogs(filtered)
    }

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
        return num.toString()
    }

    const getTimeAgo = (date) => {
        const now = new Date()
        const past = new Date(date)
        const diff = now - past
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))

        if (days === 0) return 'Today'
        if (days === 1) return 'Yesterday'
        if (days < 7) return `${days} days ago`
        if (days < 30) return `${Math.floor(days / 7)} weeks ago`
        if (days < 365) return `${Math.floor(days / 30)} months ago`
        return `${Math.floor(days / 365)} years ago`
    }

    const handleBlogClick = (slug) => {
        router.push(`/blog/${slug}`)
    }

    if (loading) {
        return (
            <Wrapper whiteLogo>
                <div className="min-h-screen flex items-center justify-center bg-gray-50 mt-20">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
                        <p className="text-gray-600">Loading blogs...</p>
                    </div>
                </div>
            </Wrapper>
        )
    }

    return (
        <Wrapper whiteLogo>
            <div className="min-h-screen bg-gray-50 mt-[70px]">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white">
                    <div className="max-w-7xl mx-auto px-4 py-16">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                PubShine Blog
                            </h1>
                            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                                Insights, tips, and updates on digital advertising and monetization
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search articles..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                                    />
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div className="flex items-center gap-2">
                                <Filter className="text-gray-400 w-5 h-5" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                                >
                                    <option value="all">All Categories</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Blog Grid */}
                    {filteredBlogs.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No blogs found</h3>
                            <p className="text-gray-600">
                                {searchTerm || selectedCategory !== 'all'
                                    ? 'Try adjusting your search or filter'
                                    : 'No blog posts available yet'}
                            </p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredBlogs.map((blog) => (
                                <article
                                    key={blog._id}
                                    onClick={() => handleBlogClick(blog.slug)}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                                >
                                    {/* Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        {blog.image ? (
                                            <img
                                                src={blog.image}
                                                alt={blog.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                                <MessageSquare className="w-16 h-16 text-gray-400" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Category & Date */}
                                        <div className="flex items-center gap-3 mb-3">
                                            {blog.category && (
                                                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                                                    {blog.category}
                                                </span>
                                            )}
                                            <span className="text-xs text-gray-500">
                                                {getTimeAgo(blog.createdAt)}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                                            {blog.title}
                                        </h2>

                                        {/* Excerpt */}
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            {blog.excerpt}
                                        </p>

                                        {/* Meta Info */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Eye className="w-4 h-4" />
                                                    <span>{formatNumber(blog.views || 0)}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Heart className="w-4 h-4" />
                                                    <span>{formatNumber(blog.likes || 0)}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MessageSquare className="w-4 h-4" />
                                                    <span>{formatNumber(blog.commentsCount || 0)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Author */}
                                        <div className="flex items-center gap-2 mt-4">
                                            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                                {blog.author?.charAt(0) || 'P'}
                                            </div>
                                            <span className="text-sm text-gray-700 font-medium">
                                                {blog.author || 'PubShine Team'}
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                
                </div>
            </div>
        </Wrapper>
    )
}