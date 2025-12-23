import Header from './components/Header';
import ServiceCard from './components/ServiceCard';
import { mockServices } from './data/mockServices';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        
        <main>
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Доступные услуги
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                />
              ))}
            </div>
            
            <div className="mt-8 text-center text-gray-500 text-sm">
              <p>Выберите услуги и откройте корзину для оформления заказа</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;