import React from 'react';
import { Heart, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-bold text-red-600">51KidsAndToys</h2>
            <p>All week 11AM-10PM</p>
            <p>Fridays 2PM-10PM</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Our Locations
            </h3>
            <div className="flex items-start space-x-2 text-gray-600">
              <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <p>Mecca Street & Alfuhais, Amman, Jordan</p>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 mt-2">
              <Phone className="h-5 w-5 flex-shrink-0" />
              <p>+962 79 141 7774</p>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end">
            <p className="text-gray-600 flex items-center">
              Made with <Heart size={16} className="mx-1 text-red-600" /> for
              our customers
            </p>
            <p className="text-gray-500 text-sm mt-1">
              © {new Date().getFullYear()} 51KidsAndToys. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
