"use client"
import React from 'react';
import { Calendar, User, Clock, CheckCircle } from 'lucide-react';
import { Users, Settings, TrendingUp, XCircle, ArrowRight, Building } from 'lucide-react';


import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    TelegramShareButton,
    FacebookIcon,
    LinkedinIcon,
    WhatsappIcon,
    TelegramIcon,
    XIcon,
} from 'react-share';
import Wrapper from '@/app/wrapper/page';
import { useRouter } from 'next/navigation';

const MAVSMIBlogPost = () => {
    const router = useRouter()
    const post = {
        id: 1,
        title: "MA vs MI: Which Google MCM Access Model Is Right for You?",
        slug: "ma-vs-mi-google-mcm-access-model",
        excerpt: "Google's Multiple Customer Management (MCM) program offers two distinct access models. Learn the key differences between MA and MI to choose the right path for your AdX journey.",
        author: "PubShine Team",
        publishedDate: "2025-04-01",
        readTime: "6 min read",
        category: "Google AdX",
        tags: ["Google AdX", "MCM", "Managed Account", "Managed Inventory", "Publishers", "Monetization"],
        image: "/api/placeholder/800/400",
        featured: true
    };

    const relatedPosts = [
        {
            id: 2,
            title: "Understanding eCPM, Fill Rate, and Viewability in Google AdX",
            slug: "understanding-ecpm-fill-rate-viewability-google-adx",
            excerpt: "Learn the three critical metrics that influence your AdX earnings and how to optimize them for maximum revenue.",
            image: "/images/epcm.jpg",
            date: "2025-04-02",
            category: "AdX Optimization",
            link: "epcm"
        },

    ];

    const shareUrl = `https://pubshine.com/blog/${post.slug}`;
    const shareTitle = post.title;

    return (
        <Wrapper whiteLogo>
            <div className="min-h-screen bg-gray-50 !text-black mt-[70px]">
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
                            <article className="max-w-4xl mx-auto px-6 py-8 bg-white">
                                <div className="mb-8">
                                    <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                        MA vs MI: Which Google MCM Access Model Is Right for You?
                                    </h1>
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        Google's Multiple Customer Management (MCM) program is designed to give publishers a structured path to access <strong>Google Ad Exchange (AdX)</strong> through certified partners. However, one of the most common questions publishers ask is this:
                                    </p>
                                </div>

                                <div className="mb-8 p-6 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                                    <p className="text-lg font-semibold text-gray-800 mb-2">
                                        What is the difference between MA (Managed Account) and MI (Managed Inventory), and which one is right for me?
                                    </p>
                                    <p className="text-gray-700">
                                        At <strong>PubShine</strong>, we've helped hundreds of publishers across different regions get approved under both models. This blog will explain how they differ, what each offers, and how to choose the model that fits your goals and current stage.
                                    </p>
                                </div>

                                <section className="mb-12">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Google's MCM Models</h2>

                                    <p className="text-gray-700 mb-6 leading-relaxed">
                                        Before diving into the comparison, let's define both models:
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
                                            <div className="flex items-center mb-4">
                                                <h3 className="text-xl font-bold text-gray-900">Managed Account (MA)</h3>
                                            </div>
                                            <p className="text-gray-700 leading-relaxed">
                                                In this model, the MCM partner creates a <strong>new Ad Manager account</strong> for the publisher under their network and maintains full administrative access. The publisher is linked to the MCM partner for all monetization activities.
                                            </p>
                                        </div>

                                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
                                            <div className="flex items-center mb-4">
                                                <h3 className="text-xl font-bold text-gray-900">Managed Inventory (MI)</h3>
                                            </div>
                                            <p className="text-gray-700 leading-relaxed">
                                                In this setup, the <strong>publisher uses their own Ad Manager account</strong> but gives the MCM partner access to specific inventory (ad units or mapped sections). The publisher retains ownership of the GAM account while the partner helps manage monetization.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                <section className="mb-12">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Differences: MA vs MI</h2>

                                    <div className="overflow-x-auto">
                                        <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-4 text-left text-sm font-semibold text-orange-600 border-b">Feature</th>
                                                    <th className="px-6 py-4 text-left text-sm font-semibold text-orange-600 border-b">Managed Account (MA)</th>
                                                    <th className="px-6 py-4 text-left text-sm font-semibold text-orange-600 border-b">Managed Inventory (MI)</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                <tr className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 font-medium text-gray-900">GAM Account Ownership</td>
                                                    <td className="px-6 py-4 text-gray-700">Partner owns the account</td>
                                                    <td className="px-6 py-4 text-gray-700">Publisher owns the account</td>
                                                </tr>
                                                <tr className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 font-medium text-gray-900">Setup Process</td>
                                                    <td className="px-6 py-4 text-gray-700">New account created and fully managed by partner</td>
                                                    <td className="px-6 py-4 text-gray-700">Existing GAM account connected via mapping</td>
                                                </tr>
                                                <tr className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 font-medium text-gray-900">Control Level</td>
                                                    <td className="px-6 py-4 text-gray-700">Limited publisher control</td>
                                                    <td className="px-6 py-4 text-gray-700">Full publisher control over account</td>
                                                </tr>
                                                <tr className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 font-medium text-gray-900">Ease of Approval</td>
                                                    <td className="px-6 py-4 text-gray-700">Easier for new publishers</td>
                                                    <td className="px-6 py-4 text-gray-700">Requires a policy-compliant GAM account</td>
                                                </tr>
                                                <tr className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 font-medium text-gray-900">Transparency</td>
                                                    <td className="px-6 py-4 text-gray-700">Partner handles reports and performance</td>
                                                    <td className="px-6 py-4 text-gray-700">Full transparency in your GAM interface</td>
                                                </tr>
                                                <tr className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 font-medium text-gray-900">Ideal For</td>
                                                    <td className="px-6 py-4 text-gray-700">Beginners or non-technical publishers</td>
                                                    <td className="px-6 py-4 text-gray-700">Experienced publishers with GAM setup</td>
                                                </tr>
                                                <tr className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 font-medium text-gray-900">Flexibility to Switch Partner</td>
                                                    <td className="px-6 py-4 text-gray-700">Limited (new GAM needed)</td>
                                                    <td className="px-6 py-4 text-gray-700">High (just unmap inventory)</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </section>

                                <section className="mb-12">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Which One Should You Choose?</h2>

                                    <p className="text-gray-700 mb-8 leading-relaxed">
                                        Let's help you make the decision based on your current situation.
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                                            <div className="flex items-center mb-4">
                                                <h3 className="text-2xl font-bold text-gray-900">Choose MA If:</h3>
                                            </div>
                                            <ul className="space-y-3 text-gray-700">
                                                <li className="flex items-start">
                                                    <CheckCircle className="w-5 h-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                                                    You do not yet have a Google Ad Manager account
                                                </li>
                                                <li className="flex items-start">
                                                    <CheckCircle className="w-5 h-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                                                    You are new to programmatic advertising or Google AdX
                                                </li>
                                                <li className="flex items-start">
                                                    <CheckCircle className="w-5 h-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                                                    You want hands-on assistance and a quick start
                                                </li>
                                                <li className="flex items-start">
                                                    <CheckCircle className="w-5 h-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                                                    You are looking for a low-barrier entry into premium demand
                                                </li>
                                            </ul>
                                            <div className="mt-4 p-4 bg-orange-100 rounded-lg">
                                                <p className="text-sm text-orange-800">
                                                    <strong>Perfect for:</strong> Publishers who want to <strong>test monetization performance first</strong> before investing time into managing a GAM account.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                                            <div className="flex items-center mb-4">
                                                <h3 className="text-2xl font-bold text-gray-900">Choose MI If:</h3>
                                            </div>
                                            <ul className="space-y-3 text-gray-700">
                                                <li className="flex items-start">
                                                    <CheckCircle className="w-5 h-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                                                    You already have a Google Ad Manager account
                                                </li>
                                                <li className="flex items-start">
                                                    <CheckCircle className="w-5 h-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                                                    You have experience managing ad units, reports, and policies
                                                </li>
                                                <li className="flex items-start">
                                                    <CheckCircle className="w-5 h-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                                                    You want to retain full ownership of your GAM
                                                </li>
                                                <li className="flex items-start">
                                                    <CheckCircle className="w-5 h-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                                                    You may work with multiple MCM partners over time
                                                </li>
                                            </ul>
                                            <div className="mt-4 p-4 bg-orange-100 rounded-lg">
                                                <p className="text-sm text-orange-800">
                                                    <strong>Perfect for:</strong> MI offers <strong>greater independence, transparency, and long-term flexibility</strong>. However, your account must be policy-compliant and meet eligibility criteria.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="mb-12">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6">How PubShine Supports Both Models</h2>

                                    <p className="text-gray-700 mb-6 leading-relaxed">
                                        At <strong>PubShine</strong>, we offer access to both MA and MI onboarding pathways through our network of trusted <strong>Google Certified Publishing Partners</strong> and <strong>MCM networks</strong>. We evaluate each publisher's current setup, traffic quality, and goals before recommending the best model.
                                    </p>

                                    <div className="bg-gradient-to-r from-gray-50 to-orange-50 p-6 rounded-lg mb-6">
                                        <p className="text-gray-700 mb-4 leading-relaxed">
                                            Whether you want to start from scratch or scale an existing setup, we provide:
                                        </p>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="flex items-start">
                                                <TrendingUp className="w-5 h-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-700">AdX access through top-tier MCM partners</span>
                                            </div>
                                            <div className="flex items-start">
                                                <TrendingUp className="w-5 h-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-700">Competitive revenue share deals (up to 93 percent)</span>
                                            </div>
                                            <div className="flex items-start">
                                                <Settings className="w-5 h-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-700">Full GAM setup and onboarding support</span>
                                            </div>
                                            <div className="flex items-start">
                                                <Users className="w-5 h-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-700">Dedicated account managers and optimization experts</span>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white p-8 rounded-lg text-center">
                                    <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                                    <p className="text-xs md:text-lg mb-6 opacity-90">
                                        Let our experts guide you through the best onboarding path. Whether it's MA or MI, we'll help you unlock premium AdX monetization with complete transparency and support.
                                    </p>
                                    <a
                                        href="https://pubshine.com/"
                                        className="inline-flex items-center px-8 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        👉 Apply Now at PubShine.com
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </a>
                                    <p className="mt-4 text-sm opacity-80">
                                        Let us match you with the right MCM solution for your success.
                                    </p>
                                </section>
                            </article>

                            {/* Related Posts */}
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {relatedPosts.map(relatedPost => (
                                        <div key={relatedPost.id} onClick={() => router.push(relatedPost.slug)} className="group cursor-pointer">
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
                                            <div className="flex items-center space-x-3 p-3 bg-black text-white rounded-lg hover:bg-gray-950 transition-colors">
                                                <XIcon size={30} round />
                                                <span className="font-medium">X</span>
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
                                        <a href="#understanding-mcm" className="block text-gray-600 hover:text-orange-600 transition-colors py-1">
                                            Understanding MCM Models
                                        </a>
                                        <a href="#key-differences" className="block text-gray-600 hover:text-orange-600 transition-colors py-1">
                                            Key Differences: MA vs MI
                                        </a>
                                        <a href="#which-to-choose" className="block text-gray-600 hover:text-orange-600 transition-colors py-1">
                                            Which One Should You Choose?
                                        </a>
                                        <a href="#pubshine-support" className="block text-gray-600 hover:text-orange-600 transition-colors py-1">
                                            How PubShine Supports Both
                                        </a>
                                    </nav>
                                </div>

                                {/* CTA Box */}
                                <div className="bg-gradient-to-br from-orange-600 to-orange-800 text-white rounded-xl shadow-lg p-6">
                                    <h4 className="text-lg font-semibold mb-2">Ready to Get Started?</h4>
                                    <p className="text-orange-100 text-sm mb-4">
                                        Let our experts guide you through the best MCM onboarding path.
                                    </p>
                                    <a
                                        href="https://pubshine.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                                    >
                                        Apply Now
                                    </a>
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
                                            <p className="text-sm text-gray-600">AdX Monetization Experts</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Specialists in Google AdX access and programmatic advertising optimization.
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

export default MAVSMIBlogPost;