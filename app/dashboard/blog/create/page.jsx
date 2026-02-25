"use client"
import React, { useState, useEffect } from 'react'
import { ArrowLeft, Save, Eye, Image as ImageIcon, X, Globe, EyeOff, Hash, User, Type, FileText, Tag } from 'lucide-react'
import toast from 'react-hot-toast'

export default function BlogEditor({ blogId = null }) {
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        tags: [],
        image: '',
        published: false,
        author: 'PubShine Team'
    })
    const [tagInput, setTagInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [preview, setPreview] = useState(false)

    useEffect(() => {
        if (blogId) {
            fetchBlog()
        }
    }, [blogId])

    const fetchBlog = async () => {
        try {
            setLoading(true)
            const res = await fetch(`/api/blog/${blogId}`)
            const data = await res.json()

            if (data.success) {
                setFormData(data.data)
            }
        } catch (error) {
            toast.error('Failed to fetch blog')
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleAddTag = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault()
            if (!formData.tags.includes(tagInput.trim())) {
                setFormData(prev => ({
                    ...prev,
                    tags: [...prev.tags, tagInput.trim()]
                }))
            }
            setTagInput('')
        }
    }

    const handleRemoveTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.title || !formData.excerpt || !formData.content) {
            toast.error('Please fill in all required fields')
            return
        }

        try {
            setSaving(true)
            const url = blogId ? `/api/blog/${blogId}` : '/api/blog'
            const method = blogId ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (data.success) {
                toast.success(`Blog ${blogId ? 'updated' : 'created'} successfully`)
                setTimeout(() => {
                    window.location.href = '/dashboard/blog'
                }, 1500)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('Failed to save blog')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading blog post...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-orange-500 border-b border-gray-200 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div className="flex  items-center gap-4">
                            <button
                                onClick={() => window.location.href = '/dashboard/blog'}
                                className="flex items-center gap-2 text-gray-100 hover:text-gray-200 group hover:bg-gray-100 p-2 rounded-lg transition-all duration-200"
                            >
                                <ArrowLeft className="w-5 h-5 group-hover:text-orange-500" />
                                <span className="hidden sm:inline font-medium text-gray-200 group-hover:text-orange-500">Back</span>
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-white ">
                                    {blogId ? 'Edit Blog Post' : 'Create New Blog Post'}
                                </h1>
                                <p className="text-sm text-gray-100 mt-1">
                                    {blogId ? 'Update your existing blog post' : 'Write and publish a new blog post'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setPreview(!preview)}
                                className="flex items-center gap-2 px-4 py-2.5 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-all duration-200 shadow-sm hover:shadow"
                            >
                                {preview ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                <span className="font-medium">{preview ? 'Edit Mode' : 'Preview'}</span>
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={saving}
                                className="flex items-center cursor-pointer gap-2 bg-gradient-to-r from-orange-700 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                            >
                                <Save className="w-5 h-5" />
                                {saving ? (
                                    <span className="flex items-center gap-2">
                                        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                        Saving...
                                    </span>
                                ) : 'Save & Publish'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {preview ? (
                    /* Preview Mode */
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                        {formData.image && (
                            <div className="relative h-80 md:h-96 overflow-hidden">
                                <img
                                    src={formData.image}
                                    alt={formData.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                        )}
                        <div className="p-8 md:p-12">
                            <div className="max-w-4xl mx-auto">
                                <div className="flex items-center gap-4 mb-6">
                                    {formData.category && (
                                        <span className="px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                                            {formData.category}
                                        </span>
                                    )}
                                    {formData.published && (
                                        <span className="flex items-center gap-1.5 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                                            <Globe className="w-4 h-4" />
                                            Published
                                        </span>
                                    )}
                                </div>

                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    {formData.title || 'Untitled Post'}
                                </h1>

                                <div className="flex items-center gap-4 text-gray-600 mb-8 pb-8 border-b border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
                                            {formData.author.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{formData.author}</p>
                                            <p className="text-sm">Author</p>
                                        </div>
                                    </div>
                                    <div className="h-8 w-px bg-gray-300"></div>
                                    <div className="text-sm">
                                        <p className="font-medium text-gray-900">Last updated</p>
                                        <p className="text-gray-600">{new Date().toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="mb-10">
                                    <p className="text-xl text-gray-600 leading-relaxed">
                                        {formData.excerpt || 'No excerpt provided'}
                                    </p>
                                </div>

                                <div className="prose prose-lg max-w-none">
                                    <div
                                        className="leading-relaxed text-gray-700 space-y-6"
                                        dangerouslySetInnerHTML={{ __html: formData.content || '<p class="text-gray-400 italic">No content yet. Start writing your amazing blog post!</p>' }}
                                    />
                                </div>

                                {formData.tags.length > 0 && (
                                    <div className="mt-12 pt-8 border-t border-gray-200">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                            <Tag className="w-5 h-5" />
                                            Tags
                                        </h3>
                                        <div className="flex flex-wrap gap-3">
                                            {formData.tags.map(tag => (
                                                <span key={tag} className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg font-medium shadow-sm">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Edit Mode */
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Main Content Section */}
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Left Column - Main Content */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Title */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-orange-100 rounded-lg">
                                            <Type className="w-5 h-5 text-orange-600" />
                                        </div>
                                        <div>
                                            <label className="block text-base font-semibold text-gray-900">
                                                Title
                                            </label>
                                            <p className="text-sm text-gray-500">Add a compelling title for your blog post</p>
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g., The Ultimate Guide to Google AdX"
                                        className="w-full px-4 py-3 text-2xl font-bold bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                </div>

                                {/* Excerpt */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <FileText className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <label className="block text-base font-semibold text-gray-900">
                                                Excerpt
                                            </label>
                                            <p className="text-sm text-gray-500">Brief summary of your blog post</p>
                                        </div>
                                    </div>
                                    <textarea
                                        name="excerpt"
                                        value={formData.excerpt}
                                        onChange={handleChange}
                                        placeholder="Write a short description that will make readers want to click..."
                                        rows={4}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all duration-200"
                                        required
                                    />
                                </div>

                                {/* Content */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-purple-100 rounded-lg">
                                            <FileText className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <label className="block text-base font-semibold text-gray-900">
                                                Content
                                            </label>
                                            <p className="text-sm text-gray-500">Write your main content (HTML supported)</p>
                                        </div>
                                    </div>
                                    <textarea
                                        name="content"
                                        value={formData.content}
                                        onChange={handleChange}
                                        placeholder="Start writing your amazing content here... You can use HTML tags for formatting."
                                        rows={16}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-sm resize-y transition-all duration-200"
                                        required
                                    />
                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-2">HTML Tips:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            <code className="px-2 py-1 bg-gray-200 rounded text-xs">&lt;h2&gt;Heading&lt;/h2&gt;</code>
                                            <code className="px-2 py-1 bg-gray-200 rounded text-xs">&lt;p&gt;Paragraph&lt;/p&gt;</code>
                                            <code className="px-2 py-1 bg-gray-200 rounded text-xs">&lt;strong&gt;Bold&lt;/strong&gt;</code>
                                            <code className="px-2 py-1 bg-gray-200 rounded text-xs">&lt;ul&gt;&lt;li&gt;List&lt;/li&gt;&lt;/ul&gt;</code>
                                            <code className="px-2 py-1 bg-gray-200 rounded text-xs">&lt;a href="#"&gt;Link&lt;/a&gt;</code>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Sidebar Settings */}
                            <div className="space-y-8">
                                {/* Featured Image */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-pink-100 rounded-lg">
                                            <ImageIcon className="w-5 h-5 text-pink-600" />
                                        </div>
                                        <div>
                                            <label className="block text-base font-semibold text-gray-900">
                                                Featured Image
                                            </label>
                                            <p className="text-sm text-gray-500">Add a visually appealing image</p>
                                        </div>
                                    </div>
                                    <input
                                        type="url"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        placeholder="https://images.unsplash.com/photo-..."
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm transition-all duration-200"
                                    />
                                    {formData.image ? (
                                        <div className="mt-4 relative group">
                                            <img
                                                src={formData.image}
                                                alt="Preview"
                                                className="w-full h-48 object-cover rounded-lg border border-gray-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="mt-4 p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                                            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                            <p className="text-sm text-gray-500">No image selected</p>
                                            <p className="text-xs text-gray-400 mt-1">Enter a URL above or upload</p>
                                        </div>
                                    )}
                                </div>

                                {/* Category & Author */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md">
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                Category
                                            </label>
                                            <input
                                                type="text"
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                placeholder="e.g., Google AdX, Monetization"
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                            />
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <User className="w-4 h-4 text-gray-600" />
                                                <label className="block text-sm font-semibold text-gray-900">
                                                    Author
                                                </label>
                                            </div>
                                            <input
                                                type="text"
                                                name="author"
                                                value={formData.author}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <Hash className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <label className="block text-base font-semibold text-gray-900">
                                                Tags
                                            </label>
                                            <p className="text-sm text-gray-500">Add relevant tags for SEO</p>
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleAddTag}
                                        placeholder="Type and press Enter..."
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                    />
                                    <div className="flex flex-wrap gap-2 mt-4 min-h-[40px]">
                                        {formData.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className="flex items-center gap-1.5 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm"
                                            >
                                                #{tag}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveTag(tag)}
                                                    className="hover:text-red-600 transition-colors"
                                                >
                                                    <X className="w-3.5 h-3.5" />
                                                </button>
                                            </span>
                                        ))}
                                        {formData.tags.length === 0 && (
                                            <p className="text-sm text-gray-400 italic">No tags added yet</p>
                                        )}
                                    </div>
                                </div>

                                {/* Publish Status */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-purple-100 rounded-lg">
                                                <Globe className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 cursor-pointer">
                                                    Publish Status
                                                </label>
                                                <p className="text-sm text-gray-500">Make this post visible to everyone</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="published"
                                                checked={formData.published}
                                                onChange={handleChange}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                        </label>
                                    </div>
                                    <div className={`mt-4 p-4 rounded-lg ${formData.published ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                                        <p className={`text-sm font-medium ${formData.published ? 'text-green-700' : 'text-gray-600'}`}>
                                            {formData.published ?
                                                '✓ This post is publicly visible' :
                                                'This post is in draft mode'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Action Bar */}
                        <div className="sticky bottom-0 py-6 bg-gradient-to-t from-white via-white to-transparent">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="text-sm text-gray-500">
                                    {formData.title ? (
                                        <p className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                            All required fields are filled
                                        </p>
                                    ) : (
                                        <p className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                            Title is required
                                        </p>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => window.location.href = '/dashboard/blog'}
                                        className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="px-8 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {saving ? (
                                            <span className="flex items-center gap-2">
                                                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                                Saving...
                                            </span>
                                        ) : blogId ? 'Update Post' : 'Publish Post'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}