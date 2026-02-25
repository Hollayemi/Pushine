"use client";
const { default: Wrapper } = require("@/app/wrapper/page")
import { Monitor, TrendingUp, Users, Shield, BarChart3, Zap, Target, Star } from 'lucide-react';
import { AdFormatCard, CallToActionCard, FeatureCard, PageTitle } from '../app/page';

const MonetizationPage = () => {
    return (
        <Wrapper whiteLogo>
            <div className="min-h-screen bg-orange-500 text-white mt-[70px]">
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-orange-600 rounded-full opacity-20 blur-xl"></div>
                    <div className="absolute top-40 right-20 w-20 h-20 bg-orange-400 rounded-full opacity-30 blur-lg"></div>
                    <div className="absolute bottom-32 left-1/3 w-24 h-24 bg-indigo-400 rounded-full opacity-25 blur-lg"></div>
                </div>

                <div className="max-w-6xl mx-auto px-4 py-12 ">
                    <PageTitle icon={Monitor}>Web Monetization</PageTitle>

                    {/* Hero Section */}
                    <div className="bg-white rounded-2xl p-8 mb-12 shadow-sm border border-gray-200">
                        <div className="text-center max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Maximize Every Impression with PubShine
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Transform your website traffic into a predictable and scalable revenue stream.
                                Our web monetization solutions are built for forward-thinking publishers who want
                                more than just basic ad placements. Unlock your website's full potential with
                                premium demand access, intelligent optimization, and a user-first approach.
                            </p>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        <FeatureCard
                            icon={Target}
                            title="Audience First Ad Targeting"
                            description="Deliver ads that speak directly to your audience using refined targeting capabilities. Better engagement, improved user retention, and increased ad revenue across your entire site."
                            // gradient={true}
                        />
                        <FeatureCard
                            icon={Users}
                            title="Integrated User Experience"
                            description="Implement ad formats that complement your website's design and user flow. From responsive layouts to high-performing sticky units."
                        />
                        <FeatureCard
                            icon={TrendingUp}
                            title="Revenue from All Content Types"
                            description="Whether you're running a niche content site or large-scale publishing network, our platform adapts and monetizes every section."
                        />
                        <FeatureCard
                            icon={BarChart3}
                            title="Real-Time Analytics"
                            description="Track every metric that matters with actionable insights to make data-backed decisions for optimization and scaling."
                        />
                        <FeatureCard
                            icon={Zap}
                            title="Optimized Yield Through Smart Bidding"
                            description="Combine header bidding and advanced mediation layers to increase competition for your ad inventory, ensuring higher CPMs."
                        />
                        <FeatureCard
                            icon={Shield}
                            title="Partnership Not Just a Platform"
                            description="Get more than technology. Our monetization experts work closely with you to craft a revenue strategy that evolves with your goals."
                            // gradient={true}
                        />
                    </div>

                    {/* Revenue Model Highlight */}
                    <div className="bg-white rounded-xl p-8 mb-12 border border-gray-200">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                                <Star className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Transparent & Rewarding Revenue Model</h3>
                                <p className="text-gray-600">Fairness and clarity in every partnership</p>
                            </div>
                        </div>
                        <p className="text-gray-700">
                            We operate on fairness and clarity. Our revenue share model ensures your earnings
                            are aligned with your growth, with no hidden terms or unclear deductions.
                        </p>
                    </div>

                    {/* Ad Formats */}
                    <div className="bg-white rounded-xl p-8 mb-12 border border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Web Ad Units That Work</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <AdFormatCard title="Responsive Display Ads" />
                            <AdFormatCard title="Bottom Sticky Ads" />
                            <AdFormatCard title="Rewarded Ads" description="Available with select demand partners" />
                            <AdFormatCard title="Native and Contextual Units" />
                            <AdFormatCard title="Performance Based Programmatic Ads" />
                        </div>
                    </div>

                    {/* CTA */}
                    <CallToActionCard
                        title="Turn Your Website Into a Revenue Engine"
                        description="Start monetizing with PubShine's premium web ad solutions today and see the difference expert optimization makes."
                        buttonText="Get Started"
                    />
                </div>
            </div>
        
        </Wrapper>
    );
}


export default MonetizationPage;