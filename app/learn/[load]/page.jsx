"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, FileText, Shield } from 'lucide-react';
import Wrapper from '@/app/wrapper/page';
import { useParams } from 'next/navigation';

export default function PubShineLegalPages({ params }) {
    const { load } = useParams(params)

    const [currentPage, setCurrentPage] = useState(load || 'privacy');

    const PrivacyPolicy = () => (
        <div className="bg-white rounded-lg shadow-lg p-8 text-black max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
                <Shield className="w-8 h-8 text-orange-500 mr-3" />
                <h1 className="text-3xl font-bold">Privacy Policy</h1>
            </div>

            <div className="space-y-6">
                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-orange-600">Privacy Promise at PubShine</h2>
                    <p className="text-gray-700 leading-relaxed">
                        At PubShine, privacy is more than a formality — it is a foundational part of how we operate.
                        We are committed to transparency and integrity in the way we handle all information entrusted to us.
                        Our approach to privacy is simple: collect only what is necessary, use it responsibly, and protect it diligently.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-orange-600">What We Know About You and Why</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        We only collect information when there is a clear reason to do so. This typically occurs when:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>You fill out a form on our website</li>
                        <li>You submit your website or app for monetization review</li>
                        <li>You engage with our team via email or other communications</li>
                        <li>You voluntarily sign up for updates or services</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mt-4">
                        Additionally, we may collect limited technical information, such as general location, browser type,
                        or device category, to better understand how users interact with our site and to enhance its performance and usability.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-orange-600">What Happens to Your Information</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        Any personal or business-related information you share is used solely for operational purposes, such as:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Responding to your queries or service requests</li>
                        <li>Assessing digital properties for monetization compatibility</li>
                        <li>Sending relevant updates or communications (if you have opted in)</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mt-4">
                        Your data is not shared, sold, or distributed to any unrelated third party. We do not engage in
                        unauthorized data transfers or use your information beyond the scope of the original purpose.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-orange-600">Third-Party Tools We Rely On</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        To maintain and optimize our website's functionality, we use selected third-party tools that help us
                        monitor performance and improve user experience. These tools may collect anonymous usage data through
                        technologies such as cookies or tracking scripts.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        You have the option to manage or disable cookies via your browser settings. Doing so will not prevent
                        access to our site, though certain features may operate differently.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-orange-600">Your Right to Know and Decide</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        We respect your right to control your personal data. Depending on your jurisdiction, you may have the right to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Request access to the data we hold about you</li>
                        <li>Request correction of inaccurate or outdated information</li>
                        <li>Request deletion of your data where applicable</li>
                        <li>Object to certain types of data use, including marketing</li>
                        <li>Withdraw consent at any time</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mt-4">
                        To make any such request, you may contact us directly at{' '}
                        <a href="mailto:support@pubshine.com" className="text-orange-600 hover:text-orange-700 font-semibold">
                            support@pubshine.com
                        </a>. We handle all requests promptly and in accordance with applicable data protection laws.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-orange-600">Data Security is a Standard Here</h2>
                    <p className="text-gray-700 leading-relaxed">
                        We apply appropriate technical and organizational measures to ensure the security of all information collected.
                        Access is restricted to authorized personnel, and data is stored using industry-standard safeguards to prevent
                        loss, misuse, or unauthorized access.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-orange-600">If Things Change, We Will Let You Know</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Our Privacy Policy may be updated as our services evolve or as legal requirements change. Any modifications
                        will be reflected on this page along with a revised effective date. We encourage you to revisit this page
                        periodically to stay informed.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-orange-600">Have a Privacy Concern or Question?</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        If you have any questions, feedback, or data-related concerns, please contact us at:
                    </p>
                    <div className="bg-white p-4 rounded-lg">
                        <p className="text-gray-700">
                            <strong>Email:</strong>{' '}
                            <a href="mailto:support@pubshine.com" className="text-orange-600 hover:text-orange-700">
                                support@pubshine.com
                            </a>
                        </p>
                        <p className="text-gray-700">
                            <strong>Website:</strong>{' '}
                            <a href="http://pubshine.com/contact-us" className="text-orange-600 hover:text-orange-700">
                                https://pubshine.com/contact-us
                            </a>
                        </p>
                    </div>
                    <p className="text-gray-600 text-sm mt-4">
                        <strong>Last updated:</strong> June 2025
                    </p>
                </section>
            </div>
        </div>
    );

    const TermsOfService = () => (
        <div className="bg-white rounded-lg shadow-lg p-8 text-black max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
                <FileText className="w-8 h-8 text-orange-500 mr-3" />
                <h1 className="text-3xl font-bold">Terms of Service</h1>
            </div>

            <div className="space-y-6">
                <section>
                    <p className="text-gray-700 leading-relaxed">
                        Welcome to PubShine. These Terms of Service govern your access to and use of our website, tools,
                        and monetization services. By using our platform, you acknowledge that you have read, understood,
                        and agreed to be bound by these terms. If you do not agree with any part of these terms, please
                        do not use our services.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-orange-600">Service Use and Eligibility</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        Our services are intended for digital publishers, app owners, and content platforms who are seeking
                        advanced advertising monetization solutions. By accessing PubShine, you confirm that you are legally
                        authorized to enter into this agreement and that the information you provide is accurate, current, and complete.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        You agree to use our services in compliance with all applicable laws, publisher policies, and platform
                        guidelines, including those set by Google and other advertising partners.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-orange-600">Publisher Approvals and Onboarding</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        To access monetization services such as Managed Inventory or Managed Account via our partner network,
                        publishers must first pass our eligibility screening. PubShine reserves the right to approve or reject
                        any site or app based on quality, compliance, or technical suitability.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Approved publishers are responsible for maintaining policy compliance on their properties. Violation of
                        ad network terms, including invalid traffic or prohibited content, may lead to suspension or termination of service.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-orange-600">Account Responsibility</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        If you are granted access to a managed setup or reporting dashboard, you are responsible for keeping
                        your credentials confidential. Any activity under your account is considered authorized unless reported otherwise.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        You must promptly notify us of any unauthorized access, security breaches, or changes to your business
                        that could affect your account or compliance status.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-orange-600">Intellectual Property</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        All content on the PubShine website including text, images, branding, layouts, and underlying technology
                        is the intellectual property of PubShine Pvt. Ltd. or licensed partners. Reproduction, redistribution,
                        or modification of any part of the site without written permission is strictly prohibited.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Your access to our platform does not grant any ownership or rights to our intellectual property.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-orange-600">Payments and Revenue Distribution</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        Revenue generated through our monetization services will be shared with publishers based on the agreed
                        terms at the time of onboarding. PubShine calculates earnings using third-party reporting systems from
                        ad partners. Final earnings are subject to validation and deduction for any invalid traffic or non-compliant activity.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Payment cycles, minimum payout thresholds, and billing methods are communicated during onboarding.
                        It is your responsibility to ensure your payment details are accurate and up to date.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-orange-600">Technical Assistance</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        PubShine may offer technical assistance to help integrate ad tags, ads.txt entries, or other configurations
                        on your digital properties. If you grant us temporary access to your platform or CMS, you accept responsibility
                        for resetting or disabling that access once the task is complete.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        We provide technical support as a courtesy, and while we act with care, PubShine will not be liable for
                        any unintended impact on your site or its content.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-orange-600">Policy Violations and Termination</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        PubShine reserves the right to suspend or terminate your access to services at any time without prior
                        notice, particularly in cases involving:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Breach of third-party ad network policies</li>
                        <li>Engagement in fraudulent traffic practices</li>
                        <li>Repeated violations of compliance guidelines</li>
                        <li>Inaccurate or misleading representations during onboarding</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mt-4">
                        Termination may result in forfeiture of unpaid earnings if found to be in violation of policies.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-orange-600">Limitation of Liability</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        While we aim to provide reliable services, PubShine shall not be held liable for any indirect, incidental,
                        or consequential damages resulting from your use or inability to use the platform. This includes, but is
                        not limited to, loss of revenue, data, or business opportunity.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        We are not responsible for third-party outages, reporting discrepancies, or service interruptions beyond our control.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-orange-600">Jurisdiction and Legal Compliance</h2>
                    <p className="text-gray-700 leading-relaxed">
                        These Terms of Service are governed by the laws of Pakistan. Any disputes arising from the interpretation
                        or application of these terms shall be resolved under the jurisdiction of the courts of Sindh, unless
                        otherwise required by local law.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-orange-600">Updates to These Terms</h2>
                    <p className="text-gray-700 leading-relaxed">
                        PubShine may modify these Terms of Service at any time to reflect updates in services, legal requirements,
                        or platform changes. Updated terms will be posted on our website and become effective immediately.
                        Continued use of our services constitutes your acceptance of the revised terms.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-orange-600">Contact Information</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        If you have any questions about these Terms of Service or require assistance, please reach out to us at:
                    </p>
                    <div className="bg-white p-4 rounded-lg">
                        <p className="text-gray-700">
                            <strong>Email:</strong>{' '}
                            <a href="mailto:support@pubshine.com" className="text-orange-600 hover:text-orange-700">
                                support@pubshine.com
                            </a>
                        </p>
                        <p className="text-gray-700">
                            <strong>Website:</strong>{' '}
                            <a href="http://pubshine.com/contact-us" className="text-orange-600 hover:text-orange-700">
                                https://pubshine.com/contact-us
                            </a>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );



    return (
        <Wrapper whiteLogo>
            <div className="min-h-screen bg-orange-500 py-8 px-4 mt-[70px]">
                <div className="max-w-6xl mx-auto">
                    {/* Navigation */}
                    {/* <div className="flex justify-center mb-8">
                        <div className="bg-white rounded-lg shadow-lg p-2 flex">
                            <button
                                onClick={() => setCurrentPage('privacy')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${currentPage === 'privacy'
                                    ? 'bg-orange-500 text-white shadow-md'
                                    : 'text-gray-700 hover:bg-orange-50'
                                    }`}
                            >
                                <Shield className="w-5 h-5 inline mr-2" />
                                Privacy Policy
                            </button>
                            <button
                                onClick={() => setCurrentPage('terms')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${currentPage === 'terms'
                                    ? 'bg-orange-500 text-white shadow-md'
                                    : 'text-gray-700 hover:bg-orange-50'
                                    }`}
                            >
                                <FileText className="w-5 h-5 inline mr-2" />
                                Terms of Service
                            </button>
                        </div>
                    </div> */}

                    {/* Page Content */}
                    <div className="transition-all duration-300">
                        {currentPage === 'privacy' ? <PrivacyPolicy /> : <TermsOfService />}
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex justify-end mt-8 max-w-4xl mx-auto">

                        <button
                            onClick={() => setCurrentPage(currentPage === 'privacy' ? 'terms' : 'privacy')}
                            className="bg-white hover:bg-white text-gray-700 px-6 py-3 rounded-lg shadow-lg transition-all duration-200 flex items-center"
                        >
                            {currentPage === 'privacy' ? 'Terms of Service' : 'Privacy Policy'}
                            <ChevronRight className="w-5 h-5 ml-2" />
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}