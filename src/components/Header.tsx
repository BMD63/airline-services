import { useState } from 'react';
import CartIcon from './CartIcon';
import CartModal from './CartModal';



const Header = () => {

  const [isCartOpen, setIsCartOpen] = useState(false); // стейт отображения модалки с корзиной
  return (
    <>
      <header className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600">
              Дополнительные услуги для авиапассажиров
            </h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              Выберите дополнительные услуги для вашего рейса
            </p>
          </div>
          <CartIcon onClick={() => setIsCartOpen(true)} />
        </div>
      </header>
      
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
};

export default Header;