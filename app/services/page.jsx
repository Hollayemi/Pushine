import React from 'react';
import { Monitor, Video, Users, ArrowRightLeft } from 'lucide-react';
import Wrapper from '../wrapper/page';

export default function AdsSpecsPage() {
    const adTypes = [
        {
            id: 'banners',
            type: 'Banners',
            icon: Monitor,
            description: 'Praetium bibendum tempor orci venenatis pellentesque. Tellus cursus hendrerit orci augue volutpat tempus turpis. Nec id a commodo, ornare amet, pulvinar ipsum a. Dignissim nunc, sapien dictumst lacus, mauris proin sit. Tristique cursus tortor ullamcorper porta.',
            additionalText: 'Egestas quis habitasse tellus cursus odio hendrenit. Egestas mauris justo mauris, purus donec fringilla nunc morbi. In mi nulla.',
            specs: ['728x90', '1090x250', '468x60', '120x600', '180x800']
        },
        {
            id: 'video',
            type: 'Video',
            icon: Video,
            description: 'Praetium bibendum tempor orci venenatis pellentesque. Tellus cursus hendrerit orci augue volutpat tempus turpis. Nec id a commodo, ornare amet, pulvinar ipsum a. Dignissim nunc, sapien dictumst lacus, mauris proin sit. Tristique cursus tortor ullamcorper porta.',
            additionalText: 'Egestas quis habitasse tellus cursus odio hendrenit. Egestas mauris justo mauris, purus donec fringilla nunc morbi. In mi nulla.',
            specs: ['728x90', '1090x250', '468x60', '120x600', '180x800']
        },
        {
            id: 'influencers',
            type: 'Influencers',
            icon: Users,
            description: 'Praetium bibendum tempor orci venenatis pellentesque. Tellus cursus hendrerit orci augue volutpat tempus turpis. Nec id a commodo, ornare amet, pulvinar ipsum a. Dignissim nunc, sapien dictumst lacus, mauris proin sit. Tristique cursus tortor ullamcorper porta.',
            additionalText: 'Egestas quis habitasse tellus cursus odio hendrenit. Egestas mauris justo mauris, purus donec fringilla nunc morbi. In mi nulla.',
            specs: ['728x90', '1090x250', '468x60', '120x600', '180x800']
        },
        {
            id: 'exchanges',
            type: 'Exchanges',
            icon: ArrowRightLeft,
            description: 'Praetium bibendum tempor orci venenatis pellentesque. Tellus cursus hendrerit orci augue volutpat tempus turpis. Nec id a commodo, ornare amet, pulvinar ipsum a. Dignissim nunc, sapien dictumst lacus, mauris proin sit. Tristique cursus tortor ullamcorper porta.',
            additionalText: 'Egestas quis habitasse tellus cursus odio hendrenit. Egestas mauris justo mauris, purus donec fringilla nunc morbi. In mi nulla.',
            specs: ['728x90', '1090x250', '468x60', '120x600', '180x800']
        }
    ];

    return (
        <Wrapper>
            <div className="min-h-screen bg-gray-950 text-white my-10">
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-orange-600 rounded-full opacity-20 blur-xl"></div>
                    <div className="absolute top-40 right-20 w-20 h-20 bg-orange-400 rounded-full opacity-30 blur-lg"></div>
                    <div className="absolute bottom-32 right-1/4 w-24 h-24 bg-orange-400 rounded-full opacity-25 blur-lg"></div>
                </div>

                <div className="relative z-10 container mx-auto px-6 py-16">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-block mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl flex items-center justify-center rotate-12 mb-4 mx-auto">
                                <Monitor className="w-8 h-8 text-white -rotate-12" />
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">
                            We've got all the ads
                        </h1>
                    </div>

                    {/* Ad Types Grid */}
                    <div className="max-w-6xl mx-auto space-y-8">
                        {adTypes.map((adType, index) => {
                            const IconComponent = adType.icon;
                            return (
                                <div
                                    key={adType.id}
                                    className="bg-gray-800 rounded-2xl p-8 hover:bg-gray-750 transition-all duration-300"
                                >
                                    <div className="grid lg:grid-cols-12 gap-8 items-start">
                                        {/* Ad Type Info */}
                                        <div className="lg:col-span-8">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg flex items-center justify-center">
                                                    <IconComponent className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-400 uppercase tracking-wide">Ad Type</p>
                                                    <h2 className="text-2xl font-bold">{adType.type}</h2>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <p className="text-sm text-gray-400 mb-2 uppercase tracking-wide">Description</p>
                                                    <p className="text-gray-300 leading-relaxed mb-4">
                                                        {adType.description}
                                                    </p>
                                                    <p className="text-gray-300 leading-relaxed">
                                                        {adType.additionalText}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Ad Specs */}
                                        <div className="lg:col-span-4">
                                            <div className="text-right">
                                                <p className="text-sm text-gray-400 mb-4 uppercase tracking-wide">Ad Specs</p>
                                                <div className="space-y-3">
                                                    {adType.specs.map((spec, specIndex) => (
                                                        <div
                                                            key={specIndex}
                                                            className="bg-gray-700 px-4 py-2 rounded-lg text-right"
                                                        >
                                                            <span className="text-white font-mono text-sm">{spec}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Call to Action */}
                    <div className="text-center mt-16">
                        <div className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl p-8 max-w-2xl mx-auto">
                            <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
                            <p className="text-gray-200 mb-6">
                                Choose the ad format that works best for your campaign and reach your target audience effectively.
                            </p>
                            <button className="bg-white text-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                Get Started
                            </button>
                        </div>
                    </div>

                    {/* Bottom right decorative text */}
                    <div className="fixed bottom-8 right-8 text-gray-600 text-sm">
                        <div className="text-right">
                            <p>Ads</p>
                            <p>Go</p>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}