import React from 'react';
import { Heart, MapPin, Phone } from 'lucide-react';

const CustomerFooter: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 sm:py-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-left">
            <h2 className="text-lg font-bold text-red-600">51KidsAndToys</h2>
            <p className="text-sm text-gray-600">All week 11AM-10PM</p>
            <p className="text-sm text-gray-600">Fridays 2PM-10PM</p>
          </div>

          <div className="text-right md:text-left">
            <div className="flex items-center justify-end md:justify-start gap-2 text-gray-600">
              <Phone className="h-4 w-4 flex-shrink-0" />
              <a href="tel:+962791417774" className="text-sm hover:text-red-600">
                +962 79 141 7774
              </a>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 text-center md:text-right">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} 51KidsAndToys
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CustomerFooter;