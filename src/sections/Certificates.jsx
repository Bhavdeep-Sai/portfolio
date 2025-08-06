import React, { useState, useEffect } from 'react';
import { Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { allCertificates } from '../data/certificates';

const Certificates = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [certificatesPerPage, setCertificatesPerPage] = useState(6);
    const [shuffledCertificates, setShuffledCertificates] = useState([]);

    // Get unique categories from certificates
    const categories = ['All', ...new Set(allCertificates.map(cert => cert.category))];

    // Shuffle function using Fisher-Yates algorithm
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Initialize with shuffled certificates and responsive pagination
    useEffect(() => {
        setShuffledCertificates(shuffleArray(allCertificates));
        setIsVisible(true);
        
        // Set initial certificates per page based on screen size
        const updateCertificatesPerPage = () => {
            if (window.innerWidth < 640) {
                setCertificatesPerPage(4); // Mobile: 1 column, show 4
            } else if (window.innerWidth < 1024) {
                setCertificatesPerPage(6); // Tablet: 2 columns, show 6
            } else if (window.innerWidth < 1280) {
                setCertificatesPerPage(9); // Desktop: 3 columns, show 9
            } else {
                setCertificatesPerPage(6); // Large desktop: 4 columns, show 8
            }
        };

        updateCertificatesPerPage();
        window.addEventListener('resize', updateCertificatesPerPage);

        return () => {
            window.removeEventListener('resize', updateCertificatesPerPage);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Reset to first page when category changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory]);

    const openCertificateViewer = (cert) => {
        navigate(`/certificate/${cert.id}`);
    };

    // Filter certificates based on active category
    const filteredCertificates = activeCategory === 'All'
        ? shuffledCertificates
        : shuffledCertificates.filter(cert => cert.category === activeCategory);

    // Pagination logic
    const totalPages = Math.ceil(filteredCertificates.length / certificatesPerPage);
    const startIndex = (currentPage - 1) * certificatesPerPage;
    const endIndex = startIndex + certificatesPerPage;
    const currentCertificates = filteredCertificates.slice(startIndex, endIndex);

    // Generate page numbers for pagination
    const generatePageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, currentPage + 2);

            if (currentPage <= 3) {
                endPage = Math.min(totalPages, 5);
            }

            if (currentPage >= totalPages - 2) {
                startPage = Math.max(1, totalPages - 4);
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
        }

        return pages;
    };

    const pageNumbers = generatePageNumbers();

    const goToPage = (page) => {
        setCurrentPage(page);
        const element = document.getElementById('certificates-grid');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    };

    // Component for rendering certificate preview
    const CertificatePreview = ({ cert, className = "" }) => {
        if (cert.type === 'pdf') {
            return (
                <img
                    src={cert.image}
                    alt={cert.title}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${className}`}
                    onError={(e) => {
                        console.error('Certificate image failed to load:', cert.image);
                        e.target.src = 'https://images.unsplash.com/photo-1606868306217-dbf5046868d2?w=800&h=600&fit=crop';
                    }}
                    onLoad={() => {
                        console.log('Certificate image loaded successfully:', cert.image);
                    }}
                />
            );
        } else {
            return (
                <img
                    src={cert.image}
                    alt={cert.title}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${className}`}
                    onError={(e) => {
                        console.error('Certificate image failed to load:', cert.image);
                        e.target.src = 'https://images.unsplash.com/photo-1606868306217-dbf5046868d2?w=800&h=600&fit=crop';
                    }}
                    onLoad={() => {
                        console.log('Certificate image loaded successfully:', cert.image);
                    }}
                />
            );
        }
    };

    return (
        <section id='certificates' className='min-h-screen relative overflow-hidden'>
            <div className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6 pt-12 sm:pt-16 ">
                {/* Header */}
                <div className={`text-center mb-8 sm:mb-12 md:mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 leading-tight">
                        My Certifications
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto leading-relaxed px-2 sm:px-4 md:px-0">
                        A collection of my skill development achievements and professional certifications
                    </p>
                </div>

                {/* Category Filter */}
                <div className={`flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {/* Category buttons */}
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-3 sm:px-4 cursor-pointer md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm md:text-base ${activeCategory === category
                                    ? 'bg-[#030412] text-white shadow-lg'
                                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Summary */}
                <div className={`text-center mb-6 sm:mb-8 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base">
                        Showing {startIndex + 1}-{Math.min(endIndex, filteredCertificates.length)} of {filteredCertificates.length} certificates
                        {activeCategory !== 'All' && ` in ${activeCategory}`}
                    </p>
                </div>

                {/* Certificates Grid */}
                <div id="certificates-grid" className="grid relative grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-8 sm:mb-10 md:mb-12">
                    {currentCertificates.map((cert, index) => (
                        <div
                            key={cert.id}
                            className={`group relative bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer aspect-[4/3] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                            onClick={() => openCertificateViewer(cert)}
                        >
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                            <div className="relative z-10 h-full">
                                {/* Certificate Preview */}
                                <div className="relative overflow-hidden h-full">
                                    <CertificatePreview cert={cert} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                    {/* File type indicator */}
                                    {cert.type === 'pdf' && (
                                        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-red-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-medium">
                                            PDF
                                        </div>
                                    )}

                                    {/* Certificate Info Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent">
                                        <h3 className="text-white font-bold text-sm sm:text-base md:text-lg mb-1 line-clamp-2 leading-tight">
                                            {cert.title}
                                        </h3>
                                        <div className="flex items-center justify-between text-gray-300 text-xs sm:text-sm">
                                            <span className="font-medium truncate max-w-[65%]">{cert.issuer}</span>
                                            <span className="flex-shrink-0">{cert.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className={`flex flex-col items-center gap-3 sm:gap-4 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 max-w-full">
                            <button
                                onClick={goToPrevPage}
                                disabled={currentPage === 1}
                                className={`flex-shrink-0 p-2 sm:p-2 rounded-lg transition-all duration-300 touch-manipulation ${currentPage === 1
                                    ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                                style={{ minWidth: '40px', minHeight: '40px' }}
                            >
                                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>

                            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
                                {pageNumbers.map(page => (
                                    <button
                                        key={page}
                                        onClick={() => goToPage(page)}
                                        className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm touch-manipulation ${page === currentPage
                                            ? 'bg-[#030412] text-white shadow-lg'
                                            : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={goToNextPage}
                                disabled={currentPage === totalPages}
                                className={`flex-shrink-0 p-2 sm:p-2 rounded-lg transition-all duration-300 touch-manipulation ${currentPage === totalPages
                                    ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                                style={{ minWidth: '40px', minHeight: '40px' }}
                            >
                                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </div>

                        <div className="text-xs sm:text-sm text-gray-400">
                            Page {currentPage} of {totalPages}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {filteredCertificates.length === 0 && (
                    <div className="text-center py-12 sm:py-16">
                        <Award className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400 text-base sm:text-lg">No certificates found in this category</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Certificates;