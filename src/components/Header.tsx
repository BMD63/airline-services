import { useState } from 'react';
import CartIcon from './CartIcon';
import CartModal from './CartModal';
import { useTheme } from '../hooks/useTheme';

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <>
      <header className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary-600">
              Дополнительные услуги для авиапассажиров
            </h1>
            <p className="text-secondary mt-2 text-sm md:text-base">
              Выберите дополнительные услуги для вашего рейса
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label={isDarkMode ? 'Включить светлую тему' : 'Включить темную тему'}
            >
              {isDarkMode ? (
                <span className="text-xl" role="img" aria-label="Темная тема">☀️</span>
              ) : (
                <span className="text-xl" role="img" aria-label="Светлая тема">🌙</span>
              )}
            </button>
            
            <CartIcon onClick={() => setIsCartOpen(true)} />
          </div>
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