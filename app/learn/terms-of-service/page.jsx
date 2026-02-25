"use client";
import Wrapper from '@/app/wrapper/page';
import React from 'react';
import { PageContainer, PageTitle, SectionTitle } from '../../about-us/page';



// TermsOfServicePage Component showing all pages
const TermsOfServicePage = () => {

    return (
        <Wrapper whiteLogo>
            <PageContainer>
                <PageTitle>Terms of Service</PageTitle>

                <div className="space-y-6 text-gray-50 leading-relaxed">
                    <p>
                        Welcome to PubShine. These Terms of Service govern your access to and
                        use of our website, tools, and monetization services. By using our
                        platform, you acknowledge that you have read, understood, and agreed to
                        be bound by these terms. If you do not agree with any part of these
                        terms, please do not use our services.
                    </p>

                    <SectionTitle>Service Use and Eligibility</SectionTitle>
                    <p>
                        Our services are intended for digital publishers, app owners, and
                        content platforms who are seeking advanced advertising monetization
                        solutions. By accessing PubShine, you confirm that you are legally
                        authorized to enter into this agreement and that the information you
                        provide is accurate, current, and complete.
                    </p>
                    <p>
                        You agree to use our services in compliance with all applicable laws,
                        publisher policies, and platform guidelines, including those set by
                        Google and other advertising partners.
                    </p>

                    <SectionTitle>Publisher Approvals and Onboarding</SectionTitle>
                    <p>
                        To access monetization services such as Managed Inventory or Managed
                        Account via our partner network, publishers must first pass our
                        eligibility screening. PubShine reserves the right to approve or reject
                        any site or app based on quality, compliance, or technical suitability.
                    </p>
                    <p>
                        Approved publishers are responsible for maintaining policy compliance on
                        their properties. Violation of ad network terms, including invalid
                        traffic or prohibited content, may lead to suspension or termination of service.
                    </p>

                    <SectionTitle>Account Responsibility</SectionTitle>
                    <p>
                        If you are granted access to a managed setup or reporting dashboard, you
                        are responsible for keeping your credentials confidential. Any activity
                        under your account is considered authorized unless reported otherwise.
                    </p>
                    <p>
                        You must promptly notify us of any unauthorized access, security
                        breaches, or changes to your business that could affect your account or
                        compliance status.
                    </p>

                    <SectionTitle>Intellectual Property</SectionTitle>
                    <p>
                        All content on the PubShine website including text, images, branding,
                        layouts, and underlying technology is the intellectual property of
                        PubShine Pvt. Ltd. or licensed partners. Reproduction, redistribution,
                        or modification of any part of the site without written permission is
                        strictly prohibited.
                    </p>
                    <p>
                        Your access to our platform does not grant any ownership or rights to
                        our intellectual property.
                    </p>

                    <SectionTitle>Payments and Revenue Distribution</SectionTitle>
                    <p>
                        Revenue generated through our monetization services will be shared with
                        publishers based on the agreed terms at the time of onboarding. PubShine
                        calculates earnings using third-party reporting systems from ad
                        partners. Final earnings are subject to validation and deduction for any
                        invalid traffic or non-compliant activity.
                    </p>
                    <p>
                        Payment cycles, minimum payout thresholds, and billing methods are
                        communicated during onboarding. It is your responsibility to ensure your
                        payment details are accurate and up to date.
                    </p>

                    <SectionTitle>Technical Assistance</SectionTitle>
                    <p>
                        PubShine may offer technical assistance to help integrate ad tags,
                        ads.txt entries, or other configurations on your digital properties. If
                        you grant us temporary access to your platform or CMS, you accept
                        responsibility for resetting or disabling that access once the task is complete.
                    </p>
                    <p>
                        We provide technical support as a courtesy, and while we act with care,
                        PubShine will not be liable for any unintended impact on your site or its content.
                    </p>

                    <SectionTitle>Policy Violations and Termination</SectionTitle>
                    <p>
                        PubShine reserves the right to suspend or terminate your access to
                        services at any time without prior notice, particularly in cases involving:
                    </p>
                    <ul className="list-disc ml-6 space-y-1">
                        <li>Breach of third-party ad network policies</li>
                        <li>Engagement in fraudulent traffic practices</li>
                        <li>Repeated violations of compliance guidelines</li>
                        <li>Inaccurate or misleading representations during onboarding</li>
                    </ul>
                    <p>
                        Termination may result in forfeiture of unpaid earnings if found to be
                        in violation of policies.
                    </p>

                    <SectionTitle>Limitation of Liability</SectionTitle>
                    <p>
                        While we aim to provide reliable services, PubShine shall not be held
                        liable for any indirect, incidental, or consequential damages resulting
                        from your use or inability to use the platform. This includes, but is
                        not limited to, loss of revenue, data, or business opportunity.
                    </p>
                    <p>
                        We are not responsible for third-party outages, reporting discrepancies,
                        or service interruptions beyond our control.
                    </p>

                    <SectionTitle>Jurisdiction and Legal Compliance</SectionTitle>
                    <p>
                        These Terms of Service are governed by the laws of Pakistan. Any
                        disputes arising from the interpretation or application of these terms
                        shall be resolved under the jurisdiction of the courts of Sukkur, Sindh,
                        unless otherwise required by local law.
                    </p>

                    <SectionTitle>Updates to These Terms</SectionTitle>
                    <p>
                        PubShine may modify these Terms of Service at any time to reflect
                        updates in services, legal requirements, or platform changes. Updated
                        terms will be posted on our website and become effective immediately.
                        Continued use of our services constitutes your acceptance of the revised terms.
                    </p>

                    <SectionTitle>Contact Information</SectionTitle>
                    <p>If you have any questions about these Terms of Service or require assistance, please reach out to us at:</p>
                    <div className="mt-4 p-4 bg-black rounded-lg">
                        <p><span className="font-medium">Email:</span> <a href="mailto:support@pubshine.com" className="text-orange-500 hover:text-orange-600">support@pubshine.com</a></p>
                        <p><span className="font-medium">Website:</span> <a href="https://pubshine.com/contact-us" className="text-orange-500 hover:text-orange-600">https://pubshine.com/contact-us</a></p>
                    </div>
                </div>
            </PageContainer>
        </Wrapper>
    )
}

export default TermsOfServicePage