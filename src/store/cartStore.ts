import { create } from 'zustand';
import type { Service, SelectedService } from '../types';

interface CartStore {
  selectedServices: SelectedService[];
  addService: (service: Service) => void;
  removeService: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  selectedServices: [],

  addService: (service: Service) => {
    set((state) => {
      const existingService = state.selectedServices.find(
        (item) => item.id === service.id
      );

      if (existingService) {
        return {
          selectedServices: state.selectedServices.map((item) =>
            item.id === service.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          selectedServices: [
            ...state.selectedServices,
            { ...service, quantity: 1 },
          ],
        };
      }
    });
  },

  removeService: (id: string) => {
    set((state) => ({
      selectedServices: state.selectedServices.filter(
        (service) => service.id !== id
      ),
    }));
  },

  decreaseQuantity: (id: string) => {
    set((state) => {
      const existingService = state.selectedServices.find(
        (item) => item.id === id
      );

      if (existingService && existingService.quantity > 1) {
        return {
          selectedServices: state.selectedServices.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      } else {
        return {
          selectedServices: state.selectedServices.filter(
            (service) => service.id !== id
          ),
        };
      }
    });
  },

  clearCart: () => {
    set({ selectedServices: [] });
  },

  getTotalPrice: () => {
    const { selectedServices } = get();
    return selectedServices.reduce(
      (total, service) => total + service.price * service.quantity,
      0
    );
  },
}));