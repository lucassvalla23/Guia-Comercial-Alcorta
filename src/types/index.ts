export interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  address: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  hours: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  isOpen: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  featured?: boolean;
  mapEmbedUrl?: string; // <-- Añade esta nueva propiedad opcional
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}