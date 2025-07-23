export interface Hours {
  morning: string;
  afternoon: string;
}

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
  hours: Record<string, Hours> & {
    monday: Hours;
    tuesday: Hours;
    wednesday: Hours;
    thursday: Hours;
    friday: Hours;
    saturday: Hours;
    sunday: Hours;
  };
  isOpen: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  featured?: boolean;
  mapEmbedUrl?: string;
  isPharmacy?: boolean;          // Nuevo campo para identificar farmacias
  pharmacyTurns?: string[];      // Nuevo campo para días de turno
  emergencyPhone?: string;       // Nuevo campo para teléfono de emergencia
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}