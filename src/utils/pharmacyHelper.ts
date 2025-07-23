import { Business } from '../types';

export const getCurrentPharmacy = (businesses: Business[]): Business | null => {
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const today = new Date().getDay(); // 0 (Domingo) a 6 (Sábado)
  const todayName = days[today];
  
  const pharmacies = businesses.filter(b => b.isPharmacy);
  
  // Encontrar la farmacia de turno para hoy
  const todaysPharmacy = pharmacies.find(pharmacy => 
    pharmacy.pharmacyTurns?.includes(todayName)
  );
  
  return todaysPharmacy || null;
};

export const getPharmacySchedule = (pharmacies: Business[]) => {
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  
  return days.map(day => ({
    day,
    pharmacy: pharmacies.find(pharmacy => pharmacy.pharmacyTurns?.includes(day))
  }));
};