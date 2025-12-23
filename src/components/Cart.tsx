import { useCartStore } from '../store/cartStore';
import CartItem from './CartItem';

const Cart = () => {
  const { selectedServices, clearCart, getTotalPrice } = useCartStore();
  const total = getTotalPrice();
  
  const handleClear = () => {
    if (window.confirm('Очистить корзину?')) {
      clearCart();
    }
  };
  
  const handleCheckout = () => {
    alert('Заказ оформлен! Сумма: ' + total + ' ₽');
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          🛒 Выбранные услуги
        </h2>
        {selectedServices.length > 0 && (
          <button
            onClick={handleClear}
            className="text-sm text-red-500 hover:text-red-700 font-medium"
          >
            Очистить
          </button>
        )}
      </div>
      
      {selectedServices.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-5xl mb-3 text-gray-300">🛒</div>
          <p className="text-gray-500">Корзина пуста</p>
          <p className="text-sm text-gray-400 mt-1">
            Добавьте услуги из списка
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 mb-6">
            {selectedServices.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          
          <div className="border-t pt-6">
            <div className="flex justify-between items-center text-lg font-bold mb-6">
              <span>Итого:</span>
              <span className="text-blue-600">{total} ₽</span>
            </div>
            
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 active:scale-95"
            >
              Оформить заказ
            </button>
            
            <p className="text-center text-gray-400 text-sm mt-3">
              Оплата будет произведена на следующем шаге
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;