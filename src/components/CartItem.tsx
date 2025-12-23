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
    <div className="border-b pb-4 mb-4 last:border-0 last:mb-0">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium text-gray-900">{item.title}</h4>
          <p className="text-sm text-gray-500">{item.price} ₽/шт</p>
        </div>
        <button
          onClick={handleRemove}
          className="text-gray-400 hover:text-red-500 text-xl font-bold leading-none"
          aria-label="Удалить услугу"
        >
          ×
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrease}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Уменьшить количество"
            disabled={item.quantity <= 1}
          >
            −
          </button>
          <span className="font-medium w-8 text-center">{item.quantity}</span>
          <button
            onClick={handleIncrease}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md text-lg font-bold"
            aria-label="Увеличить количество"
          >
            +
          </button>
        </div>
        
        <div className="text-right">
          <p className="font-bold text-gray-900">
            {item.price * item.quantity} ₽
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;