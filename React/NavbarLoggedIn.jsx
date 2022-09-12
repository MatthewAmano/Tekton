import React, { useState } from 'react';
import { Nav, Button } from 'react-bootstrap';
import '../../assets/scss/icons.scss';
import './css/landingpage.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import debug from 'sabio-debug';
import { useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const _logger = debug.extend('NavBarLoggedIn');

export const NavBarLoggedIn = (props) => {
    const logout = (e) => {
        e.preventDefault();
        props.logout();
    };
    const [logoHover, setLogoHover] = useState(false);
    const { pathname } = useLocation();

    const navigateHome = useNavigate();

    const userRoles = props.currentUser.roles;

    const checkRoles = (user) => {
        if (user.roles.includes('User') && user.roles.length === 1) {
            return false;
        } else return true;
    };

    const onHomeBtnClicked = (e) => {
        _logger(e);
        if (userRoles.includes('Subcontractor')) {
            navigateHome('/dashboard/subcontractors');
        } else if (userRoles.includes('OrgAdmin', 'Organizations')) {
            navigateHome('/dashboard/organizations');
        } else if (userRoles.includes('Employee')) {
            navigateHome('/dashboard/organizations');
        } else if (userRoles.includes('Admin', 'SysAdmin')) {
            navigateHome('/dashboard/analytics');
        }
    };

    const logoStyle = {
        opacity: logoHover ? '1' : '0.5',
    };

    const handleMouseEnter = () => {
        setLogoHover(true);
    };

    const handleMouseLeave = () => {
        setLogoHover(false);
    };

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
                {checkRoles(props.currentUser) && (
                    <Nav.Item>
                        <Button
                            onClick={onHomeBtnClicked}
                            className="btn btn-home btn-lg btn-rounded d-none d-lg-inline-flex">
                            <FaHome />
                        </Button>
                    </Nav.Item>
                )}

                <Nav.Item className="mx-lg-1">
                    <Nav.Link href="/pages/profile">
                        <i
                            style={logoStyle}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className="btn dripicons-gear gear-icon text-light"></i>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="me-0">
                    <Nav.Link className="d-lg-none" onClick={logout}>
                        Logout
                    </Nav.Link>
                    <Button
                        onClick={logout}
                        className="btn btn-sm btn-dark btn-rounded d-none d-lg-inline-flex navbarlogoutbutton">
                        Log Out
                    </Button>
                </Nav.Item>
            </Nav>
        </>
    );
};

NavBarLoggedIn.propTypes = {
    logout: PropTypes.func.isRequired,
    currentUser: PropTypes.shape({
        roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
};
