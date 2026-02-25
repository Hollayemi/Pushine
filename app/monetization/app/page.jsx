"use client";
const { default: Wrapper } = require("@/app/wrapper/page")

import React from 'react';
import { Smartphone, TrendingUp, Users, Shield, BarChart3, Zap, Target } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Reusable Components
export const PageTitle = ({ children, icon: Icon, className = "" }) => (
    <div className={`text-center mb-12 ${className}`}>
        <div className="flex justify-center items-center gap-3 mb-4 pt-5">
            {Icon && <Icon className="w-10 h-10 text-white" />}
            <h1 className="text-3xl md:text-4xl font-bold text-white">
                {children}
            </h1>
        </div>
        {/* <div className="w-24 h-1 bg-gradient-to-r from-gray-100 to-gray-100 mx-auto rounded-full"></div> */}
    </div>
);

export const FeatureCard = ({ icon: Icon, title, description, gradient = false, className = '' }) => (
    <div className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${gradient
        ? 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200'
        : 'bg-white border-gray-200 hover:border-orange-300'
        } ${className}`}>
        <div className="flex items-start gap-4">
            {Icon && <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>}
            <div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>
        </div>
    </div>
);

export const AdFormatCard = ({ title, description, highlight = false }) => (
    <div className={`p-4 rounded-lg border-2 transition-all duration-200 ${highlight
        ? 'border-orange-500 bg-orange-50'
        : 'border-gray-200 bg-white hover:border-orange-300'
        }`}>
        <h4 className="font-medium text-gray-900 mb-2">{title}</h4>
        {description && <p className="text-sm text-gray-600">{description}</p>}
    </div>
);

export const CallToActionCard = ({ title, description, buttonText }) => {
    const router = useRouter()
    return (
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">{title}</h3>
            <p className="text-orange-100 mb-6 max-w-2xl mx-auto">{description}</p>
            <button onClick={() => router.push("/contact-us")} className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                {buttonText}
            </button>
        </div>
    );
}


// Demo Component
const AppMonetization = () => {
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
                    <PageTitle icon={Smartphone}>App Monetization</PageTitle>

                    {/* Hero Section */}
                    <div className="bg-white rounded-2xl p-8 mb-12 shadow-sm border border-gray-200">
                        <div className="text-center max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Powering Revenue Across Every Screen
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                Unlock real, scalable revenue through smarter ad monetization strategies.
                                Whether you're monetizing a gaming app, utility tool, or content-based platform,
                                we deliver tailored solutions that prioritize user experience, performance, and profitability.
                            </p>
                            <div className="inline-block  text-black px-4 py-2 rounded-lg font-medium">
                                We don't just plug in SDKs. We architect revenue ecosystems.
                            </div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        <FeatureCard
                            icon={TrendingUp}
                            title="Premium Demand with Zero Compromise"
                            description="Connect to leading global demand partners, including exclusive access to Google AdX for mobile apps. Stronger competition, higher CPMs, consistent fill rates."

                        />
                        <FeatureCard
                            icon={Zap}
                            title="Custom Mediation & Header Bidding"
                            description="Build and optimize multilayered mediation stacks using Google AdMob, MAX, ironSource, or your preferred platforms."
                        />
                        <FeatureCard
                            icon={Shield}
                            title="Lightweight, Fast & Clean Integration"
                            description="SDK implementations that are light, stable, and customizable. Faster load times, minimal crashes, seamless UX."
                        />
                        <FeatureCard
                            icon={Users}
                            title="In-App Formats Built for Engagement"
                            description="From rewarded video ads to interstitials and native placements, formats that integrate naturally with your content."
                        />
                        <FeatureCard
                            icon={BarChart3}
                            title="Real-Time Reporting & Optimization"
                            description="Transparent performance dashboards and A/B testing support with continuous monitoring and strategy evolution."

                        />
                        <FeatureCard
                            icon={Target}
                            title="Hands-On Expert Support"
                            description="Dedicated monetization partner who works alongside you from onboarding to scaling with tailored recommendations."
                        />
                    </div>

                    {/* Policy Compliance */}
                    <div className="bg-white rounded-xl p-8 mb-12 border border-white">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-black">Full Policy Compliance</h3>
                                <p className="text-black">Risk-free monetization setup</p>
                            </div>
                        </div>
                        <p className="text-black">
                            We ensure your monetization setup aligns with Google's policies and platform requirements,
                            reducing the risk of suspensions or invalid traffic flags.
                        </p>
                    </div>

                    {/* Ad Formats */}
                    <div className="bg-white rounded-xl p-8 mb-12 border border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">App Ad Experiences That Deliver</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <AdFormatCard title="Rewarded Video Ads" />
                            <AdFormatCard title="App Open Ads" />
                            <AdFormatCard title="Native Ads" />
                            <AdFormatCard title="Banner and Interstitial Ads" />
                            <AdFormatCard title="Playable and Full Screen Ads" />
                            <AdFormatCard title="Programmatic & Real-Time Bidding Ads" />
                        </div>
                    </div>

                    {/* CTA */}
                    <CallToActionCard
                        title="Monetize Every User Session"
                        description="Launch your custom app monetization strategy with PubShine and transform every interaction into revenue opportunity."
                        buttonText="Get Started"
                    />
                </div>
            </div>

        </Wrapper>
    );
};

export default AppMonetization;