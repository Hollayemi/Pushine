"use client";
const { default: Wrapper } = require("@/app/wrapper/page")
import { Monitor, Tv, TrendingUp, Users, Shield, BarChart3, Zap, Target } from 'lucide-react';
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
                <div className="max-w-6xl mx-auto  px-4 py-12">
                    <PageTitle icon={Tv}>CTV Monetization</PageTitle>

                    {/* Hero Section */}
                    <div className="bg-white rounded-2xl p-8 mb-12 shadow-sm border border-gray-200">
                        <div className="text-center max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Premium Revenue for the Big Screen
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                Bring next-generation monetization to Connected TV environments. Whether you're
                                streaming movies, live events, or episodic content, our solutions help content owners,
                                app developers, and OTT platforms tap into the full earning potential of the big screen.
                            </p>
                            <div className="inline-block text-black px-4 py-2 rounded-lg font-medium">
                                CTV is one of the fastest-growing digital channels. Lead the trend with us.
                            </div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        <FeatureCard
                            icon={TrendingUp}
                            title="Access to Premium CTV Demand"
                            description="Connect to the world's top demand sources, including private marketplace deals and programmatic direct buyers for high fill rates and competitive CPMs."
                            
                        />
                        <FeatureCard
                            icon={Users}
                            title="Ad Pods Built for Viewer Retention"
                            description="Optimize mid-roll and pre-roll placements using smart ad pod strategies that deliver relevant ads while keeping viewer drop-off low."
                        />
                        <FeatureCard
                            icon={Monitor}
                            title="Support for All CTV Platforms"
                            description="From Roku, Android TV, and Fire TV to Samsung, LG, and Apple TV, we support seamless integration across leading platforms."
                        />
                        <FeatureCard
                            icon={Zap}
                            title="Server-Side Ad Insertion"
                            description="Provide smooth, buffer-free ad experiences while bypassing ad blockers and maintaining consistent playback quality across devices."
                        />
                        <FeatureCard
                            icon={BarChart3}
                            title="Advanced Reporting & Forecasting"
                            description="Track performance with real-time dashboards, forecast ad opportunities, and make data-driven decisions with our analytics suite."
                            
                        />
                        <FeatureCard
                            icon={Shield}
                            title="Compliance & Brand Safety"
                            description="All inventory vetted for IAB standards and Google policies. Integrated brand safety tools ensure advertiser trust and long-term success."
                        />
                    </div>

                    {/* Platform Support */}
                    <div className="bg-white rounded-xl p-8 mb-12 border border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Supported CTV Platforms</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {['Roku', 'Android TV', 'Fire TV', 'Samsung', 'LG', 'Apple TV'].map(platform => (
                                <div key={platform} className="bg-gray-50 rounded-lg p-4 text-center font-medium text-gray-700 border border-gray-200">
                                    {platform}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Growth Strategy */}
                    <div className="bg-white rounded-xl p-8 mb-12 border border-purple-200">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                                <Target className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-black">Dedicated CTV Growth Strategists</h3>
                                <p className="text-black">Customized monetization blueprints</p>
                            </div>
                        </div>
                        <p className="text-black">
                            Our team works with you to create a customized monetization blueprint for your content
                            and audience, whether you're just entering the CTV space or scaling to millions of viewers.
                        </p>
                    </div>

                    {/* Ad Formats */}
                    <div className="bg-white rounded-xl p-8 mb-12 border border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">CTV Ad Formats We Support</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <AdFormatCard title="Pre-Roll and Mid-Roll Video Ads" />
                            <AdFormatCard title="Dynamic Ad Pods" />
                            <AdFormatCard title="Interactive CTV Ads" />
                            <AdFormatCard title="Skippable and Non-Skippable Units" />
                            <AdFormatCard title="Bumper and Sponsored Ads" />
                            <AdFormatCard title="Server-Side Inserted Programmatic Ads" />
                        </div>
                    </div>

                    {/* CTA */}
                    <CallToActionCard
                        title="Dominate the Big Screen"
                        description="Join the CTV revolution and maximize your earning potential with premium monetization strategies designed for the future of television."
                        buttonText="Get Started"
                    />
                </div>
            </div>

        </Wrapper>
    );
}


export default MonetizationPage;