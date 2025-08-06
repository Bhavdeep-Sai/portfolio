import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download, ExternalLink, FileText, ArrowLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const CertificateViewer = ({ certificate, certificates, onClose, onNavigate }) => {
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    // Minimum swipe distance for touch navigation
    const minSwipeDistance = 50;

    // Touch handlers for swipe navigation
    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            handleNext();
        }
        if (isRightSwipe) {
            handlePrev();
        }
    };

    const handleNext = () => {
        const currentIndex = certificates.findIndex(cert => cert.id === certificate.id);
        const nextIndex = (currentIndex + 1) % certificates.length;
        onNavigate(certificates[nextIndex]);
    };

    const handlePrev = () => {
        const currentIndex = certificates.findIndex(cert => cert.id === certificate.id);
        const prevIndex = (currentIndex - 1 + certificates.length) % certificates.length;
        onNavigate(certificates[prevIndex]);
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
            switch (e.key) {
                case 'Escape':
                    onClose();
                    break;
                case 'ArrowRight':
                    handleNext();
                    break;
                case 'ArrowLeft':
                    handlePrev();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [certificate]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!certificate) return null;

    return (
        <div className="fixed inset-0 z-[9999] min-h-screen bg-gradient-to-br from-[#10192b] via-[#0f1729] to-[#0a0f1c] relative overflow-auto">
            {/* Navigation Header */}
            <div className="sticky top-0 left-0 right-0 z-20 bg-black/50 backdrop-blur-sm border-b border-white/10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={onClose}
                                className="p-2 bg-white/10 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 touch-manipulation"
                                title="Back to Certificates"
                            >
                                <ArrowLeft className="w-5 h-5 text-white" />
                            </button>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20 max-w-md">
                                <h1 className="text-white font-semibold text-sm md:text-base truncate">
                                    {certificate.title}
                                </h1>
                                <p className="text-gray-300 text-xs md:text-sm">
                                    {certificate.issuer} • {certificate.date}
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            {/* Navigation buttons */}
                            <button
                                onClick={handlePrev}
                                className="p-2 bg-white/10 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 touch-manipulation"
                                title="Previous Certificate"
                            >
                                <ChevronLeft className="w-5 h-5 text-white" />
                            </button>
                            
                            <button
                                onClick={handleNext}
                                className="p-2 bg-white/10 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 touch-manipulation"
                                title="Next Certificate"
                            >
                                <ChevronRight className="w-5 h-5 text-white" />
                            </button>

                            {/* Action buttons */}
                            <button
                                onClick={() => downloadCertificate(certificate)}
                                className="p-2 bg-white/10 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 touch-manipulation"
                                title="Download Certificate"
                            >
                                <Download className="w-5 h-5 text-white" />
                            </button>

                            {certificate.extendedLink && (
                                <button
                                    onClick={() => window.open(certificate.extendedLink, '_blank')}
                                    className="p-2 bg-white/10 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 touch-manipulation"
                                    title="View Original"
                                >
                                    <ExternalLink className="w-5 h-5 text-white" />
                                </button>
                            )}

                            {certificate.type === 'pdf' && (
                                <button
                                    onClick={() => window.open(certificate.downloadUrl, '_blank')}
                                    className="p-2 bg-white/10 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 touch-manipulation"
                                    title="Open PDF in New Tab"
                                >
                                    <FileText className="w-5 h-5 text-white" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Certificate Display */}
            <div 
                className="flex items-center justify-center min-h-screen pt-20 pb-32 px-4"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div className="w-full max-w-6xl">
                    {certificate.type === 'pdf' ? (
                        <div className="w-full h-[80vh] bg-white rounded-lg overflow-hidden shadow-2xl">
                            <iframe
                                src={certificate.downloadUrl}
                                title={certificate.title}
                                className="w-full h-full border-0"
                                allowFullScreen
                            />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center">
                            <img
                                src={certificate.image}
                                alt={certificate.title}
                                className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-lg shadow-2xl bg-white p-4"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Certificate Info Panel */}
            <div className="sticky bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-white/20">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <h2 className="text-white font-bold text-lg md:text-xl mb-2">
                                {certificate.title}
                            </h2>
                            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-gray-300 text-sm">
                                <span className="font-medium">{certificate.issuer}</span>
                                <span className="hidden md:inline">•</span>
                                <span>{certificate.date}</span>
                                <span className="hidden md:inline">•</span>
                                <span className="px-2 py-1 bg-purple-500/30 rounded-full text-xs font-medium">
                                    {certificate.category}
                                </span>
                                <span className="hidden md:inline">•</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    certificate.type === 'pdf' 
                                        ? 'bg-red-500/30 text-red-300' 
                                        : 'bg-blue-500/30 text-blue-300'
                                }`}>
                                    {certificate.type.toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Instructions */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center text-gray-400 text-xs px-4 md:hidden">
                <p>Swipe left/right to navigate • Tap back arrow to close</p>
            </div>

            {/* Desktop Instructions */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center text-gray-400 text-xs px-4 hidden md:block">
                <p>Use ← → arrow keys to navigate • Press ESC to close</p>
            </div>
        </div>
    );
};

export default CertificateViewer;
