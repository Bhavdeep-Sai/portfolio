// Shared certificate data for the application
export const allCertificates = [
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
        image: "/assets/certi/UC-65aed631-ee21-4a7e-931a-4ddbd918f833.jpg",
        category: "Skill Development",
        downloadUrl: "/assets/certi/UC-65aed631-ee21-4a7e-931a-4ddbd918f833.jpg",
        extendedLink: "https://www.udemy.com/certificate/UC-65aed631-ee21-4a7e-931a-4ddbd918f833/",
        type: "image"
    },
    {
        id: 3,
        title: "AI4AndhraPolice Hackathon",
        issuer: "AI4AndhraPolice Hackathon Team",
        date: "2025",
        image: "/assets/certi/hackaton2.png",
        category: "Participation",
        downloadUrl: "/assets/certi/hackaton2.png",
        type: "image"
    },
    {
        id: 4,
        title: "MySql",
        issuer: "Udemy",
        date: "2025",
        image: "/assets/certi/UC-d3e69686-1d2c-4f03-b068-54b788288898.jpg",
        category: "Skill Development",
        downloadUrl: "/assets/certi/UC-d3e69686-1d2c-4f03-b068-54b788288898.jpg",
        extendedLink: "https://www.udemy.com/certificate/UC-d3e69686-1d2c-4f03-b068-54b788288898/",
        type: "image"
    },
    {
        id: 5,
        title: "Blender",
        issuer: "Linkedin",
        date: "2025",
        image: "/assets/certi/blender.jpg",
        category: "Skill Development",
        downloadUrl: "/assets/certi/blender.pdf",
        extendedLink: "https://www.linkedin.com/learning/certificates/82ea5b1fc4b6400b02714bafde56092630ed0e31001a5bb85ca7ed4de9303ef0?trk=share_certificate",
        type: "pdf"
    },
    {
        id: 6,
        title: "MERN stack",
        issuer: "Linkedin",
        date: "2025",
        image: "/assets/certi/mern.jpg",
        category: "Skill Development",
        downloadUrl: "/assets/certi/mern.pdf",
        extendedLink: "https://www.linkedin.com/learning/certificates/bc0f67463fe43103f7fa51e56b592452ff0a7b01a6f4781bdab4bceaf2c23856?trk=share_certificate",
        type: "pdf"
    },
    {
        id: 7,
        title: "Github",
        issuer: "Linkedin",
        date: "2025",
        image: "/assets/certi/github.jpg",
        category: "Skill Development",
        downloadUrl: "/assets/certi/github.pdf",
        extendedLink: "https://www.linkedin.com/learning/certificates/f2892ea9e8e069798f80aa2a955322b7ca13857ac7087aaf6e908dee292e267c?trk=share_certificate",
        type: "pdf"
    },
    {
        id: 8,
        title: "AI Hackathon",
        issuer: "Promptrepo",
        date: "2025",
        image: "/assets/certi/hackaton1.jpg",
        category: "Participation",
        downloadUrl: "/assets/certi/hackaton1.pdf",
        type: "pdf"
    },
    {
        id: 9,
        title: "Java",
        issuer: "Linkedin",
        date: "2025",
        image: "/assets/certi/java.jpg",
        category: "Skill Development",
        downloadUrl: "/assets/certi/java.pdf",
        extendedLink: "https://www.linkedin.com/learning/certificates/3dbb965701dd0fa9842270ff16db62504a3b225129ebfbf093e147e6f6a1bbe0?trk=share_certificate",
        type: "pdf"
    },
];

// Utility function to get certificate categories
export const getCertificateCategories = () => {
    const categories = [...new Set(allCertificates.map(cert => cert.category))];
    return ['All', ...categories];
};

// Utility function to get certificate by ID
export const getCertificateById = (id) => {
    return allCertificates.find(cert => cert.id === parseInt(id));
};
