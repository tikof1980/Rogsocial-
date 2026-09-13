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
        <h2 className="font-bold text-lg">Boutiques et produits</h2>
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
                Ajouter au panier
              </button>
            </div>
          </div>
        ))}
      </div>

      {showCart && (
        <div className="fixed inset-0 max-w-md mx-auto bg-black/50 z-40 flex items-end">
          <div className="bg-white dark:bg-gray-900 w-full rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto pb-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Mon panier</h3>
              <button onClick={() => setShowCart(false)}>
                <X size={20} />
              </button>
            </div>

            {cart.length === 0 && (
              <p className="text-sm text-gray-500">Votre panier est vide.</p>
            )}

            {cart.length > 0 && (
              <div>
                {cart.map(c => (
                  <div key={c.product.id} className="flex items-center gap-3 mb-3">
                    <img src={c.product.image} className="w-14 h-14 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{c.product.name}</p>
                      <p className="text-xs text-gray-500">Quantité : {c.quantity}</p>
                      <p className="text-brand-500 text-sm font-bold">
                        {(c.product.price * c.quantity).toLocaleString()} FCFA
                      </p>
                    </div>
                    <button onClick={() => removeFromCart(c.product.id)} className="text-xs text-gray-400">
                      Retirer
                    </button>
                  </div>
                ))}

                <div className="flex justify-between font-semibold mb-3 pt-2 border-t border-gray-200 dark:border-gray-800">
                  <span>Total</span>
                  <span>{total.toLocaleString()} FCFA</span>
                </div>

                <button
                  onClick={() => {
                    cart.forEach(c => placeOrder(c.product, c.quantity));
                    setShowCart(false);
                  }}
                  className="w-full bg-brand-500 text-white rounded-full py-3 font-semibold"
                >
                  Valider la commande
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
