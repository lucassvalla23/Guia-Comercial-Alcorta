import React from 'react';
import { Business } from '../types';

interface ScheduleDay {
  day: string;
  pharmacy: Business | undefined;
}

interface PharmacyScheduleProps {
  schedule: ScheduleDay[];
}

export const PharmacySchedule: React.FC<PharmacyScheduleProps> = ({ schedule }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-[#01764c]/30 mt-8">
      <h2 className="text-2xl font-bold text-[#01764c] mb-6 flex items-center">
        <svg className="w-6 h-6 mr-2 text-[#c42b2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Calendario de Farmacias de Turno
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
        {schedule.map(({day, pharmacy}) => (
          <div 
            key={day} 
            className={`p-3 rounded-lg border ${
              pharmacy 
                ? 'border-[#c42b2a]/30 bg-[#c42b2a]/5' 
                : 'border-gray-200'
            }`}
          >
            <h3 className={`font-medium ${
              pharmacy ? 'text-[#c42b2a]' : 'text-gray-500'
            }`}>
              {day}
            </h3>
            {pharmacy ? (
              <div className="mt-2">
                <p className="text-sm font-medium">{pharmacy.name}</p>
                {pharmacy.emergencyPhone && (
                  <p className="text-xs text-[#c42b2a] mt-1">
                    <svg className="w-3 h-3 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {pharmacy.emergencyPhone}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500 mt-2">No hay turno</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};