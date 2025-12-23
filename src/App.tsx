import Header from './components/Header';
import ServiceCard from './components/ServiceCard';
import { mockServices } from './data/mockServices';

function App() {
  const selectedServices = []; // Временно

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        
        <main className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Блок услуг */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Доступные услуги
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Блок корзины */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                🛒 Выбранные услуги
              </h2>
              
              {selectedServices.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-3 text-gray-300">🛒</div>
                  <p className="text-gray-500">Корзина пуста</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Добавьте услуги из списка
                  </p>
                </div>
              ) : (
                <div>
                  {/* Здесь будут выбранные услуги */}
                </div>
              )}

              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between items-center text-lg font-bold mb-6">
                  <span>Итого:</span>
                  <span className="text-blue-600">0 ₽</span>
                </div>
                
                {selectedServices.length > 0 && (
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200">
                    Оформить заказ
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;