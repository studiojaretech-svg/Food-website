'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
    id: string;
    title: string;
    price: number; // Stored as a clean number (e.g., 28000)
    image: string;
    quantity: number;
    category?: string;
}

export interface OrderDetails {
    customerName: string;
    phone: string;
    deliveryAddress: string;
    additionalNotes?: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
    checkoutViaWhatsApp: (details: OrderDetails) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load cart items from localStorage on mount
    useEffect(() => {
        const storedCart = localStorage.getItem('cravenest_cart');
        if (storedCart) {
            try {
                setCart(JSON.parse(storedCart));
            } catch (e) {
                console.error("Failed to parse stored cart data", e);
            }
        }
        setIsInitialized(true);
    }, []);

    // Persist cart to localStorage whenever it changes
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('cravenest_cart', JSON.stringify(cart));
        }
    }, [cart, isInitialized]);

    const addToCart = (item: Omit<CartItem, 'quantity'>) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((i) => i.id === item.id);
            if (existingItem) {
                return prevCart.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId: string) => {
        setCart((prevCart) => prevCart.filter((i) => i.id !== itemId));
    };

    const updateQuantity = (itemId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(itemId);
            return;
        }
        setCart((prevCart) =>
            prevCart.map((i) => (i.id === itemId ? { ...i, quantity } : i))
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    const checkoutViaWhatsApp = (details: OrderDetails) => {
        const businessPhoneNumber = '2348129232823'; // Cravenest official contact line

        let message = `✦ ─────────────── ✦\n`;
        message += `  *NEW ORDER - CRAVENEST* \n`;
        message += `✦ ─────────────── ✦\n\n`;
        
        message += `*CUSTOMER DETAILS:*\n`;
        message += `👤 *Name:* ${details.customerName}\n`;
        message += `📞 *Phone:* ${details.phone}\n`;
        message += `📍 *Delivery:* ${details.deliveryAddress}\n`;
        if (details.additionalNotes) {
            message += `📝 *Notes:* ${details.additionalNotes}\n`;
        }
        message += `\n*ORDER SUMMARY:*\n`;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            message += `${index + 1}. *${item.title}* (x${item.quantity})\n`;
            message += `   _Price: ₦${item.price.toLocaleString()} | Subtotal: ₦${itemTotal.toLocaleString()}_\n`;
        });

        message += `\n✦ ───────────────── ✦\n`;
        message += `💰 *TOTAL AMOUNT:* ₦${cartTotal.toLocaleString()}\n`;
        message += `✦ ───────────────── ✦\n\n`;
        message += `_Sent automatically from Cravenest Web Portal._`;

        const encodedText = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${businessPhoneNumber}?text=${encodedText}`;
        
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
                checkoutViaWhatsApp,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Safe fallback exporter:
// Prevents build-time crashes when system components are static-rendered outside of layout contexts
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        return {
            cart: [],
            addToCart: () => {},
            removeFromCart: () => {},
            updateQuantity: () => {},
            clearCart: () => {},
            cartTotal: 0,
            cartCount: 0,
            checkoutViaWhatsApp: () => {},
        };
    }
    return context;
};
