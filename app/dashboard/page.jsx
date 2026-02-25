"use client"
import React, { useState, useEffect } from 'react'
import {
    Plus, Edit2, Trash2, Eye, EyeOff, Search, Filter,
    MessageSquare, Heart, TrendingUp, FileText, Calendar,
    Users, BarChart3, MoreVertical, ExternalLink, Copy,
    Clock, ChevronRight, Download, Upload
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function BlogDashboard() {
    const [darkMode, setDarkMode] = useState(false);
    const [blogs, setBlogs] = useState([])
    const [filteredBlogs, setFilteredBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterPublished, setFilterPublished] = useState('all')
    const [stats, setStats] = useState({
        total: 0,
        published: 0,
        draft: 0,
        totalViews: 0,
        totalLikes: 0,
        totalComments: 0
    })
    const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
    const [selectedBlogs, setSelectedBlogs] = useState([])

    useEffect(() => {
        fetchBlogs()
    }, [])

    useEffect(() => {
        filterBlogs()
    }, [blogs, searchTerm, filterPublished])

    const fetchBlogs = async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/blog')
            const data = await res.json()

            if (data.success) {
                setBlogs(data.data)
                calculateStats(data.data)
            }
        } catch (error) {
            toast.error('Failed to fetch blogs')
        } finally {
            setLoading(false)
        }
    }

    const calculateStats = (blogData) => {
        setStats({
            total: blogData.length,
            published: blogData.filter(b => b.published).length,
            draft: blogData.filter(b => !b.published).length,
            totalViews: blogData.reduce((sum, b) => sum + (b.views || 0), 0),
            totalLikes: blogData.reduce((sum, b) => sum + (b.likes || 0), 0),
            totalComments: blogData.reduce((sum, b) => sum + (b.commentsCount || 0), 0)
        })
    }

    const filterBlogs = () => {
        let filtered = [...blogs]

        if (searchTerm) {
            filtered = filtered.filter(blog =>
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.category?.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        if (filterPublished !== 'all') {
            filtered = filtered.filter(blog =>
                blog.published === (filterPublished === 'published')
            )
        }

        setFilteredBlogs(filtered)
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) return

        try {
            const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' })
            const data = await res.json()

            if (data.success) {
                toast.success('Blog post deleted successfully')
                fetchBlogs()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('Failed to delete blog')
        }
    }

    const togglePublish = async (id, currentStatus) => {
        try {
            const res = await fetch(`/api/blog/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ published: !currentStatus })
            })

            const data = await res.json()

            if (data.success) {
                toast.success(`Blog ${!currentStatus ? 'published' : 'unpublished'} successfully`)
                fetchBlogs()
            }
        } catch (error) {
            toast.error('Failed to update blog status')
        }
    }

    const handleSelectAll = () => {
        if (selectedBlogs.length === filteredBlogs.length) {
            setSelectedBlogs([])
        } else {
            setSelectedBlogs(filteredBlogs.map(blog => blog._id))
        }
    }

    const handleSelectBlog = (id) => {
        if (selectedBlogs.includes(id)) {
            setSelectedBlogs(selectedBlogs.filter(blogId => blogId !== id))
        } else {
            setSelectedBlogs([...selectedBlogs, id])
        }
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            {/* Header with Orange Theme */}
            <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex flex-col md:flex-row items-center gap-6 mx-auto md:mx-0">
                            <img
                                src={!darkMode ? "/images/white-logo.png" : `/images/horizontal-logo2.png`}
                                className='w-32 cursor-pointer'
                                alt="PUBSHINE logo"
                            />

                            <div className='flex flex-col items-center md:items-start'>
                                <h1 className="text-3xl font-bold mb-2">Blog Dashboard</h1>
                                <div className="flex items-center gap-3 text-orange-100">
                                    <div className="flex items-center gap-1">
                                        <FileText className="w-4 h-4" />
                                        <span className="text-sm">{stats.total} Posts</span>
                                    </div>
                                    <div className="h-4 w-px bg-orange-400"></div>
                                    <div className="flex items-center gap-1">
                                        <Eye className="w-4 h-4" />
                                        <span className="text-sm">{formatNumber(stats.totalViews)} Views</span>
                                    </div>
                                    <div className="h-4 w-px bg-orange-400"></div>
                                    <div className="text-sm">
                                        Last updated: {new Date().toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between md:justify-start w-full md:w-auto gap-3">
                            <button
                                onClick={() => window.location.href = '/dashboard/blog/create'}
                                className="flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 px-5 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                            >
                                <Plus className="w-5 h-5" />
                                New Blog Post
                            </button>
                            <button className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors">
                                <MoreVertical className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-4">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-200">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium mb-2">Total Posts</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className={`px-2 py-1 rounded-lg text-xs font-semibold ${stats.published > stats.draft ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {Math.round((stats.published / stats.total) * 100) || 0}% Published
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl">
                                <FileText className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-200">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium mb-2">Published</p>
                                <p className="text-3xl font-bold text-green-600">{stats.published}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="flex items-center gap-1 text-green-600">
                                        <TrendingUp className="w-4 h-4" />
                                        <span className="text-sm font-medium">Active</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-green-100 to-green-50 rounded-xl">
                                <Eye className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-200">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium mb-2">Drafts</p>
                                <p className="text-3xl font-bold text-yellow-600">{stats.draft}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="flex items-center gap-1 text-yellow-600">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-sm font-medium">In Progress</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-xl">
                                <EyeOff className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-200">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium mb-2">Total Views</p>
                                <p className="text-3xl font-bold text-blue-600">{formatNumber(stats.totalViews)}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="flex items-center gap-1 text-blue-600">
                                        <BarChart3 className="w-4 h-4" />
                                        <span className="text-sm font-medium">+12% this month</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl">
                                <TrendingUp className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Controls Bar */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                        <div className="flex-1 w-full lg:w-auto">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search blogs by title, excerpt, or category..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 w-full lg:w-auto">
                            <div className="flex items-center gap-2 flex-1 lg:flex-none">
                                <Filter className="text-gray-400 w-5 h-5" />
                                <select
                                    value={filterPublished}
                                    onChange={(e) => setFilterPublished(e.target.value)}
                                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                >
                                    <option value="all">All Posts</option>
                                    <option value="published">Published Only</option>
                                    <option value="draft">Drafts Only</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${viewMode === 'grid' ? 'bg-white shadow' : 'hover:bg-gray-100'}`}
                                >
                                    Grid
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${viewMode === 'list' ? 'bg-white shadow' : 'hover:bg-gray-100'}`}
                                >
                                    List
                                </button>
                            </div>
                        </div>
                    </div>

                    {selectedBlogs.length > 0 && (
                        <div className="mt-4 p-4 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <FileText className="w-5 h-5 text-orange-600" />
                                </div>
                                <span className="font-semibold text-orange-800">
                                    {selectedBlogs.length} post{selectedBlogs.length !== 1 ? 's' : ''} selected
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="px-4 py-2 text-sm text-orange-700 hover:bg-orange-200 rounded-lg transition-colors">
                                    Bulk Publish
                                </button>
                                <button className="px-4 py-2 text-sm text-red-700 hover:bg-red-100 rounded-lg transition-colors">
                                    Delete Selected
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Content Area */}
                {loading ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mb-4"></div>
                        <p className="text-gray-600 font-medium">Loading your blog posts...</p>
                        <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
                    </div>
                ) : filteredBlogs.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
                        <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FileText className="w-12 h-12 text-orange-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No blog posts found</h3>
                        <p className="text-gray-600 mb-6">
                            {searchTerm ? 'Try adjusting your search or filter' : 'Get started by creating your first blog post'}
                        </p>
                        <button
                            onClick={() => window.location.href = '/dashboard/blog/create'}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            <Plus className="w-5 h-5" />
                            Create New Post
                        </button>
                    </div>
                ) : viewMode === 'grid' ? (
                    /* Grid View */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBlogs.map((blog) => (
                            <div key={blog._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                                <div className="relative">
                                    {blog.image ? (
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={blog.image}
                                                alt={blog.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                        </div>
                                    ) : (
                                        <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                            <FileText className="w-16 h-16 text-gray-400" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4">
                                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${blog.published
                                            ? 'bg-green-100 text-green-700 border border-green-200'
                                            : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                                            }`}>
                                            {blog.published ? 'Published' : 'Draft'}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                                            {blog.category || 'Uncategorized'}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {getTimeAgo(blog.createdAt)}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                                        {blog.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {blog.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Eye className="w-4 h-4" />
                                                <span className="font-medium">{formatNumber(blog.views || 0)}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Heart className="w-4 h-4" />
                                                <span className="font-medium">{formatNumber(blog.likes || 0)}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MessageSquare className="w-4 h-4" />
                                                <span className="font-medium">{formatNumber(blog.commentsCount || 0)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                                {blog.author?.charAt(0) || 'P'}
                                            </div>
                                            <span className="text-sm text-gray-700 font-medium">
                                                {blog.author || 'PubShine Team'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => togglePublish(blog._id, blog.published)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title={blog.published ? 'Unpublish' : 'Publish'}
                                            >
                                                {blog.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => window.location.href = `/dashboard/blog/edit/${blog._id}`}
                                                className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(blog._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* List View */
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-6 py-4 text-left">
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedBlogs.length === filteredBlogs.length && filteredBlogs.length > 0}
                                                    onChange={handleSelectAll}
                                                    className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500 border-gray-300"
                                                />
                                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                    Blog Post
                                                </span>
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Performance
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Created
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredBlogs.map((blog) => (
                                        <tr key={blog._id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedBlogs.includes(blog._id)}
                                                        onChange={() => handleSelectBlog(blog._id)}
                                                        className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500 border-gray-300"
                                                    />
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                                            {blog.image ? (
                                                                <img
                                                                    src={blog.image}
                                                                    alt={blog.title}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                                                    <FileText className="w-8 h-8 text-gray-400" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <h4 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
                                                                {blog.title}
                                                            </h4>
                                                            <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                                                                {blog.excerpt}
                                                            </p>
                                                            <div className="flex items-center gap-3">
                                                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                                                                    {blog.category || 'Uncategorized'}
                                                                </span>
                                                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center">
                                                                        <span className="text-xs font-medium text-orange-700">
                                                                            {blog.author?.charAt(0) || 'P'}
                                                                        </span>
                                                                    </div>
                                                                    <span>{blog.author || 'PubShine Team'}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-2">
                                                    <span className={`px-3 py-1.5 inline-flex justify-center text-xs font-semibold rounded-full ${blog.published
                                                        ? 'bg-green-100 text-green-700 border border-green-200'
                                                        : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                                                        }`}>
                                                        {blog.published ? 'Published' : 'Draft'}
                                                    </span>
                                                    {blog.published && (
                                                        <button className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                                                            <ExternalLink className="w-3 h-3" />
                                                            View Live
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs text-gray-600">Views</span>
                                                        <span className="text-sm font-semibold text-gray-900">{formatNumber(blog.views || 0)}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs text-gray-600">Likes</span>
                                                        <span className="text-sm font-semibold text-gray-900">{formatNumber(blog.likes || 0)}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs text-gray-600">Comments</span>
                                                        <span className="text-sm font-semibold text-gray-900">{formatNumber(blog.commentsCount || 0)}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900 font-medium">
                                                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {getTimeAgo(blog.createdAt)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => togglePublish(blog._id, blog.published)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title={blog.published ? 'Unpublish' : 'Publish'}
                                                    >
                                                        {blog.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                    </button>
                                                    <button
                                                        onClick={() => window.location.href = `/dashboard/blog/edit/${blog._id}`}
                                                        className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(blog._id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Footer */}
                {filteredBlogs.length > 0 && (
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
                        <div>
                            Showing <span className="font-semibold text-gray-900">{filteredBlogs.length}</span> of{' '}
                            <span className="font-semibold text-gray-900">{blogs.length}</span> posts
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2">
                                <Upload className="w-4 h-4" />
                                Export
                            </button>
                            <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <ChevronRight className="w-5 h-5 rotate-180" />
                                </button>
                                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg font-medium">
                                    1
                                </span>
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}