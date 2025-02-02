import React from "react";

const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center py-3 mt-5">
            <div className="container">
                <p>&copy; 2025 Pokédex App | Built with React and Bootstrap</p>
                <p>
                    <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer" className="text-white">
                        Powered by PokéAPI
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
