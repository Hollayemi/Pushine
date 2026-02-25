import React from 'react';
import { Calendar, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Wrapper from '../wrapper/page';
import Link from 'next/link';


const BlogPage = () => {
    const blogPosts = [
        {
            id: 2,
            title: "Understanding eCPM, Fill Rate, and Viewability in Google AdX",
            slug: "understanding-ecpm-fill-rate-viewability-google-adx",
            excerpt: "Learn the three critical metrics that influence your AdX earnings and how to optimize them for maximum revenue.",
            image: "/images/epcm.jpg",
            comments: "No comments",
            date: "2025-04-02",
            category: "AdX Optimization",
            color: "bg-gradient-to-br from-purple-600 to-purple-800",
            icon: "🤖",
            readMore: "Read more"
        },
        {
            id: 1,
            title: "MA vs MI: Which Google MCM Access Model Is Right for You?",
            slug: "ma-vs-mi-google-mcm-access-model",
            excerpt: "Google's Multiple Customer Management (MCM) program offers two distinct access models. Learn the key differences between MA and MI to choose the right path for your AdX journey.",
            image: "/images/mami.jpg",
            author: "PubShine Team",
            comments: "No comments",
            category: "Google AdX",
            date: "2025-04-02",
            color: "bg-gradient-to-br from-purple-600 to-purple-800",
            icon: "🤖",
            readMore: "Read more"
        },
    ];

    return (
        <Wrapper whiteLogo>
            <div className="min-h-screen bg-gray-50 mt-[70px]">
                {/* Header with Blog Title */}
                <div className="relative h-64 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center">
                    <div className="absolute inset-0 bg-orange-500 bg-opacity-20"></div>
                    <div className="relative z-10">
                        <h1 className="text-6xl font-bold text-white text-center">Blog</h1>
                    </div>
                    {/* Decorative silhouettes
                    <div className="absolute bottom-0 left-20 opacity-30">
                        <div className="w-16 h-32 bg-orange-600 rounded-t-full"></div>
                    </div>
                    <div className="absolute bottom-0 left-40 opacity-30">
                        <div className="w-12 h-28 bg-orange-600 rounded-t-full"></div>
                    </div> */}
                </div>


                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* Blog Posts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {blogPosts.map((post) => (
                            <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                {/* Card Header with Icon and Color */}
                                <div className={` text-white relative overflow-hidden`}>
                                    <div className="absolute top-2 left-2">
                                        <span className="text-xs text-black bg-white bg-opacity-20 px-2 py-1 rounded">
                                            Pubshine
                                        </span>
                                    </div>
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>

                                {/* Card Content */}
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2 leading-tight">
                                        {post.title}
                                    </h3>

                                    <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                                        <div className="flex items-center space-x-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{post.date}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <MessageCircle className="w-4 h-4" />
                                            <span>{post.comments}</span>
                                        </div>
                                    </div>

                                    <Link href={`/blog/${post.slug}`} className="bg-orange-400 hover:bg-orange-500 text-gray-800 font-medium py-2 px-4 rounded-full text-sm transition-colors duration-200">
                                        {post.readMore}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center space-x-4">
                        <button className="flex items-center space-x-2 px-4 py-2 text-black bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            <ChevronLeft className="w-4 h-4" />
                            <span>Previous</span>
                        </button>

                        <div className="flex space-x-2">
                            <button className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-medium">
                                1
                            </button>
                            <button className="w-8 h-8 bg-white border border-gray-300 text-black rounded-full flex items-center justify-center font-medium hover:bg-gray-50 transition-colors duration-200">
                                2
                            </button>
                            <button className="w-8 h-8 bg-white border border-gray-300 text-black rounded-full flex items-center justify-center font-medium hover:bg-gray-50 transition-colors duration-200">
                                3
                            </button>
                        </div>

                        <button className="flex items-center space-x-2 px-4 text-black py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            <span>Next</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default BlogPage;