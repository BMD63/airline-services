import { useEffect, useRef } from 'react'; // Добавляем useRef
import { useCartStore } from '../store/cartStore';
import CartItem from './CartItem';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { selectedServices, clearCart, getTotalPrice } = useCartStore();
  const total = getTotalPrice();
  
  // Фокус на модалке при открытии
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      // Добавляем роль для скринридеров
      document.body.setAttribute('aria-hidden', 'true');
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
      document.body.removeAttribute('aria-hidden');
    };
  }, [isOpen, onClose]);
  
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  const handleClear = () => {
    if (window.confirm('Очистить корзину?')) {
      clearCart();
    }
  };
  
  const handleCheckout = () => {
    alert(`Заказ оформлен! Сумма: ${total} ₽`);
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
      aria-describedby="cart-modal-description"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div 
        ref={modalRef}
        tabIndex={-1}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col focus:outline-none"
      >
        {/* Заголовок модалки */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 
            id="cart-modal-title"
            className="text-xl font-semibold text-gray-800"
          >
            🛒 Ваша корзина
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none p-2"
            aria-label="Закрыть окно корзины"
          >
            ×
          </button>
        </div>
        
        {/* Содержимое корзины */}
        <div 
          id="cart-modal-description"
          className="flex-1 overflow-y-auto p-6"
        >
          {selectedServices.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-3 text-gray-300">🛒</div>
              <p className="text-gray-500">Корзина пуста</p>
              <p className="text-sm text-gray-400 mt-1">
                Добавьте услуги из списка
              </p>
            </div>
          ) : (
            <div 
              role="list"
              aria-label="Список выбранных услуг"
              className="space-y-4"
            >
              {selectedServices.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
        
        {/* Футер модалки */}
        <div className="border-t p-6">
          {selectedServices.length > 0 && (
            <>
              <div 
                className="flex justify-between items-center text-lg font-bold mb-6"
                aria-live="polite"
                aria-atomic="true"
              >
                <span>Итого:</span>
                <span 
                  className="text-blue-600"
                  aria-label={`Общая сумма заказа: ${total} рублей`}
                >
                  {total} ₽
                </span>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleClear}
                  className="flex-1 border border-red-500 text-red-500 hover:bg-red-50 font-medium py-3 px-4 rounded-lg transition duration-200"
                  aria-label="Очистить всю корзину"
                >
                  Очистить
                </button>
                <button
                  onClick={handleCheckout}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
                  aria-label={`Оформить заказ на сумму ${total} рублей`}
                >
                  Оформить заказ
                </button>
              </div>
            </>
          )}
          
          <button
            onClick={onClose}
            className="w-full mt-4 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-4 rounded-lg transition duration-200"
            aria-label="Продолжить выбор услуг"
          >
            Продолжить выбор
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;