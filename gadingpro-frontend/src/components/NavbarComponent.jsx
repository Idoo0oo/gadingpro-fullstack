// src/components/NavbarComponent.jsx
import { useState, useEffect } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate

import { navLinks } from '../data/index'

const NavbarComponent = () => {
    const [changeColor, setChangeColor] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigate = useNavigate(); // Inisialisasi useNavigate

    const changeBackgroundColor = () => {
        if (window.scrollY >= 10) {
            setChangeColor(true)
        } else {
            setChangeColor(false)
        }
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    useEffect (() => {
        changeBackgroundColor();
        window.addEventListener('scroll', changeBackgroundColor)
        // Cleanup listener saat komponen di-unmount
        return () => {
            window.removeEventListener('scroll', changeBackgroundColor);
        };
    }, []) // Dependency array kosong agar hanya berjalan sekali

    return (
        <div>
            <Navbar expand="lg" className={changeColor ? "color-active" : ""}>
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src="https://agents-events-prod.storage.googleapis.com/wp-content/uploads/sites/20/2024/03/20035510/Gading-Pro-Logo.png"
                            alt="GadingPro Logo"
                            height="50"
                        />
                    </Navbar.Brand>

                    {/* Custom Hamburger Toggle */}
                    <button
                        className={`navbar-toggler custom-toggler ${isMenuOpen ? 'open' : ''}`}
                        type="button"
                        onClick={toggleMenu}
                        data-bs-toggle="collapse"
                        data-bs-target="#basic-navbar-nav"
                        aria-controls="basic-navbar-nav"
                        aria-expanded={isMenuOpen}
                        aria-label="Toggle navigation"
                    >
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                    </button>

                    <Navbar.Collapse id="basic-navbar-nav" className={isMenuOpen ? 'show' : ''}>
                        <Nav className="mx-auto text-center">
                            {navLinks.map((link) => {
                                return (
                                    <div className='nav-link' key={link.id}>
                                        <NavLink to={link.path} className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "active" : ""} end>
                                            {link.text}
                                        </NavLink>
                                    </div>
                                );
                            })}
                        </Nav>

                        <div className='text-center'>
                            {/* Ubah button ini agar navigate ke halaman ContactPage */}
                            <button
                                className='btn btn-outline-orange rounded-2'
                                onClick={() => navigate("/contact-us")} // Menggunakan navigate
                            >
                                Contact Us
                            </button>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavbarComponent;