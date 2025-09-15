import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';

const AdminHeader = () => {
    const FiSearch = FiIcons.FiSearch as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FiSettings = FiIcons.FiSettings as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FiBell = FiIcons.FiBell as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FiUser = FiIcons.FiUser as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const user = useSelector((state: RootState) => state.auth.user);
    return (
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center ml-auto space-x-4">
            <FiSettings className="w-5 h-5 text-gray-500 cursor-pointer" />
            <FiBell className="w-5 h-5 text-gray-500 cursor-pointer" />
            <div className="flex items-center space-x-2 cursor-pointer">
              <FiUser className="w-5 h-5 text-gray-500" />
              {user ? (
                <>
                    <span>{user.nickname}</span>
                </>
              ):(
                <>
                    <span></span>
                </>
              )}
            </div>
          </div>
        </header>
    )
}

export default AdminHeader;