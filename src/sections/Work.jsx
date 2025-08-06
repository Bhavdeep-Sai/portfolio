import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Play, Calendar, Users, Star, Code, Zap, Globe, Smartphone, Database, Layers } from 'lucide-react';

const Work = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const projects = [
        {
            id: 1,
            title: "School Management System",
            description: "A modern web application designed to simplify and automate the administrative workflows of educational institutions.",
            image: "/assets/projects/beaconPort.png",
            technologies: ["React", "Nodejs", "Tailwindcss", "MaterialUi", "Gemini AI"],
            github: "https://github.com/kalviumcommunity/S86_Bhavdeep_Capstone_BeaconPort",
            demo: "https://beaconport.netlify.app/",
        },
        {
            id: 2,
            title: "Tic Tac Toe - Mini Game (local)",
            description: "A quick and fun two-player game — get three in a row and claim your victory!",
            image: "/assets/projects/tic-tac-toe.jpeg",
            technologies: ["HTML", "CSS", "Java Script"],
            github: "https://github.com/Bhavdeep-Sai/Tic_Tac_Toe-Mini-Game",
            demo: "https://bhavdeep-sai.github.io/Tic_Tac_Toe-Mini-Game/",
        },
        {
            id: 3,
            title: "PetCraze — Share Your Pet's Wildest Moments!",
            description: "Upload hilarious photos and videos of your pets' craziest antics. Laugh, share, and relive those unforgettable moments with a community that loves pets as much as you do!",
            image: "/assets/projects/petCrazy.png",
            technologies: ["React", "SQL", "Nodejs", "Tailwindcss"],
            github: "https://github.com/Bhavdeep-Sai/Tic_Tac_Toe-Mini-Game",
            demo: "https://petcrazymoments.netlify.app/",
        },
        {
            id: 4,
            title: "Tic Tac Toe — (Global)",
            description: " two players from anywhere in the world to connect and compete in a simple yet interactive game session.",
            image: "/assets/projects/tic-tac-toe.png",
            technologies: ["React", "Socket.io", "Tailwindcss", "Three.js", "Motion"],
            github: "https://github.com/Bhavdeep-Sai/tic-tac-toe",
            demo: "https://ox-fungame.netlify.app/",
        },
    ];

    return (
        <section id='work' className="min-h-screen relative sm:py-12 lg:pt-20 mt-10 md:mt-0 px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className={`text-center mb-8 sm:mb-12 md:mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 leading-tight">
                        My Projects
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-xs sm:max-w-md md:max-w-3xl lg:max-w-5xl mx-auto leading-relaxed px-2 sm:px-4 md:px-0">
                        A showcase of the projects I've built to solve real-world problems and explore new technologies.
                        Each project reflects my journey as a developer 
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`group relative h-100 lg:h-125 bg-[#030412] rounded-lg overflow-hidden backdrop-blur-sm border border-gray-200/50 transition-all duration-700 transform hover:scale-[1.02] hover:-translate-y-2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            {/* Project Image */}
                            <div className="relative h-42 xs:h-56 sm:h-40 md:h-44 lg:h-48 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            {/* Project Content */}
                            <div className="p-3 sm:p-4 md:p-5 lg:p-6 pb-16 sm:pb-18 md:pb-20">
                                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300 leading-tight">
                                    {project.title}
                                </h3>

                                <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3 leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                                    {project.technologies.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="px-2 sm:px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/50 hover:border-purple-500/50 transition-colors"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="absolute left-3 sm:left-4 md:left-5 lg:left-6 right-3 sm:right-4 md:right-5 lg:right-6 bottom-3 sm:bottom-4 flex items-center justify-center gap-2 sm:gap-3 md:gap-3">
                                    <button className="p-2 sm:p-3 bg-white/20 flex items-center justify-start w-[180px] h-10 sm:h-12 md:h-13 gap-1 sm:gap-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors">
                                        <a href={project.github} target='_blank' rel="noopener noreferrer" className="flex items-center gap-1 sm:gap-2 justify-center">
                                            <Github size={16} className="sm:w-5 sm:h-5 md:w-9 md:h-9 text-white bg-black rounded-full p-1 sm:p-2 flex-shrink-0" />
                                        </a>

                                        <div className="text-xs sm:text-sm md:text-lg flex justify-start  text-white truncate w-full">Github</div>
                                    </button>
                                    <button className="p-2 sm:p-3 bg-white/20 flex items-center justify-start w-[200px] h-10 sm:h-12 md:h-13 gap-1 sm:gap-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors">
                                        <a href={project.demo} target='_blank' rel="noopener noreferrer" className="flex items-center justify-center">
                                            <ExternalLink size={20} className="sm:w-5 sm:h-5 md:w-9 md:h-9 text-white bg-black rounded-full p-1 sm:p-2 flex-shrink-0" />
                                        </a>

                                        <div className="text-xs sm:text-sm md:text-lg flex justify-start  text-white truncate w-full">View Project</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Work;