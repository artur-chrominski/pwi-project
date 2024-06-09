import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import styles from "../style";
import githubLogo from "../assets/github-logo.webp";

const Projects = () => {
    const { t } = useTranslation();
    const [projects, setProjects] = useState([]);

    const fetchProjects = async () => {
        try {
            const response = await fetch('https://pwi-project-server.vercel.app/api/projects');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const projectsList = await response.json();
            setProjects(projectsList);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            }
        ]
    };

    return (
        <section id="projects" className={`flex flex-col ${styles.paddingY}`}>
            <div className="my-8 lg:my-12">
                <h2 className="text-white text-center text-5xl mb-12">{t('Projects.title')}</h2>
                <Slider {...settings}>
                    {projects.map((project, index) => (
                        <div key={index} className="p-6 flex justify-center">
                            <div className="p-8 rounded-lg shadow-md bg-white hover:bg-gray-gradient transition-all duration-300 transform hover:scale-105 hover:shadow-xl min-h-[240px] flex flex-col items-center">
                                <img src={githubLogo} alt="GitHub Logo" className="w-16 h-16 mb-4" />
                                <h3 className="text-black text-3xl mb-4 text-center">{project.title}</h3>
                                <p className="text-black text-lg mb-4 text-center">{project.description}</p>
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-yellow-500 underline hover:text-yellow-700">
                                    {t('Projects.view_on_github')}
                                </a>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default Projects;
