import React, { useState } from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { products } from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function Marketplace() {
  const { cart, addToCart, removeFromCart, placeOrder } = useApp();
  const [showCart, setShowCart] = useState(false);
  const total = cart.reduce((sum, c) => sum + c.product.price * c.quantity, 0);

  return (
    <div className="relative h-full overflow-y-auto p-4 pb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg">Boutiques & produits</h2>
        <button onClick={() => setShowCart(true)}>
          <div className="relative">
            <ShoppingCart size={22} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {products.map(p => (
          <div key={p.id} className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
            <img src={p.image} className="w-full h-28 object-cover" />
            <div className="p-3">
              <p className="text-sm font-semibold truncate">{p.name}</p>
              <p className="text-xs text-gray-500">{p.shopName}</p>
              <p className="text-brand-500 font-bold text-sm mt-1">{p.price.toLocaleString()} FCFA</p>
              <p className="text-[10px] text-gray-400">Stock : {p.stock}</p>
              <button onClick={() => addToCart(p)} className="mt-2 w-full bg-brand-500 text-white text-xs rounded-full py-2 font-medium">
