import React, { useEffect, useState } from 'react';
import tajaLogo from '../assets/taja.png';
import Search from './Search';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from './UserMenu';
import { useGlobalContext } from '../provider/GlobalProvider';
import DisplayCartItem from './DisplayCartItem';

const Header = () => {
    const [isMobile] = useMobile();
    const location = useLocation();
    const isSearchPage = location.pathname === "/search";
    const navigate = useNavigate();
    const user = useSelector((state) => state?.user);
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const { totalQty } = useGlobalContext();
    const [openCartSection, setOpenCartSection] = useState(false);

    const redirectToLoginPage = () => {
        navigate("/login");
    };

    const handleCloseUserMenu = () => {
        setOpenUserMenu(false);
    };

    const handleMobileUser = () => {
        if (!user._id) {
            navigate("/login");
            return;
        }
        navigate("/user");
    };

    return (
        <>
            <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white'>
                {
                    !(isSearchPage && isMobile) && (
                        <div className='w-full max-w-screen-2xl mx-auto flex items-center px-6 justify-between'>

                            {/* Logo */}
                            <div className='h-full'>
                                <Link to={"/"} className='h-full flex justify-center items-center'>
                                    <img
                                        src={tajaLogo}
                                        alt='TAJA Logo'
                                        className='hidden lg:block h-[76px] w-auto'
                                    />
                                    <img
                                        src={tajaLogo}
                                        alt='TAJA Logo'
                                        className='lg:hidden h-20 w-auto'
                                    />
                                </Link>
                            </div>

                            {/* Nav + Search */}
                            <div className="flex items-center gap-8 flex-1 max-w-4xl justify-center mx-8">
                                {/* Navigation */}
                                <nav className="hidden lg:flex items-center gap-8">
                                    <Link to="/" className="text-base font-semibold text-gray-800 hover:text-green-700">Home</Link>
                                   <Link to="/shop" className="text-base font-semibold text-gray-800 hover:text-green-700">Shop</Link>

                                 <Link to="/contact-us" className="text-base font-semibold text-gray-800 hover:text-green-700">Contact Us</Link>

                                    <Link to="/about-us" className="text-base font-semibold text-gray-800 hover:text-green-700">About Us</Link>
                                </nav>

                                {/* Search Bar */}
                                <div className="hidden lg:block" style={{ minWidth: '320px', maxWidth: '420px', width: '100%' }}>
                                    <Search />
                                </div>
                            </div>

                            {/* Right-side icons */}
                            <div className=''>
                                <button className='text-neutral-600 lg:hidden' onClick={handleMobileUser}>
                                    <FaRegCircleUser size={26} />
                                </button>

                                <div className='hidden lg:flex items-center gap-6'>

                                    {/* Cart Icon Only */}
                                    <button
                                        onClick={() => setOpenCartSection(true)}
                                        className="relative p-2 text-gray-700 hover:text-green-600 transition-colors"
                                        aria-label="Shopping Cart"
                                    >
                                        <BsCart4 size={28} />
                                        {totalQty > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-green-700 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold">
                                                {totalQty}
                                            </span>
                                        )}
                                    </button>

                                    {/* Login or Account */}
                                    {
                                        user?._id ? (
                                            <div className='relative'>
                                                <div
                                                    onClick={() => setOpenUserMenu(prev => !prev)}
                                                    className='flex select-none items-center gap-2 cursor-pointer px-5 py-2 bg-green-700 text-white rounded-full font-semibold hover:bg-green-800 transition'
                                                >
                                                    <span>Account</span>
                                                    {openUserMenu ? <GoTriangleUp size={20} /> : <GoTriangleDown size={20} />}
                                                </div>
                                                {openUserMenu && (
                                                    <div className='absolute right-0 top-12'>
                                                        <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                                                            <UserMenu close={handleCloseUserMenu} />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <button
                                                onClick={redirectToLoginPage}
                                                className='px-5 py-2 bg-green-700 text-white rounded-full font-semibold hover:bg-green-800 transition'
                                            >
                                                Login
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </header>

            {/* Mobile Search */}
            <div className='container mx-auto px-2 lg:hidden'>
                <Search />
            </div>

            {/* Cart Sidebar */}
            {
                openCartSection && (
                    <DisplayCartItem close={() => setOpenCartSection(false)} />
                )
            }
        </>
    );
};

export default Header;
