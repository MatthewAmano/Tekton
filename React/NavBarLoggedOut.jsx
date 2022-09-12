import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../assets/scss/icons.scss';
import './css/landingpage.css';
import { useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

export const NavBarLoggedOut = () => {
    const { pathname } = useLocation();
    return (
        <>
            <Nav as="ul" className="me-auto align-items-center">
                <Nav.Item as="li" className="mx-lg-1">
                    <Nav.Link href="/" className={pathname === '/' ? 'active' : ''}>
                        Home
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mx-lg-1">
                    <Nav.Link href="/subscriptions" className={pathname === '/subscriptions' ? 'active' : ''}>
                        Pricing
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mx-lg-1">
                    <Nav.Link href="/faqs" className={pathname === '/faqs' ? 'active' : ''}>
                        FAQs
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mx-lg-1">
                    <Nav.Link href="/jobs" className={pathname === '/jobs' ? 'active' : ''}>
                        Jobs
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mx-lg-1">
                    <Nav.Link href="/blogs" className={pathname === '/blogs' ? 'active' : ''}>
                        Blogs
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mx-lg-1">
                    <HashLink to="/#getintouch" className="nav-link">
                        Contact
                    </HashLink>
                </Nav.Item>
            </Nav>
            <Nav className="ms-auto align-items-center">
                <Nav.Item className="me-0">
                    <Nav.Link href="/login" className="d-lg-none text-center">
                        Log In
                    </Nav.Link>
                    <Nav.Link href="/register" className="d-lg-none text-center">
                        Sign Up
                    </Nav.Link>
                    <div className="d-none d-lg-block">
                        <Link to="/login">
                            <button type="button" className="btn btn-sm btn-dark btn-rounded login-button">
                                Log In
                            </button>
                        </Link>
                        {'   '}
                        <Link to="/register">
                            <button type="button" className="btn btn-sm btn-dark btn-rounded">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </Nav.Item>
            </Nav>
        </>
    );
};
