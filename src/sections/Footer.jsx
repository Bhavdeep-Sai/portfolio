import React from 'react';
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Github,
    ArrowUp,
    Heart,
    Mail,
    ExternalLink
} from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#030412] text-white relative">
            {/* Back to Top Button */}
            <button
                onClick={scrollToTop}
                className="absolute -top-6 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Back to top"
            >
                <ArrowUp className="w-5 h-5" />
            </button>

            {/* Main Footer Content */}
            <div className="w-full px-4 py-16">
                <div className="text-left">
                    {/* Profile Section */}
                    <div className="mb-8 flex lg:w-6xl flex-col lg:flex-row justify-start gap-5 lg:gap-10">
                        {/* Profile Photo */}
                        <div className="m-auto flex justify-center md:w-100 md:h-100 lg:ml-10 mb-4 rounded-lg overflow-hidden border-4 border-blue-500 shadow-lg">
                            <img
                                src="/assets/me.jpg"
                                alt="Your Name"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Name and Title */}
                        <div>
                            <h3 className="text-2xl font-bold mb-2">E. Bhavdeep Sai</h3>
                            <p className="text-gray-400 text-lg mb-4">Full Stack Developer & Designer</p>

                            {/* Brief Description */}
                            <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto">
                                Passionate about creating exceptional digital experiences through clean code and innovative design.
                                Let's build something amazing together.
                            </p>
                            {/* Social Media Links */}
                            <div className="flex justify-start py-3 space-x-6 mb-8">
                                <a
                                    href="https://www.linkedin.com/in/bhavdeepsai"
                                    className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="w-6 h-6" />
                                </a>
                                <a
                                    href="https://github.com/Bhavdeep-Sai"
                                    className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
                                    aria-label="GitHub"
                                >
                                    <Github className="w-6 h-6" />
                                </a>
                                <a
                                    href="https://instagram.com/bhavdeep_sai"
                                    className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="w-6 h-6" />
                                </a>
                                <a
                                    href="#contact"
                                    className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
                                    aria-label="Email"
                                >
                                    <Mail className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>


                    {/* CTA Section */}
                    <div className="mb-8 flex flex-col items-end">
                        <h4 className="text-lg mr-25 font-semibold mb-4">Let's Work Together</h4>
                        <div className="flex lg:flex-row sm:flex-row  justify-center gap-5 items-center sm:space-y-0 sm:space-x-4">
                            <a
                                href="#contact"
                                className="inline-flex items-center m-0 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-300 font-medium"
                            >
                                <Mail className="w-4 h-4 mr-2" />
                                Get In Touch
                            </a>
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-6 py-3 border border-gray-600 hover:border-blue-500 rounded-lg transition-colors duration-300 font-medium"
                            >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View Resume
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

                        {/* Copyright */}
                        <div className="flex flex-col lg:flex-row items-center space-x-1 text-gray-400">
                            <span>© {currentYear} Bhavdeep Sai. Made with</span>
                            <Heart className="w-4 h-4 text-red-500 fill-current" />
                            <span>All rights reserved.</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;