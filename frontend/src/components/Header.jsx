import React from 'react';

const Header = ({ 
  breadcrumbPath = "Pages / Dashboard", 
  userName = "User", 
  showSearchBar = true,
  searchPlaceholder = "Type here",
  onSearchChange = () => {}
}) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <p className="text-gray-500">{breadcrumbPath}</p>
      </div>
      <div className="flex items-center space-x-4">
        {showSearchBar && (
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 transition"
            onChange={onSearchChange}
          />
        )}
        <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">
          {userName.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default Header;