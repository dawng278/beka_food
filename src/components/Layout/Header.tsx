'use client';

import Link from 'next/link';
import { useContext, useState, useEffect, useRef } from 'react';
import { Menu, X, ShoppingBag, User } from 'lucide-react';

import { AuthContext } from '@/contexts/AuthContext';
import { CartContext } from '@/contexts/CartContext';

import NavLinks from './NavLinks';
import AccountOverlay from './AccountOverlay';
import CartOverlay from './CartOverlay';

const Header = () => {
    const auth = useContext(AuthContext);
    const cart = useContext(CartContext);
    const accountRef = useRef<HTMLDivElement>(null);

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showAccountOverlay, setShowAccountOverlay] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                accountRef.current &&
                !accountRef.current.contains(event.target as Node)
            ) {
                setShowAccountOverlay(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Nếu context chưa sẵn sàng thì return null để tránh lỗi
    if (!auth || !cart) return null;

    const { user } = auth;
    const { totalQuantity, toggleCart } = cart;

    return (
        <header className="bg-amber-50 shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
                <Link href="/" className="text-3xl font-bold text-[#B61E01]">
                    BEKA
                </Link>

                <nav className="hidden md:flex items-center space-x-6">
                    <NavLinks />
                </nav>

                <div className="flex items-center space-x-4 relative">
                    {/* Cart Icon */}
                    <div className="relative">
                        <button onClick={toggleCart} className="relative">
                            <ShoppingBag className="cursor-pointer mt-2 text-gray-700 hover:text-[#B61E01]" />
                            {totalQuantity > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {totalQuantity}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Account */}
                    <div ref={accountRef} className="relative">
                        <User
                            className="cursor-pointer text-gray-700 hover:text-[#B61E01]"
                            onClick={() => setShowAccountOverlay(!showAccountOverlay)}
                        />
                        {showAccountOverlay && <AccountOverlay />}
                    </div>

                    {/* Mobile Menu Icon */}
                    <div className="md:hidden">
                        {isMobileMenuOpen ? (
                            <X
                                className="cursor-pointer text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            />
                        ) : (
                            <Menu
                                className="cursor-pointer text-gray-700"
                                onClick={() => setMobileMenuOpen(true)}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <nav className="md:hidden px-4 pb-4 items-center flex flex-col space-y-2 text-center">
                    <NavLinks />
                </nav>
            )}

            {/* Cart Overlay */}
            <CartOverlay />
        </header>
    );
};

export default Header;
