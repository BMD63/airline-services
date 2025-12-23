export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  icon?: string;
}

export interface SelectedService extends Service {
  quantity: number;
}