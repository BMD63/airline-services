import { useEffect, useRef } from 'react';
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
        className="bg-card rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col focus:outline-none"
      >
        {/* Заголовок модалки */}
        <div className="flex justify-between items-center p-6 border-color border-b">
          <h2 
            id="cart-modal-title"
            className="text-xl font-semibold text-primary"
          >
            🛒 Ваша корзина
          </h2>
          <button
            onClick={onClose}
            className="text-muted hover:text-primary text-2xl font-bold leading-none p-2 transition-colors"
            aria-label="Закрыть окно корзины"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        
        {/* Содержимое корзины */}
        <div 
          id="cart-modal-description"
          className="flex-1 overflow-y-auto p-6"
        >
          {selectedServices.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-3 text-muted opacity-50">🛒</div>
              <p className="text-secondary">Корзина пуста</p>
              <p className="text-sm text-muted mt-1">
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
        <div className="border-color border-t p-6">
          {selectedServices.length > 0 && (
            <>
              <div 
                className="flex justify-between items-center text-lg font-bold mb-6"
                aria-live="polite"
                aria-atomic="true"
              >
                <span className="text-primary">Итого:</span>
                <span 
                  className="text-primary-600"
                  aria-label={`Общая сумма заказа: ${total} рублей`}
                >
                  {total} ₽
                </span>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleClear}
                  className="flex-1 border border-red-500 text-red-500 hover:bg-opacity-10 hover:bg-red-500 font-medium py-3 px-4 rounded-lg transition duration-200"
                  aria-label="Очистить всю корзину"
                >
                  Очистить
                </button>
                <button
                  onClick={handleCheckout}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
                  aria-label={`Оформить заказ на сумму ${total} рублей`}
                >
                  Оформить
                </button>
              </div>
            </>
          )}
          
          <button
            onClick={onClose}
            className="w-full mt-4 border border-color text-secondary hover:bg-gray-100 font-medium py-3 px-4 rounded-lg transition duration-200"
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