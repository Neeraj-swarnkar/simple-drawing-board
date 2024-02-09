import React from 'react';
import { FaLinkedin, FaGithub, FaStackOverflow } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <p>Created by Neeraj</p>
            <div className="social-icons">
                <a
                    href="https://www.linkedin.com/in/neerajswarnkar/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaLinkedin className="icon" />
                </a>
                <a
                    href="https://github.com/Neeraj-swarnkar"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaGithub className="icon" />
                </a>
                <a
                    href="https://stackoverflow.com/users/1258518/frontend-expert"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaStackOverflow className="icon" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;