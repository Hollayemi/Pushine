"use client";
import React, { useEffect, useState } from 'react';
import { Phone, Mail, Link } from 'lucide-react';
import { FaFacebookSquare, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import Wrapper from '../wrapper/page';
import { contactDetails } from '../config/content';
import { useRouter } from 'next/navigation';
import { BsInstagram } from 'react-icons/bs';
import toast from 'react-hot-toast';
import Aos from 'aos';
import 'aos/dist/aos.css';

export default function ContactPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    // Initialize AOS and scroll handler
    useEffect(() => {
        Aos.init({
            duration: 800,
            easing: 'ease-in-out',
            once: false,
            mirror: true,
            offset: 100
        });

        return () => {
            Aos.refresh();
        };
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('');
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (response.ok) {
                toast.success("Message Sent Successfully")
                setFormData({ name: '', email: '', message: '' }); // Reset form
            } else {
                setSubmitStatus('error');
                console.error('Error:', result);
            }
        } catch (error) {
            setSubmitStatus('error');
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };



    return (
        <Wrapper whiteLogo>
            <div className="min-h-screen bg-orange-500 text-white">
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-orange-600 rounded-full opacity-20 blur-xl"></div>
                    <div className="absolute top-40 right-20 w-20 h-20 bg-orange-400 rounded-full opacity-30 blur-lg"></div>
                    <div className="absolute bottom-32 left-1/3 w-24 h-24 bg-indigo-400 rounded-full opacity-25 blur-lg"></div>
                </div>

                <div className="relative z-10 container mx-auto px-6 py-16 mt-20">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className=" hidden mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl flex items-center justify-center rotate-12 mb-4 mx-auto">
                                <Mail className="w-8 h-8 text-white -rotate-12" />
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">
                            Contact
                        </h1>
                        <p className="text-white text-lg max-w-md mx-auto">
                            If you prefer to contact us another way, feel free to reach us below:
                        </p>
                    </div>

                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
                        {/* Contact Form */}
                        <div className="space-y-6">
                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-md font-medium text-white mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white border border-orange-700 !text-black rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-md font-medium text-white mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white border border-orange-700 !text-black rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none transition-all duration-200  placeholder-gray-400"
                                        placeholder="Enter your email address"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-md font-medium text-white mb-2">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={6}
                                        className="w-full px-4 py-3 bg-white border border-orange-700 !text-black rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 resize-none"
                                        placeholder="Tell us what's on your mind..."
                                    ></textarea>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    type="submit"
                                    className="w-full bg-white hover:from-orange-700 hover:to-orange-100 text-orange-500 font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-gray-900"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="lg:pl-8 mt-4">
                            <div className="space-y-8 ">
                                {/* Phone */}
                                <div className="hidden  items-center cursor-pointer space-x-4 group" onClick={() => window.open('https://wa.me/+923337849063', '_blank')}>
                                    <div className="w-12 h-12 bg-orange-800 rounded-lg flex items-center justify-center">
                                        <FaWhatsapp className="w-6 h-6 text-orange-400" />
                                    </div>
                                    <div>
                                        <p className="text-gray-950 text-sm">Whatsapp</p>
                                        <p className="text-white font-medium">‪+923337849063</p>
                                    </div>
                                    <Link size={12} className='hidden group-hover:block -mt-7' />
                                </div>
                                <div className="hidden  items-center space-x-4">
                                    <div className="w-12 h-12 bg-orange-800 rounded-lg flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-orange-400" />
                                    </div>
                                    <div>
                                        <p className="text-gray-950 text-sm">Phone</p>
                                        <p className="text-white font-medium">‪+923178882929‬
                                        </p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="hidden  items-center space-x-4">
                                    <div className="w-12 h-12 bg-orange-800 rounded-lg flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-orange-400" />
                                    </div>
                                    <div>
                                        <p className="text-gray-950 text-sm">Email</p>
                                        <p className="text-white font-medium">support@pubshine.com</p>
                                    </div>
                                </div>

                                {/* Additional Info Card */}
                                <div className="bg-white rounded-xl p-6 mt-8">
                                    <h3 className="text-xl font-semibold mb-3 text-gray-950">Get in touch to discuss your monetization goals</h3>
                                    <p className="text-gray-800 text-lg leading-relaxed">
                                        We&apos;ll review your details and respond promptly to either schedule a call or continue the conversation via email. Whether you need AdX access, setup guidance, or revenue optimization, we&apos;re here to support you.
                                    </p>
                                </div>
                                {/* Social Media */}
                                <div className="mt-32">
                                    <h3 className="text-lg text-center font-semibold mb-4">Follow Us</h3>
                                    <div className="flex justify-center space-x-4">
                                        <a
                                            href="https://www.facebook.com/pubshineofficial"
                                            className=" rounded-full flex items-center justify-center transition-colors duration-200 group"
                                        >
                                            <FaFacebookSquare className="w-8 h-8 text-white group-hover:text-gray-500" />
                                        </a>
                                        <a
                                            href="https://x.com/PubShine"
                                            className="  rounded-full flex items-center justify-center transition-colors duration-200 group"
                                        >
                                            <img src='/images/x-white.png' className='w-8' />
                                        </a>
                                        <a
                                            href="https://www.instagram.com/pubshine/"
                                            className=" rounded-full flex items-center justify-center transition-colors duration-200 group"
                                        >
                                            <BsInstagram className="!text-[28px] text-pink-100 group-hover:text-pink-200" />
                                        </a>
                                        <a
                                            href="https://www.linkedin.com/company/pubshine/about/?viewAsMember=true"
                                            className="rounded-full flex items-center justify-center transition-colors duration-200 group"
                                        >
                                            <FaLinkedinIn className="w-8 h-8 text-white group-hover:text-gray-600" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-7xl mt-10 mx-auto">
                        {contactDetails.map((item, i) => {
                            const IconComponent = item.icon;

                            return (
                                <div
                                    key={i}
                                    className="group aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer"
                                    data-aos="zoom-in"
                                    data-aos-delay={i * 100}
                                    onClick={() => item.link ? router.push(item.link) : () => { }}
                                >
                                    <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200">
                                        {/* Default state - Icon centered */}

                                        {/* Hover state - Text content fades in */}
                                        <div className="absolute inset-0 flex flex-col px-4 items-center justify-center p-6 opacity-100 transition-all duration-500 group-hover:opacity-100">
                                            <IconComponent className="w-12 h-12 text-orange-400 mb-4 transform scale-75" />
                                            <h3 className="text-lg font-bold text-orange-700 mb-2 text-center transform translate-y-4 transition-all duration-500 delay-100 group-hover:translate-y-0">
                                                {item.title}
                                            </h3>
                                            <p className="text-orange-400 text-wrap text-xs md:text-sm text-center transform translate-y-4 transition-all duration-500 delay-200 group-hover:translate-y-0">
                                                {item.description}
                                            </p>
                                        </div>

                                        {/* Background overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-orange-600/10 opacity-100 transition-opacity duration-300 group-hover:opacity-100"></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </Wrapper>
    );
}