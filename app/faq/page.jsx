"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { pubShineFAQ } from "../config/content";
import { useRouter } from "next/navigation";

const { default: Wrapper } = require("../wrapper/page")
// added faq section to the home page, with a button that redirects to the contact us page
const FAQ = () => {
    const router = useRouter()
    const [openFaq, setOpenFaq] = useState(null);

    return (
        <Wrapper whiteLogo>
            {/* FAQ Section */}
            <section className="my-[70px] pb-20 pt-10 bg-orange-500" id="faq">
                <div className="container mx-auto px-2 md:px-6">
                    <h2 className="text-4xl text-white font-bold text-center mb-16">
                        FREQUENTLY ASKED<br />
                        <span className="text-black">QUESTIONS</span>
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {pubShineFAQ.map((faq, index) => (
                            <div key={index} className="bg-white rounded-lg border border-gray-50">
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white transition-colors"
                                >
                                    <span className="font-semibold text-black">{faq.question}</span>
                                    <ChevronDown className={`w-5 h-5 text-black transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                                </button>
                                {openFaq === index && (
                                    <div className="px-6 pb-4 pt-5">
                                        <p className="text-black">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button onClick={() => router.push("/contact-us")} className="bg-white hover:bg-gray-50 px-8 text-orange-500 py-2 rounded-lg font-semibold text-lg transition-colors">
                            Get Started
                        </button>
                    </div>
                </div>
            </section>

        </Wrapper>
    )
}

export default FAQ