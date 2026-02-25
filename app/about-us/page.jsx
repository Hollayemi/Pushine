"use client";
import { FeatureCard } from '@/app/monetization/app/page';
import Wrapper from '@/app/wrapper/page';
import { Globe2, GoalIcon, LineChart, ScanEye } from 'lucide-react';
import React from 'react';
import { FaLowVision } from 'react-icons/fa';

// Reusable Title Components
export const PageTitle = ({ children, className = "" }) => (
    <h1 className={`text-3xl md:text-4xl font-bold  text-White  border-gray-100 pb-2 mb-10 ${className}`}>
        {children}
    </h1>
);

export const SectionTitle = ({ children, className = "" }) => (
    <h2 className={`text-xl md:text-2xl w-fit font-semibold text-white border-b border-gray-100 pb-1 mb-4 ${className}`}>
        {children}
    </h2>
);

export const SubSectionTitle = ({ children, className = "" }) => (
    <h3 className={`text-lg md:text-xl w-fit font-medium text-black border-b border-gray-500 pb-1 mb-3 ${className}`}>
        {children}
    </h3>
);

// Page Container Component
export const PageContainer = ({ children, className = "" }) => (
    <div className={`bg-orange-500 text-white min-h-screen py-8 px-4 md:px-8 lg:px-12 pt-10 mt-[70px] ${className}`}>
        <div className="max-w-6xl mx-auto">
            {children}
        </div>
    </div>
);




