// src/utils/hoursHelper.ts
export const checkBusinessHours = (hours: any): boolean => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0=Domingo, 1=Lunes...
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTime = currentHour * 60 + currentMinutes; // Convertir a minutos

  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[dayOfWeek];
  const todayHours = hours[today];

  if (!todayHours || todayHours.morning === 'Cerrado') return false;

  const parseTime = (timeStr: string): number => {
    if (timeStr === 'Cerrado') return -1;

    const [time, period] = timeStr.split(' ');
    const [hoursStr, minutesStr] = time.split(':');
    let hours = parseInt(hoursStr);
    const minutes = minutesStr ? parseInt(minutesStr) : 0;

    // Caso especial para medianoche (00:00 AM)
    if (hours === 12 && period === 'AM') {
      return 24 * 60; // 1440 minutos (24:00)
    }

    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    return hours * 60 + minutes;
  };

  // Verificar horario continuo (ejemplo: 7:00 AM - 00:00 AM)
  if (todayHours.morning !== 'Cerrado' && todayHours.afternoon === 'Cerrado') {
    const [start, end] = todayHours.morning.split(' - ').map(parseTime);
    
    // Si cierra a medianoche (1440 minutos)
    if (end === 1440) {
      return currentTime >= start || currentTime < 0; // Abierto desde 7:00 AM hasta 23:59
    }
    return currentTime >= start && currentTime <= end;
  }

  // Verificar horario partido (mañana y tarde)
  if (todayHours.afternoon !== 'Cerrado') {
    const [morningStart, morningEnd] = todayHours.morning.split(' - ').map(parseTime);
    const [afternoonStart, afternoonEnd] = todayHours.afternoon.split(' - ').map(parseTime);

    // Caso especial: cierre a medianoche en el turno tarde
    if (afternoonEnd === 1440) {
      return (
        (currentTime >= morningStart && currentTime <= morningEnd) ||
        (currentTime >= afternoonStart || currentTime < 0) // Abierto hasta 23:59
      );
    }
    return (
      (currentTime >= morningStart && currentTime <= morningEnd) ||
      (currentTime >= afternoonStart && currentTime <= afternoonEnd)
    );
  }

  return false;
};