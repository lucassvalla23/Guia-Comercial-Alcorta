import { Business } from '../types';

interface BusinessMapProps {
  business: Business;
}

export const BusinessMap = ({ business }: BusinessMapProps) => {
  if (!business.mapEmbedUrl) {
    return (
      <div className="bg-gray-100 rounded-lg p-6 text-center">
        <p className="text-gray-600">Mapa no disponible</p>
      </div>
    );
  }

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden">
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        src={business.mapEmbedUrl}
        allowFullScreen
      />
    </div>
  );
};