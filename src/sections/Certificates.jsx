import React, { useState, useEffect } from 'react';
import { Award, X, ChevronLeft, ChevronRight, Download, ExternalLink, FileText, Shuffle } from 'lucide-react';

const Certificates = () => {
    const [selectedCert, setSelectedCert] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [certificatesPerPage] = useState(6);
    const [shuffledCertificates, setShuffledCertificates] = useState([]);

    // Sample certificate data - replace with your actual certificates
    const originalCertificates = [
        {
            id: 1,
            title: "HTML, CSS, JS & React",
            issuer: "Udemy",
            date: "2025",
            image: "/assets/certi/UC-8c904f07-9e81-49f4-88c3-bb0bc1143da1.jpg",
            category: "Skill Development",
            downloadUrl: "/assets/certi/UC-8c904f07-9e81-49f4-88c3-bb0bc1143da1.jpg",
            extendedLink: "https://www.udemy.com/certificate/UC-8c904f07-9e81-49f4-88c3-bb0bc1143da1/",
            type: "image"
        },
        {
            id: 2,
            title: "Figma",
            issuer: "Udemy",
            date: "2025",
            image: "assets/certi/UC-65aed631-ee21-4a7e-931a-4ddbd918f833.jpg",
            category: "Skill Development",
            downloadUrl: "assets/certi/UC-65aed631-ee21-4a7e-931a-4ddbd918f833.jpg",
            extendedLink: "https://www.udemy.com/certificate/UC-65aed631-ee21-4a7e-931a-4ddbd918f833/",
            type: "image"
        },
        {
            id: 3,
            title: "AI4AndhraPolice Hackathon",
            issuer: "AI4AndhraPolice Hackathon Team",
            date: "2025",
            image: "assets/certi/hackaton2.png",
            category: "Participation",
            downloadUrl: "assets/certi/hackaton2.png",
            type: "image"
        },
        {
            id: 4,
            title: "MySql",
            issuer: "Udemy",
            date: "2025",
            image: "assets/certi/UC-d3e69686-1d2c-4f03-b068-54b788288898.jpg",
            category: "Skill Development",
            downloadUrl: "assets/certi/UC-d3e69686-1d2c-4f03-b068-54b788288898.jpg",
            extendedLink: "https://www.udemy.com/certificate/UC-d3e69686-1d2c-4f03-b068-54b788288898/",
            type: "image"
        },
        {
            id: 5,
            title: "Blender",
            issuer: "Linkedin",
            date: "2025",
            image: "assets/certi/blender.jpg",
            category: "Skill Development",
            downloadUrl: "assets/certi/blender.pdf",
            extendedLink: "https://www.linkedin.com/learning/certificates/82ea5b1fc4b6400b02714bafde56092630ed0e31001a5bb85ca7ed4de9303ef0?trk=share_certificate",
            type: "pdf"
        },
        {
            id: 6,
            title: "MERN stack",
            issuer: "Linkedin",
            date: "2025",
            image: "assets/certi/mern.jpg",
            category: "Skill Development",
            downloadUrl: "assets/certi/mern.pdf",
            extendedLink: "https://www.linkedin.com/learning/certificates/bc0f67463fe43103f7fa51e56b592452ff0a7b01a6f4781bdab4bceaf2c23856?trk=share_certificate",
            type: "pdf"
        },
        {
            id: 7,
            title: "Github",
            issuer: "Linkedin",
            date: "2025",
            image: "assets/certi/github.jpg",
            category: "Skill Development",
            downloadUrl: "assets/certi/github.pdf",
            extendedLink: "https://www.linkedin.com/learning/certificates/f2892ea9e8e069798f80aa2a955322b7ca13857ac7087aaf6e908dee292e267c?trk=share_certificate",
            type: "pdf"
        },
        {
            id: 8,
            title: "AI Hackathon",
            issuer: "Promptrepo",
            date: "2025",
            image: "assets/certi/hackaton1.jpg",
            category: "Participation",
            downloadUrl: "assets/certi/hackaton1.pdf",
            type: "pdf"
        },
        {
            id: 9,
            title: "Java",
            issuer: "Linkedin",
            date: "2025",
            image: "assets/certi/java.jpg",
            category: "Skill Development",
            downloadUrl: "assets/certi/java.pdf",
            extendedLink: "https://www.linkedin.com/learning/certificates/3dbb965701dd0fa9842270ff16db62504a3b225129ebfbf093e147e6f6a1bbe0?trk=share_certificate",
            type: "pdf"
        },
    ];

    const categories = ['All', 'Skill Development', 'Participation'];

    // Shuffle function using Fisher-Yates algorithm
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Manual shuffle function
    const handleShuffle = () => {
        setShuffledCertificates(shuffleArray(originalCertificates));
        setCurrentPage(1); // Reset to first page when shuffling
    };

    // Initialize with shuffled certificates
    useEffect(() => {
        setShuffledCertificates(shuffleArray(originalCertificates));
        setIsVisible(true);
    }, []);

    // Reset to first page when category changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory]);

    const openModal = (cert) => {
        setSelectedCert(cert);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedCert(null);
        document.body.style.overflow = 'unset';
    };

    const nextCertificate = () => {
        const currentIndex = shuffledCertificates.findIndex(cert => cert.id === selectedCert.id);
        const nextIndex = (currentIndex + 1) % shuffledCertificates.length;
        setSelectedCert(shuffledCertificates[nextIndex]);
    };

    const prevCertificate = () => {
        const currentIndex = shuffledCertificates.findIndex(cert => cert.id === selectedCert.id);
        const prevIndex = (currentIndex - 1 + shuffledCertificates.length) % shuffledCertificates.length;
        setSelectedCert(shuffledCertificates[prevIndex]);
    };

    // Download certificate function
    const downloadCertificate = async (cert) => {
        try {
            const response = await fetch(cert.downloadUrl);
            if (!response.ok) throw new Error('Network response was not ok');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;

            // Get file extension from URL or default based on type
            const fileExtension = cert.type === 'pdf' ? 'pdf' : 'jpg';
            a.download = `${cert.title.replace(/\s+/g, '_')}_${cert.issuer.replace(/\s+/g, '_')}.${fileExtension}`;

            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
            // Fallback: open in new tab
            window.open(cert.downloadUrl, '_blank');
        }
    };

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedCert) return;

            switch (e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowRight':
                    nextCertificate();
                    break;
                case 'ArrowLeft':
                    prevCertificate();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedCert, shuffledCertificates]);

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
                    className={`w-full h-full object-cover transition-transform duration-500 ${className}`}
                    onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1606868306217-dbf5046868d2?w=800&h=600&fit=crop';
                    }}
                />
            );
        } else {
            return (
                <img
                    src={cert.image}
                    alt={cert.title}
                    className={`w-full h-full object-cover transition-transform duration-500 ${className}`}
                    onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1606868306217-dbf5046868d2?w=800&h=600&fit=crop';
                    }}
                />
            );
        }
    };

    return (
        <section id='certificates' className='min-h-screen relative overflow-hidden'>
            <div className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6 pt-12 sm:pt-16 md:pt-20">
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
                <div id="certificates-grid" className="grid relative grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
                    {currentCertificates.map((cert, index) => (
                        <div
                            key={cert.id}
                            className={`group relative bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                            onClick={() => openModal(cert)}
                        >
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                            <div className="relative z-10">
                                {/* Certificate Preview */}
                                <div className="relative overflow-hidden aspect-[4/3]">
                                    <CertificatePreview cert={cert} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                    {/* File type indicator */}
                                    {cert.type === 'pdf' && (
                                        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-red-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-medium">
                                            PDF
                                        </div>
                                    )}

                                    {/* Certificate Info Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                                        <h3 className="text-white font-bold text-sm sm:text-base md:text-lg mb-1 line-clamp-2">
                                            {cert.title}
                                        </h3>
                                        <div className="flex items-center justify-between text-gray-300 text-xs sm:text-sm">
                                            <span className="font-medium truncate max-w-[60%]">{cert.issuer}</span>
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
                        <div className="flex items-center gap-1 sm:gap-2">
                            <button
                                onClick={goToPrevPage}
                                disabled={currentPage === 1}
                                className={`p-1.5 sm:p-2 rounded-lg transition-all duration-300 ${currentPage === 1
                                    ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                            >
                                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>

                            {pageNumbers.map(page => (
                                <button
                                    key={page}
                                    onClick={() => goToPage(page)}
                                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm ${page === currentPage
                                        ? 'bg-[#030412] text-white shadow-lg'
                                        : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={goToNextPage}
                                disabled={currentPage === totalPages}
                                className={`p-1.5 sm:p-2 rounded-lg transition-all duration-300 ${currentPage === totalPages
                                    ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
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

            {/* Full Screen Modal */}
            {selectedCert && (
                <div
                    className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            closeModal();
                        }
                    }}
                >
                    {/* Navigation Controls */}
                    <div className="absolute top-3 sm:top-4 md:top-6 left-3 sm:left-4 md:left-6 right-3 sm:right-4 md:right-6 flex items-center justify-between z-60">
                        <div className="flex items-center gap-2 sm:gap-4">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 max-w-[200px] sm:max-w-xs md:max-w-none">
                                <span className="text-white font-medium text-xs sm:text-sm md:text-base truncate">{selectedCert.title}</span>
                            </div>
                        </div>
                        <button
                            onClick={closeModal}
                            className="p-2 sm:p-2.5 md:p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 flex-shrink-0"
                        >
                            <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                        </button>
                    </div>

                    {/* Certificate Display */}
                    <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8 md:p-12 lg:p-20">
                        {selectedCert.type === 'pdf' ? (
                            <div className="w-full max-w-4xl h-full bg-white rounded-lg overflow-hidden shadow-2xl">
                                <iframe
                                    src={selectedCert.downloadUrl}
                                    title={selectedCert.title}
                                    className="w-full h-full"
                                    style={{ minHeight: '400px' }}
                                />
                            </div>
                        ) : (
                            <img
                                src={selectedCert.image}
                                alt={selectedCert.title}
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1606868306217-dbf5046868d2?w=800&h=600&fit=crop';
                                }}
                            />
                        )}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevCertificate}
                        className="absolute left-2 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 p-2 sm:p-3 md:p-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
                    >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                    </button>

                    <button
                        onClick={nextCertificate}
                        className="absolute right-2 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 p-2 sm:p-3 md:p-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
                    >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                    </button>

                    {/* Certificate Info */}
                    <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-3 sm:left-4 md:left-6 right-3 sm:right-4 md:right-6 bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 md:p-6 border border-white/20">
                        <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-4">
                            <div className="min-w-0 flex-1">
                                <h3 className="text-white font-bold text-sm sm:text-lg md:text-xl mb-1 truncate">{selectedCert.title}</h3>
                                <div className="flex items-center gap-2 sm:gap-4 text-gray-300 flex-wrap text-xs sm:text-sm">
                                    <span className="font-medium truncate max-w-[120px] sm:max-w-none">{selectedCert.issuer}</span>
                                    <span className="hidden sm:inline">•</span>
                                    <span>{selectedCert.date}</span>
                                    <span className="hidden sm:inline">•</span>
                                    <span className="px-2 py-1 bg-purple-500/20 rounded-full text-xs font-medium">
                                        {selectedCert.category}
                                    </span>
                                    <span className="hidden sm:inline">•</span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${selectedCert.type === 'pdf' ? 'bg-red-500/20 text-red-300' : 'bg-blue-500/20 text-blue-300'
                                        }`}>
                                        {selectedCert.type.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                                <button
                                    onClick={() => downloadCertificate(selectedCert)}
                                    className="p-1.5 sm:p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors group"
                                    title="Download Certificate"
                                >
                                    <Download className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-purple-300" />
                                </button>
                                {selectedCert.extendedLink && (
                                    <button
                                        className="p-1.5 sm:p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors group"
                                        title="View Original"
                                        onClick={() => window.open(selectedCert.extendedLink, '_blank')}
                                    >
                                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-purple-300" />
                                    </button>
                                )}
                                {selectedCert.type === 'pdf' && (
                                    <button
                                        className="p-1.5 sm:p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors group"
                                        title="Open PDF in New Tab"
                                        onClick={() => window.open(selectedCert.downloadUrl, '_blank')}
                                    >
                                        <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-purple-300" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 text-center text-gray-400 text-xs sm:text-sm px-4">
                        <p className="hidden sm:block">Use ← → arrow keys to navigate • Press ESC to close</p>
                        <p className="sm:hidden">Tap arrows to navigate • Tap X to close</p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Certificates;