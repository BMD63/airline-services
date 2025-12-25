import type { SelectedService } from '../types';
import { useCartStore } from '../store/cartStore';

interface CartItemProps {
  item: SelectedService;
}

const CartItem = ({ item }: CartItemProps) => {
  const { addService, decreaseQuantity, removeService } = useCartStore();
  
  const handleIncrease = () => {
    addService(item);
  };
  
  const handleDecrease = () => {
    decreaseQuantity(item.id);
  };
  
  const handleRemove = () => {
    removeService(item.id);
  };
  
  return (
    <div 
      className="border-color border-b pb-4 mb-4 last:border-0 last:mb-0"
      role="listitem"
      aria-label={`${item.title}, количество: ${item.quantity}, сумма: ${item.price * item.quantity} рублей`}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium text-primary">{item.title}</h4>
          <p className="text-sm text-secondary">{item.price} ₽/шт</p>
        </div>
        <button
          onClick={handleRemove}
          className="text-muted hover:text-red-500 p-1 transition-colors"
          aria-label={`Удалить ${item.title} из корзины`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
            />
          </svg>
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrease}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label={`Уменьшить количество ${item.title}`}
            disabled={item.quantity <= 1}
            aria-disabled={item.quantity <= 1}
          >
            −
          </button>
          <span 
            className="font-medium w-8 text-center text-primary"
            aria-live="polite"
            aria-atomic="true"
          >
            {item.quantity}
          </span>
          <button
            onClick={handleIncrease}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md text-lg font-bold transition-colors"
            aria-label={`Увеличить количество ${item.title}`}
          >
            +
          </button>
        </div>
        
        <div className="text-right">
          <p 
            className="font-bold text-primary"
            aria-label={`Общая сумма за ${item.title}: ${item.price * item.quantity} рублей`}
          >
            {item.price * item.quantity} ₽
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;