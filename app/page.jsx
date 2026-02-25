"use client";
import React, { useEffect, useState } from 'react';
import {
  Play,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Globe,
  Smartphone,
  Tv,
} from 'lucide-react';
import Wrapper from './wrapper/page';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { heroTicks, otherThingsWeDo, testimonials } from './config/content';
import { useRouter } from 'next/navigation';

const AdTechLanding = () => {
  const router = useRouter()
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    // Set up the interval for auto-rotation
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000); // Rotate every 5 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [testimonials.length]); // Add dependencies to avoid memory leaks

  // Initialize AOS and scroll handler
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
      offset: 100
    });

    return () => {
      AOS.refresh();
    };
  }, []);




  return (
    <Wrapper>
      <div className="min-h-screen bg-black text-white">
        <section className="h-screen relative overflow-hidden">
          <div className="absolute z-10 flex justify-center items-center !w-full !h-full left-0">
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              src="/videos/hero.mp4"
            />
          </div>
          
          <div className="absolute z-10 inset-0 bg-gradient-to-b opacity-30 bg-orange-300"></div>
          <div className="container z-20 h-full mx-auto flex flex-col justify-center md:justify-center items-center px-2 md:px-6 text-center relative">
            <div
              className=" mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h1 className="text-[33px] md:text-5xl font-bold mb-6 leading-tight select-none ">
                <span className="text-orange-400 "> Premium Monetization </span> made <br className='hidden md:block' /> easy with <br className='block md:hidden' />
                PubShine.
                <br />

              </h1>
              <p className="text-[16px] text-gray-100 mb-12 max-w-3xl mx-auto select-none">
                Premium AdTech monetization for publishers. Instant Google AdX & GAM360 access. Up to 92% revenue share. Average clients see 340% revenue increase in last 30 days
              </p>
            </div>

            {/* Stats Row */}
            <div
              className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 text-sm"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              {heroTicks.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2"
                  data-aos="fade-up"
                  data-aos-delay={400 + (index * 100)}
                >
                  <CheckCircle className="w-5 h-5 text-orange-400" />
                  <span className='text-xl'>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-orange-500" id='whatwedo'>
          <div className="container mx-auto px-6 text-center">
            <h2
              className="text-2xl md:text-4xl font-bold mb-4"
              data-aos="fade-right"
            >
              What We
              <span className="text-gray-200 ml-2">Offer</span>
            </h2>
            <p
              className="text-gray-50 text-xl mb-16"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              Supercharge Your Ad Revenue with Our Innovative Solutions and Premium Network Access
            </p>

            <div className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {[
                {
                  icon: Globe,
                  title: "Website Monetization",
                  description: "Maximize your website’s ad revenue through Google AdX access, header bidding integration, and real-time optimization. We connect you to premium demand sources and use data-driven strategies to deliver better CPMs and consistent earnings across all traffic volumes.",
                  gradient: "from-blue-600 to-blue-800",
                  textColor: "text-blue-100"
                },
                {
                  icon: Smartphone,
                  title: "App Monetization",
                  description: "Unlock your app’s full earning potential with advanced ad solutions built for performance. From AdX onboarding to adaptive formats and fill rate optimization, we help app developers and app owners increase revenue while maintaining a seamless in-app experience.",
                  gradient: "from-red-600 to-red-800",
                  textColor: "text-red-100"
                },
                {
                  icon: Tv,
                  title: "CTV Monetization",
                  description: "Supercharge revenue on Connected TV with our programmatic CTV ad solutions. We deliver high-yield campaigns through direct and programmatic demand, ensuring your streaming content earns top value across Smart TVs, OTT apps, and other devices.",
                  gradient: "from-purple-600 to-purple-800",
                  textColor: "text-purple-100"
                }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className={`bg-gradient-to-br ${item.gradient} rounded-2xl p-8 text-left hover:-translate-y-2 transition-transform duration-300`}
                    data-aos={index === 1 ? "fade-right" : "fade-right"}
                    data-aos-delay={200 + (index * 100)}
                  >
                    <div className="mb-6" data-aos="fade-right"
                      data-aos-delay={200 + (index * 100 + 10)}>
                      <Icon className="w-12 h-12 text-white mb-4" data-aos="fade-right"
                        data-aos-delay={200 + (index * 100 + 20)} />
                      <h3 className="text-2xl font-bold text-white mb-2" data-aos="fade-right"
                        data-aos-delay={200 + (index * 100 + 30)}>{item.title}</h3>
                      <p className={item.textColor}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>


        {/* Team/Ads Section */}
        <section className="py-10 bg-black">{ /* bg-gradient-to-br from-orange-700 to-orange-900 */}
          <div className="container mx-auto px-6 text-center">
            <h2
              className="text-2xl md:text-4xl font-bold mb-16 uppercase text-white"
              data-aos="fade-right"
            >
              Turn Every   <span className="text-orange-400">Impression</span><br />
              INTO <span className="text-orange-400">Profit</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 max-w-4xl mx-auto">
              {otherThingsWeDo.map((item, i) => {
                const IconComponent = item.icon;

                return (
                  <div
                    key={i}
                    className="group aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer"
                    data-aos="fade-right"
                    data-aos-delay={i * 100}
                  >
                    <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200">
                      {/* Default state - Icon centered */}
                      <div className="absolute hidden inset-0 md:flex items-center justify-center transition-all duration-500 group-hover:opacity-0">
                        <IconComponent className="w-12 h-12 text-orange-400" />
                      </div>

                      {/* Hover state - Text content fades in */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-1 md:p-6 md:opacity-0 transition-all duration-500 group-hover:opacity-100">
                        <IconComponent className="w-8 h-8 text-orange-400 mb-0 md:mb-4 transform scale-75" />
                        <h3 className="text-[16px] sm:text-lg font-bold text-orange-700 mb-2 text-center transform translate-y-2 sm:translate-y-4 transition-all duration-500 delay-100 group-hover:translate-y-0">
                          {item.title}
                        </h3>
                        <p className="text-orange-400 text-sm text-center transform translate-y-2 sm:translate-y-4 transition-all duration-500 delay-200 group-hover:translate-y-0">
                          {item.description}
                        </p>
                      </div>

                      {/* Background overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-orange-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/*  Video/Image  Section */}
        <section className="py-10">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 md:gap-12 items-center">
              <div
                className="bg-gray-90 rounded-2xl md:p-8"
                data-aos="fade-right"
              >
                <img
                  src="/images/call-us.jpg"
                  alt="Hero Image"
                  className="w-full h-full object-cover rounded-lg mb-6 cursor-pointer hover:scale-105 transition-transform duration-500"
                />
                <div className="hidden aspect-video bg-black rounded-lg  items-center justify-center mb-6 hover:shadow-xl transition-shadow duration-300">
                  <Play className="w-16 h-16 text-orange-400 hover:scale-110 transition-transform" />
                </div>
              </div>

              <div data-aos="fade-right" data-aos-delay="200">
                <div className="bg-orange-500 text-black px-4 py-2 rounded-lg inline-block mb-6 font-bold">
                  READY TO SCALE YOUR BRAND WITH PUBSHINE?

                </div>
                <h3 className="text-3xl font-bold mb-6">
                  LET’S BUILD A STRATEGY <br /> THAT DRIVES <span className="text-orange-400">GROWTH</span>
                </h3>
                <p className="text-gray-400 mb-8">
                  Looking to double your ad revenue in just 30 days? Our AdTech
                  specialists at PubShine Pvt Ltd will assess
                  your current monetization setup and craft a tailored plan using
                  Google AdX, GAM 360, and advanced programmatic solutions.
                </p>
                <button
                  onClick={() => router.push('/contact-us')}
                  className="bg-orange-500 hover:bg-orange-600 px-8 py-2 rounded-lg font-semibold text-lg transition-colors flex items-center gap-2 hover:shadow-lg"
                  data-aos="fade-right"
                  data-aos-delay="300"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        {/* <section className="py-20" id="aboutus">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div
                className="relative"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                <div className="bg-gray-900 rounded-2xl p-2 md:p-6 border border-gray-800">
                  <div className="aspect- bg-black rounded-lg flex items-center justify-center">
                    <img
                      src="/images/happyclient.jpg"
                      alt="Video Thumbnail"
                      className="w-full h-full object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
              <div data-aos="fade-left" data-aos-delay="200">
                <div className="bg-orange-500 text-black px-4 py-2 rounded-lg inline-block mb-6 font-bold">
                  Who We Are?
                </div>
                <h3 className="text-xl md:text-3xl font-bold mb-6">
                  About Us
                </h3>
                <p className="text-gray-400 mb-4 leading-10">
                  PubShine Pvt. Ltd. is a digital advertising and publisher growth company committed to
                  helping web, app, and CTV publishers unlock their full monetization potential.
                  We provide advanced programmatic solutions, performance-driven strategies, and full
                  compliance support to ensure publishers grow sustainably and profitably in today's
                  evolving digital ecosystem.
                  We work closely with trusted Google Certified Publishing Partners and Google MCM partners
                  to deliver seamless access to Google Ad Manager 360, Google AdX, and other premium demand
                  sources. Our team brings industry expertise, real-time insights, and tailored strategies
                  to each publisher we serve.

                </p>
                <button
                  className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                  data-aos="fade-right"
                  data-aos-delay="300"
                >
                  Get Started Today <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section> */}

        {/* Results Section */}
        {/* <section className=" py-20 relative bg-gradient-to-br from-orange-500 to-orange-800">
          <div className="container mx-auto px-2 md:px-6">
            <div className="text-center mb-16">
              <h2
                className="text-2xl md:text-3xl font-bold mb-6"
                data-aos="fade-right"
              >
                WE LET <span className="text-orange-950">OUR RESULTS</span> DO<br />
                THE TALKING
              </h2>
              <p
                className="text-md text-gray-200"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                Over $2M generated for our clients last month
              </p>
              <div
                className="absolute -top-12 md:!-top-32 left-0 w-full flex justify-center z-30"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <img src="/images/breadcrumb.png" alt="Clients" className="w-11/12 select-none" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div data-aos="fade-right">
                <div className="bg-black/50 rounded-2xl p-8 border border-gray-800 mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-gray-400 text-sm">REVENUE THIS MONTH</p>
                      <p className="text-4xl font-bold text-orange-400">$26,000</p>
                      <p className="text-orange-400 text-sm">+340% vs last month</p>
                    </div>
                    <div className="text-right">
                      <TrendingUp className="w-12 h-12 text-orange-400 mb-2" />
                      <p className="text-sm text-gray-400">March 2024</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-500/20 to-orange-500/5 rounded-lg flex items-end justify-center">
                    <div className="text-center">
                      <img src="/videos/graph2.gif" alt="Graph" className="object-cover" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">Performance Analytics</p>
                </div>
              </div>

              <div className="space-y-8" data-aos="fade-left" data-aos-delay="200">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Boost your revenue by 30% using Google AdManager</h3>
                  <p className="text-gray-8000 mb-6 !leading-10">
                    Unlock higher revenue with smarter ads. Google AdManager helps you boost earnings by up to 30% through better targeting, premium demand, and real-time bidding. More control, more profit—maximize every impression.
                  </p>
                  <button
                    className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                    data-aos="fade-right"
                    data-aos-delay="300"
                  >
                    View Case Study <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section> */}



        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-800">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div data-aos="fade-right">
                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                  FROM UNDERPERFORMING TO <br className='hidden md:block' />
                  <span className="text-black">PROFITABLE</span> IN JUST 30 DAYS
                </h3>
                <p className="text-gray-100 mb-8">
                  At PubShine, we turn low-performing ad setups into high-revenue success stories. With fast AdX access, expert optimization, and premium ad formats, most publishers double or even triple their earnings in the first 30 days.

                </p>
                <button
                  className="text-orange-500 bg-white hover:bg-orange-100  px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                  data-aos="fade-right"
                  data-aos-delay="200"
                  onClick={() => router.push('/contact-us')}
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div
                className="relative"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <div className="bg-black/50 rounded-2xl p-6 border border-gray-800 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonials[activeTestimonial].avatar}
                      alt={testimonials[activeTestimonial].name}
                      className="w-12 h-12 rounded-full bg-gray-700"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonials[activeTestimonial].name}</h4>
                      <p className="text-sm text-gray-400">{testimonials[activeTestimonial].company}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{testimonials[activeTestimonial].text}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-orange-400">{testimonials[activeTestimonial].revenue}</p>
                      <p className="text-sm text-gray-400">Monthly Revenue</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-orange-400">+{testimonials[activeTestimonial].increase}</p>
                      <p className="text-sm text-gray-400">Increase</p>
                    </div>
                  </div>
                </div>
                {/* Manual Navigation Arrows */}
                <div className="flex justify-between mt-6">
                  <button
                    onClick={() =>
                      setActiveTestimonial(prev =>
                        prev === 0 ? testimonials.length - 1 : prev - 1
                      )
                    }
                    className="text-orange-400 hover:text-white transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="flex justify-center gap-2 mt-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveTestimonial(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${activeTestimonial === index ? 'bg-orange-400' : 'bg-gray-600'}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() =>
                      setActiveTestimonial(prev =>
                        prev === testimonials.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="text-orange-400 hover:text-white transition-colors"
                    aria-label="Next testimonial"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                
              </div>
            </div>
          </div>
        </section>


      </div>
    </Wrapper>
  );
};

export default AdTechLanding;