// src/components/Menu/MenuItemCard.tsx
'use client'; // Component này sử dụng hooks và tương tác người dùng

import React from 'react';
import Image from 'next/image'; // Sử dụng Image của Next.js
import { useCart } from '@/contexts/CartContext'; // Import useCart hook

interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string; // Đường dẫn ảnh
    category: string;
}

interface MenuItemCardProps {
    item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
    const { addToCart, loading: cartLoading } = useCart();

    const formattedPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
    }).format(item.price);

    const handleAddToCartClick = () => {
        addToCart(item); // Gọi hàm addToCart từ Context
    };

    return (
        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden
                        flex flex-col items-center text-center p-4 md:p-6 lg:p-8
                        transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl z-10">
            {/* Ảnh sản phẩm */}
            <div className="w-full h-48 md:h-48 lg:h-48 flex items-center justify-center mb-4">
                <Image
                    src={item.image} // Đường dẫn ảnh từ dữ liệu
                    alt={item.name}
                    width={200} // Kích thước cố định cho Image component
                    height={200} // Kích thước cố định cho Image component
                    className="max-w-full max-h-full object-contain"
                    priority={false} // Không ưu tiên tải sớm
                    loading="lazy" // Tải lười
                />
            </div>

            {/* Tên sản phẩm */}
            <h3 className="text-xl md:text-xl font-bold text-gray-800 mb-2 uppercase">
                {item.name}
            </h3>

            {/* Giá sản phẩm */}
            <p className="text-xl md:text-xl font-extrabold text-secondary mb-4">
                {formattedPrice}
            </p>

            {/* Nút "Add to Cart" */}
            <button
                onClick={handleAddToCartClick}
                className="w-full bg-primary text-white text-lg md:text-xl font-bold uppercase
                           py-3 px-6 rounded-full shadow-md
                           hover:bg-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-500 focus-visible:ring-opacity-75
                           transition-colors duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={`Add ${item.name} to cart`}
                disabled={cartLoading}
            >
                {cartLoading ? 'Adding...' : 'Add to Cart'}
            </button>
        </div>
    );
};

export default MenuItemCard;
