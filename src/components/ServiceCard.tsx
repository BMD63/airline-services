import type { Service } from '../types';
import { useCartStore } from '../store/cartStore';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const addService = useCartStore((state) => state.addService);
  
  const handleAdd = () => {
    addService(service);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-5 h-full flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{service.icon}</span>
        <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded">
          {service.category}
        </span>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {service.title}
      </h3>
      
      <p className="text-gray-600 text-sm mb-4 flex-grow">
        {service.description}
      </p>
      
      <div className="flex items-center justify-between mt-auto">
        <span className="text-xl font-bold text-gray-900">
          {service.price} ₽
        </span>
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md text-sm transition duration-200 active:scale-95"
        >
          Добавить
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;