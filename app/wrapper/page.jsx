"use client";
import { ChevronDown, Facebook, Instagram, Linkedin, Menu, MessageSquare, Twitter, X, XSquareIcon } from 'lucide-react';
import Link from 'next/link';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { BsInstagram } from 'react-icons/bs';
import { FaFacebookSquare, FaInstagramSquare, FaLinkedinIn, FaSignOutAlt, FaTwitterSquare, FaWhatsapp } from 'react-icons/fa';
import { XIcon } from 'react-share';


const Wrapper = ({ children, whiteLogo }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRef = useRef(null);
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if (!router.isReady) return;

        const hash = window.location.hash;
        if (hash) {
            // Delay to wait for DOM elements to load
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 20);
        }
    }, [router.isReady]);

    // Change header style on scroll
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleDropdownToggle = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    const handleMenuClick = (href) => {
        router.push(href)
    };

    const handleContactClick = () => {
        window.open("https://wa.me/+923337849063", '_blank');
    };

    const MenuItems = [
        { label: "Home", href: "/#" },
        {
            label: "Monetization",
            href: "monetization",
            dropdown: [
                { label: "Web Monetization", href: "/monetization/web" },
                { label: "App Monetization", href: "/monetization/app" },
                { label: "CTV Monetization", href: "/monetization/ctv" },
            ]
        },
        { label: "About Us", href: "/about-us" },
        { label: "FAQ", href: "/faq" },
        // { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact-us" }
    ];


    return (
        <div className="min-h-screen  text-white">
            {/* Header */}
            <header className={`fixed top-0 w-full ${scrolled ? "bg-black/90 backdrop-blur-sm" : "bg-transparent"} z-50 transition-all duration-300`}>
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="">
                        <img
                            onClick={() => handleMenuClick("/")}
                            src={`/images/${whiteLogo ? "white-logo.png" : scrolled ? "white-logo.png" : "horizontal-logo2.png"}`}
                            className='w-28 cursor-pointer'
                            alt="PUBSHINE logo"
                        />
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8" ref={dropdownRef}>
                        {MenuItems.map((item, index) => (
                            <div key={index} className="relative">
                                {item.dropdown ? (
                                    <div className="relative">
                                        <button
                                            onClick={() => handleDropdownToggle(index)}
                                            className={`${scrolled ? "text-white" : "text-white"} hover:text-orange-200 transition-colors flex items-center space-x-1`}
                                        >
                                            <span>{item.label}</span>
                                            <ChevronDown
                                                size={16}
                                                className={`transform transition-transform duration-200 ${openDropdown === index ? 'rotate-180' : ''}`}
                                            />
                                        </button>

                                        {/* Desktop Dropdown Menu */}
                                        <div className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 transition-all duration-200 ${openDropdown === index
                                            ? 'opacity-100 visible transform translate-y-0'
                                            : 'opacity-0 invisible transform -translate-y-2'
                                            }`}>
                                            {item.dropdown.map((dropdownItem, dropdownIndex) => (
                                                <button
                                                    key={dropdownIndex}
                                                    onClick={() => handleMenuClick(dropdownItem.href)}
                                                    className="w-full text-left cursor-pointer px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                                >
                                                    {dropdownItem.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href}
                                        smooth={"true"}
                                        className={`${scrolled ? "text-white" : "text-white"} cursor-pointer hover:text-orange-200 transition-colors`}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Desktop WhatsApp Button */}
                    <div className='flex item-center gap-4'>
                        <button
                            onClick={handleContactClick}
                            className="hidden md:flex bg-gradient-to-br rounded-full items-center from-orange-400 to-orange-700 hover:from-orange-500 hover:to-orange-800 cursor-pointer px-4 py-2 font-semibold transition-all duration-300 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            <FaWhatsapp size={20} className='mr-2' />
                            Whatsapp
                        </button>

                        {session && (
                            <button
                                onClick={() => signOut()}
                                className="hidden md:block rounded-full items-center from-orange-400 to-orange-700 hover:from-orange-500 hover:to-orange-800 cursor-pointer px-4 py-2 font-semibold transition-all duration-300 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                {session.user.name.charAt(0).toUpperCase()}
                                <FaSignOutAlt className="ml-2" />
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden text-white focus:outline-none"
                    >
                        {mobileMenuOpen ? (
                            <X size={28} />
                        ) : (
                            <Menu size={28} />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden fixed  top-[72px] z-50 !bg-black/95 backdrop-blur-sm transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}>
                    <nav className="container mx-auto px-6 py-8">
                        {MenuItems.map((item, index) => (
                            <div key={index} className="mb-4">
                                {item.dropdown ? (
                                    <div>
                                        <button
                                            onClick={() => handleDropdownToggle(index)}
                                            className="w-full text-left text-white hover:text-orange-200 transition-colors flex items-center justify-between py-3 border-b border-gray-800"
                                        >
                                            <span className="text-lg">{item.label}</span>
                                            <ChevronDown
                                                size={20}
                                                className={`transform transition-transform duration-200 ${openDropdown === index ? 'rotate-180' : ''}`}
                                            />
                                        </button>

                                        {/* Mobile Dropdown Menu */}
                                        <div className={`overflow-hidden transition-all duration-300 ${openDropdown === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                            }`}>
                                            <div className="bg-gray-900/50 rounded-lg mt-2 py-2">
                                                {item.dropdown.map((dropdownItem, dropdownIndex) => (
                                                    <button
                                                        key={dropdownIndex}
                                                        onClick={() => handleMenuClick(dropdownItem.href)}
                                                        className="w-full text-left cursor-pointer px-4 py-3 text-gray-300 hover:text-orange-200 hover:bg-orange-900/20 transition-colors"
                                                    >
                                                        {dropdownItem.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleMenuClick(item.href)}
                                        className="w-full text-left text-white hover:text-orange-200 transition-colors py-3 border-b border-gray-800 text-lg"
                                    >
                                        {item.label}
                                    </button>
                                )}
                            </div>
                        ))}

                        {/* Mobile WhatsApp Button */}
                        <div className="mt-8">
                            <button
                                onClick={handleContactClick}
                                className="w-full bg-gradient-to-br flex justify-center rounded-full items-center from-orange-400 to-orange-700 hover:from-orange-500 hover:to-orange-800 cursor-pointer px-6 py-4 font-semibold transition-all duration-300 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                <FaWhatsapp size={24} className='mr-3' />
                                Contact via WhatsApp
                            </button>
                        </div>
                    </nav>
                </div>
            </header>
            {children}

            {/* Footer */}
            <footer className="bg-black border-t border-gray-800 py-12">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-5 gap-8">
                        <div className="md:col-span-2">
                            <div className="">
                                {/* <span className="text-white">PUBSHINE</span> */}
                                <img src={`/images/white-logo.png`} className='w-36 mb-3' alt="logo" />
                            </div>

                            <p className="text-gray-400 text-sm">
                                At PubShine Pvt. Ltd, we empower publishers to unlock higher earnings through premium monetization for web, app, and CTV. Our seamless AdX access and advanced optimization strategies help you turn traffic into sustainable revenue. Let&apos;s elevate your ad performance starting today.
                            </p>
                        </div>

                        <div className='hidden'>
                            <h4 className="font-semibold mb-4">MENU</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-orange-400">Home</a></li>
                                <li><a href="#" className="hover:text-orange-400">What we do</a></li>
                                {/* <li><a href="#" className="hover:text-orange-400">Blog</a></li> */}
                                <li><a href="/contact-us" className="hover:text-orange-400">Contact</a></li>
                            </ul>
                        </div>
                        <div className='flex flex-col justify-start items-center'>
                            <h4 className="font-semibold mb-4">Contact</h4>
                            <ul className="space-y-2 text-lg text-gray-400 flex flex-col justify-start items-center">
                                <li><a href=" https://wa.me/+923178882929" target="_blank" className="hover:text-orange-400">+923178882929</a></li>
                                <li><a href=" https://wa.me/+923337849063" target="_blank" className="hover:text-orange-400">+923337849063</a></li>
                                <li><a href="mailto:support@pubshine.com" className="hover:text-orange-400">support@pubshine.com</a></li>
                                {/* <li><a href="/learn/terms-of-service" className="hover:text-orange-400">Terms of Service</a></li>
                                <li><a href="/blog" className="hover:text-orange-400">Blog</a></li> */}
                            </ul>
                        </div>



                        <div className='flex flex-col justify-start items-center'>
                            <h4 className="font-semibold mb-4">Information</h4>
                            <ul className="space-y-2 text-lg text-gray-400 flex flex-col justify-start items-center">
                                <li><a href="/about-us" className="hover:text-orange-400">About Us</a></li>
                                <li><a href="/learn/privacy" className="hover:text-orange-400">Privacy Policy</a></li>
                                <li><a href="/learn/terms" className="hover:text-orange-400">Terms of Service</a></li>
                                <li><a href="/blog" className="hover:text-orange-400">Blog</a></li>
                            </ul>
                        </div>
                        <div className='flex flex-col justify-start items-center'>
                            <h4 className="font-semibold mb-4">Services</h4>
                            <ul className="space-y-2 text-lg text-gray-400 flex flex-col justify-start items-center">
                                <li><a href="/monetization/web" className="hover:text-orange-400">Web Monetization</a></li>
                                <li><a href="/monetization/app" className="hover:text-orange-400">App Monetization</a></li>
                                <li><a href="/monetization/ctv" className="hover:text-orange-400">CTV Monetization</a></li>

                            </ul>
                        </div>


                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 flex justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            ©{new Date().getFullYear()} Pubshine Pvt. Ltd. All rights reserved.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://www.facebook.com/pubshineofficial"
                                className=" rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors duration-200 group"
                            >
                                <FaFacebookSquare className="w-5 h-5 text-blue-600 group-hover:text-gray-500" />
                            </a>
                            <a
                                href="https://x.com/PubShine"
                                className="  rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors duration-200 group"
                            >
                                <XIcon className="w-6 text-blue-400 group-hover:text-gray-400" />
                            </a>
                            <a
                                href="https://www.instagram.com/pubshine/"
                                className=" rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors duration-200 group"
                            >
                                <BsInstagram className="w-4 text-pink-100 group-hover:text-pink-200" />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/pubshine/about/?viewAsMember=true"
                                className="rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors duration-200 group"
                            >
                                <FaLinkedinIn className="w-5 h-5 text-blue-400 group-hover:text-gray-600" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Wrapper