// AboutUs Component showing all pages
const AboutUs = () => {


    return (
        <Wrapper whiteLogo>
            <PageContainer>


                <div className="space-y-6 leading-relaxed ">
                    <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-200">
                        <div className="text-left max-w-6xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                About PubShine
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                PubShine Pvt. Ltd. is a digital advertising and publisher growth company
                                committed to helping web, app, and CTV publishers unlock their full
                                monetization potential. We provide advanced programmatic solutions,
                                performance-driven strategies, and full compliance support to ensure
                                publishers grow sustainably and profitably in today's evolving digital ecosystem.
                            </p>
                            <p className='text-lg text-gray-700 leading-relaxed mb-4'>
                                We work closely with trusted Google Certified Publishing Partners and
                                Google MCM partners to deliver seamless access to Google Ad Manager 360,
                                Google AdX, and other premium demand sources. Our team brings industry
                                expertise, real-time insights, and tailored strategies to each publisher we serve.
                            </p>
                        </div>
                    </div>


                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        <FeatureCard
                            icon={ScanEye}
                            title="Our Vision"
                            description="To create a fair and accessible digital environment where every quality
                        publisher has the opportunity to grow revenue, protect brand value, and
                        build long-term success through transparent and intelligent monetization solutions."
                        />
                        <FeatureCard
                            icon={GoalIcon}
                            title="Our Mission"
                            description="To empower digital publishers through performance-focused ad operations,
                        policy-compliant practices, and data-driven monetization strategies that
                        increase revenue and maintain platform trust across every device and audience segment."

                        />
                    </div>

                    <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-200">
                        <div className="text-left max-w-6xl mx-auto text-gray-900">
                            <h2 className="text-2xl font-bold  mb-4">
                                What We Do
                            </h2>
                            <p>
                                PubShine offers a complete suite of monetization and ad operations
                                services for publishers of all sizes. Our core offerings include:
                            </p>

                            <FeatureCard
                                className='!border-none cursor-pointer'
                                title="Google AdX and GAM360 Access"
                                description="We connect publishers with high-quality demand through certified
                                    partners, ensuring optimal fill rates and premium earnings."
                            />
                            <FeatureCard
                                className='!border-none cursor-pointer'
                                title="Custom Ad Stack Configuration"
                                description=" We build and optimize monetization setups for websites, mobile apps,
                                    and CTV properties to maximize yield and engagement."
                            />
                            <FeatureCard
                                className='!border-none cursor-pointer'
                                title="Cross-Platform Monetization"
                                description="We develop strategies that perform consistently across devices and
                                    formats, helping publishers deliver better experiences and better results."
                            />
                            <FeatureCard
                                className='!border-none cursor-pointer'
                                title="Real-Time Analytics and Reporting"
                                description=" Our clients gain access to accurate and actionable reporting tools
                                    that provide full visibility into impressions, revenue, and performance."
                            />
                            <FeatureCard
                                className='!border-none cursor-pointer'
                                title="Compliance and Quality Assurance"

                                description="We take policy enforcement seriously. Our systems actively monitor
                                    for invalid traffic and policy violations to protect your accounts and revenue."
                            />
                            <FeatureCard
                                className='!border-none cursor-pointer'
                                title="Real-Time Analytics and Reporting"
                                description=" Our clients gain access to accurate and actionable reporting tools
                                    that provide full visibility into impressions, revenue, and performance."
                            />
                            <FeatureCard
                                className='!border-none cursor-pointer'
                                title="Real-Time Analytics and Reporting"
                                description=" Our clients gain access to accurate and actionable reporting tools
                                    that provide full visibility into impressions, revenue, and performance."
                            />



                        </div>
                    </div>


                    <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-200">
                        <div className="text-left max-w-6xl mx-auto text-gray-900">
                            <h2 className="text-2xl font-bold  mb-4">
                                Why Publishers Choose PubShine
                            </h2>

                            <FeatureCard
                                className='!border-none cursor-pointer'
                                title="Seamless Access to Premium Demand"
                                description=" We simplify the process of monetization through established partnerships and expert onboarding support."
                            />
                            <FeatureCard
                                className='!border-none cursor-pointer'
                                title="Strategies Tailored to Each Publisher"
                                description="We recognize that no two publishers are alike. Our team delivers personalized plans aligned with your audience, content, and goals."
                            />

                            <FeatureCard
                                className='!border-none cursor-pointer'
                                title="Compliance as a Core Principle"
                                description="We prioritize platform health by enforcing best practices and eliminating monetization risks at the source."
                            />

                            <FeatureCard
                                className='!border-none cursor-pointer'
                                title="Smart Technology for Higher Yield"
                                description="Our infrastructure includes smart refresh logic, optimized placements, and tools that increase revenue without compromising user experience."
                            />
                            <FeatureCard
                                className='!border-none cursor-pointer'
                                title="Global Support with Local Understanding"
                                description="We offer dedicated support and ongoing optimization guidance backed by real industry experience."
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 my-12">
                            <FeatureCard
                                icon={Globe2}
                                title="Our Global Presence"
                                description="PubShine serves publishers across South Asia, Southeast Asia, East Asia,
                            North Africa, the Middle East, Europe, North America, and Oceania. Our
                            network includes publishers from Pakistan, India, China, Indonesia, Egypt,
                            Morocco, the United Kingdom, the United States, Canada, and New Zealand.
                            With insights into each region's advertiser trends and performance patterns,
                            we provide localized strategies powered by global expertise."
                            />
                            <FeatureCard
                                icon={LineChart}
                                title="Let's Build Revenue Together"
                                description=" At PubShine, we deliver more than access. We deliver results. Whether
                            you are just starting or scaling rapidly, we are here to help you grow
                            with confidence, transparency, and performance."
                            />
                        </div>
                        

                        <SectionTitle></SectionTitle>
                        <p>
                           
                        </p>

                        <div className="mt-4 p-4 bg-white rounded-lg text-black">
                            <p><span className="font-medium">Email:</span> <a href="mailto:support@pubshine.com" className="text-orange-500 hover:text-orange-600">support@pubshine.com</a></p>
                            <p><span className="font-medium">Website:</span> <a href="https://pubshine.com/contact-us" className="text-orange-500 hover:text-orange-600">https://pubshine.com/contact-us</a></p>
                        </div>
                    </div></div>
            </PageContainer>
        </Wrapper>
    )
}

export default AboutUs