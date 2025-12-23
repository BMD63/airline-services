import Header from './components/Header';
import ServiceCard from './components/ServiceCard';
import Cart from './components/Cart';
import { mockServices } from './data/mockServices';

function App() {
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
            <Cart />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;