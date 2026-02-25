"use client"
import React from 'react';
import Head from 'next/head';
import { Calendar, MessageCircle, User, Clock, ArrowLeft, ChevronRight } from 'lucide-react';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    TelegramShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon,
    TelegramIcon,
} from 'react-share';
import Wrapper from '@/app/wrapper/page';

const BlogPostView = () => {
    // Sample blog post data
    const post = {
        id: 1,
        title: "Benefits of artificial intelligence in programmatic advertising",
        slug: "benefits-ai-programmatic-advertising",
        excerpt: "Discover how artificial intelligence is revolutionizing programmatic advertising and maximizing ROI for digital marketers.",
        content: `
      <p>Artificial Intelligence (AI) has become a game-changer in the world of programmatic advertising, offering unprecedented opportunities for optimization and efficiency. As digital advertising continues to evolve, AI technologies are providing advertisers with powerful tools to enhance their campaigns and achieve better results.</p>
      
      <h2>What is Programmatic Advertising?</h2>
      <p>Programmatic advertising refers to the automated buying and selling of digital advertising space in real-time. This process uses algorithms and data to make purchasing decisions, eliminating the need for manual negotiations and insertions orders.</p>
      
      <h2>Key Benefits of AI in Programmatic Advertising</h2>
      
      <h3>1. Enhanced Targeting Capabilities</h3>
      <p>AI algorithms can analyze vast amounts of data to identify the most relevant audiences for your campaigns. By processing user behavior, demographics, and contextual information, AI helps advertisers reach the right people at the right time with the right message.</p>
      
      <h3>2. Real-Time Optimization</h3>
      <p>Machine learning algorithms continuously analyze campaign performance and make real-time adjustments to bidding strategies, creative selection, and audience targeting. This ensures that your campaigns are always optimized for maximum performance.</p>
      
      <h3>3. Predictive Analytics</h3>
      <p>AI can predict future trends and user behavior patterns, allowing advertisers to make informed decisions about budget allocation and campaign strategies. This predictive capability helps in planning more effective campaigns.</p>
      
      <h3>4. Fraud Detection and Prevention</h3>
      <p>AI systems can detect suspicious activities and potential ad fraud in real-time, protecting your advertising budget from wasted spend on fraudulent impressions and clicks.</p>
      
      <h3>5. Dynamic Creative Optimization</h3>
      <p>AI can automatically test different creative variations and optimize them based on performance data, ensuring that the most effective creatives are shown to your target audience.</p>
      
      <h2>Implementation Strategies</h2>
      <p>To successfully implement AI in your programmatic advertising campaigns, consider the following strategies:</p>
      
      <ul>
        <li><strong>Data Quality:</strong> Ensure you have access to high-quality, relevant data for AI algorithms to work effectively.</li>
        <li><strong>Clear Objectives:</strong> Define clear campaign objectives and KPIs that align with your business goals.</li>
        <li><strong>Testing and Learning:</strong> Continuously test and refine your AI-driven strategies based on performance data.</li>
        <li><strong>Privacy Compliance:</strong> Ensure all AI implementations comply with privacy regulations and data protection laws.</li>
      </ul>
      
      <h2>Future Outlook</h2>
      <p>The integration of AI in programmatic advertising is expected to grow significantly in the coming years. As AI technologies continue to advance, we can expect even more sophisticated optimization capabilities, better fraud detection, and more personalized advertising experiences.</p>
      
      <p>By embracing AI in programmatic advertising, businesses can stay ahead of the competition and achieve better ROI on their digital advertising investments.</p>
    `,
        author: "Pubshine Team",
        publishedDate: "2025-04-01",
        readTime: "8 min read",
        category: "Artificial Intelligence",
        tags: ["AI", "Programmatic Advertising", "Digital Marketing", "Machine Learning"],
        image: "/api/placeholder/800/400",
        featured: true
    };

    const relatedPosts = [
        {
            id: 2,
            title: "Clawback in Google Ad Manager: What it is, why it occurs and how to manage it",
            slug: "clawback-google-ad-manager",
            excerpt: "Understanding clawback mechanisms in Google Ad Manager and how to effectively manage them.",
            image: "/api/placeholder/300/200",
            date: "2025-03-28",
            category: "Google Ad Manager"
        },
        {
            id: 3,
            title: "How to prevent invalid activity in GAM",
            slug: "prevent-invalid-activity-gam",
            excerpt: "Learn effective strategies to prevent invalid activity in Google Ad Manager.",
            image: "/api/placeholder/300/200",
            date: "2025-04-01",
            category: "GAM Security"
        },
        {
            id: 4,
            title: "5 Tips for Google Ad Manager (GAM) 2025",
            slug: "google-ad-manager-tips-2025",
            excerpt: "Essential tips to optimize your Google Ad Manager setup for maximum performance.",
            image: "/api/placeholder/300/200",
            date: "2025-01-28",
            category: "GAM Optimization"
        }
    ];

    const shareUrl = `https://pubshine.com/blog/${post.slug}`;
    const shareTitle = post.title;

    return (
        <Wrapper whiteLogo>
            

            <div className="min-h-screen bg-gray-50 mt-20 !text-black">
                {/* Navigation */}
                <nav className=" border-b sticky top-0 z-40">
                    <div className="max-w-6xl mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
                                <ArrowLeft className="w-5 h-5" />
                                <span>Back to Blog</span>
                            </button>
                           
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-orange-600 to-orange-800 text-white">
                    <div className="max-w-6xl mx-auto px-4 py-16">
                        <div className="text-center">
                            <span className="inline-block bg-black bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium mb-4">
                                {post.category}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                {post.title}
                            </h1>
                            <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
                                {post.excerpt}
                            </p>

                            {/* Post Meta */}
                            <div className="flex items-center justify-center space-x-6 text-orange-100">
                                <div className="flex items-center space-x-2">
                                    <User className="w-4 h-4" />
                                    <span>{post.author}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{post.readTime}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Article Content */}
                        <div className="lg:col-span-3">
                            <article className="bg-white rounded-xl shadow-lg p-8 mb-8">
                                <div
                                    className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900"
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                />

                                {/* Tags */}
                                <div className="mt-8 pt-8 border-t border-gray-200">
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </article>

                            {/* Related Posts */}
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {relatedPosts.map(relatedPost => (
                                        <div key={relatedPost.id} className="group cursor-pointer">
                                            <div className="relative overflow-hidden rounded-lg mb-4">
                                                <img
                                                    src={relatedPost.image}
                                                    alt={relatedPost.title}
                                                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>
                                            <span className="text-sm text-orange-600 font-medium">{relatedPost.category}</span>
                                            <h4 className="text-lg font-semibold text-gray-900 mt-2 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                                                {relatedPost.title}
                                            </h4>
                                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{relatedPost.excerpt}</p>
                                            <div className="flex items-center text-xs text-gray-500">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                {new Date(relatedPost.date).toLocaleDateString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                {/* Social Share */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Share this post</h4>
                                    <div className="space-y-3">
                                        <FacebookShareButton url={shareUrl} quote={shareTitle} className="w-full">
                                            <div className="flex items-center space-x-3 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                                <FacebookIcon size={20} round />
                                                <span className="font-medium">Facebook</span>
                                            </div>
                                        </FacebookShareButton>

                                        <TwitterShareButton url={shareUrl} title={shareTitle} className="w-full">
                                            <div className="flex items-center space-x-3 p-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                                                <TwitterIcon size={20} round />
                                                <span className="font-medium">Twitter</span>
                                            </div>
                                        </TwitterShareButton>

                                        <LinkedinShareButton url={shareUrl} title={shareTitle} className="w-full">
                                            <div className="flex items-center space-x-3 p-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                                                <LinkedinIcon size={20} round />
                                                <span className="font-medium">LinkedIn</span>
                                            </div>
                                        </LinkedinShareButton>

                                        <WhatsappShareButton url={shareUrl} title={shareTitle} className="w-full">
                                            <div className="flex items-center space-x-3 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                                                <WhatsappIcon size={20} round />
                                                <span className="font-medium">WhatsApp</span>
                                            </div>
                                        </WhatsappShareButton>

                                        <TelegramShareButton url={shareUrl} title={shareTitle} className="w-full">
                                            <div className="flex items-center space-x-3 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                                <TelegramIcon size={20} round />
                                                <span className="font-medium">Telegram</span>
                                            </div>
                                        </TelegramShareButton>
                                    </div>
                                </div>

                                {/* Table of Contents */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h4>
                                    <nav className="space-y-2">
                                        <a href="#what-is-programmatic" className="block text-gray-600 hover:text-orange-600 transition-colors py-1">
                                            What is Programmatic Advertising?
                                        </a>
                                        <a href="#key-benefits" className="block text-gray-600 hover:text-orange-600 transition-colors py-1">
                                            Key Benefits of AI
                                        </a>
                                        <a href="#implementation" className="block text-gray-600 hover:text-orange-600 transition-colors py-1">
                                            Implementation Strategies
                                        </a>
                                        <a href="#future-outlook" className="block text-gray-600 hover:text-orange-600 transition-colors py-1">
                                            Future Outlook
                                        </a>
                                    </nav>
                                </div>

                                {/* Author Info */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">About the Author</h4>
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold">PS</span>
                                        </div>
                                        <div>
                                            <h5 className="font-semibold text-gray-900">{post.author}</h5>
                                            <p className="text-sm text-gray-600">Digital Marketing Expert</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Specialists in programmatic advertising and AI-driven marketing solutions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default BlogPostView;