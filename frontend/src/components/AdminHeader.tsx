import React from 'react';
import * as FiIcons from 'react-icons/fi';

const AdminHeader = () => {
    const FiSearch = FiIcons.FiSearch as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FiSettings = FiIcons.FiSettings as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FiBell = FiIcons.FiBell as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FiUser = FiIcons.FiUser as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    return (
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <input placeholder="Search... (Ctrl+K)" className="w-72 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <FiSearch className="w-5 h-5 text-gray-500" />
          </div>
          <div className="flex items-center space-x-4">
            <FiSettings className="w-5 h-5 text-gray-500 cursor-pointer" />
            <FiBell className="w-5 h-5 text-gray-500 cursor-pointer" />
            <div className="flex items-center space-x-2 cursor-pointer">
              <FiUser className="w-5 h-5 text-gray-500" />
              <span>John Doe</span>
            </div>
          </div>
        </header>
    )
}

export default AdminHeader;