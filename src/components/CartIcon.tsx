import { useCartStore } from '../store/cartStore';

interface CartIconProps {
  onClick: () => void;
}

const CartIcon = ({ onClick }: CartIconProps) => {
  const { selectedServices, getTotalPrice } = useCartStore();
  const totalPrice = getTotalPrice();
  const itemCount = selectedServices.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <button
      onClick={onClick}
      className="relative bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-lg transition-all duration-200 active:scale-95"
      aria-label={`Открыть корзину. Товаров: ${itemCount}, на сумму: ${totalPrice} рублей`}
    >
      <div className="flex items-center">
        <span 
          className="text-xl mr-2"
          role="img"
          aria-label="Корзина покупок"
        >
          🛒
        </span>
        <span className="font-medium">{totalPrice} ₽</span>
      </div>
      
      {itemCount > 0 && (
        <div 
          className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
          aria-hidden="true"
        >
          {itemCount}
        </div>
      )}
    </button>
  );
};

export default CartIcon;