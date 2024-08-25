import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('peopleList');
    if (savedData) {
      const peopleList = JSON.parse(savedData);
      if (peopleList.length > 0) {
        // Assuming the last entry is the most recent one
        setUserData(peopleList[peopleList.length - 1]);
      }
    }
  }, []);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          MyApp
        </Link>
        <div className="flex items-center space-x-4">
          {userData && (
            <>
              {userData.profilePicture && (
                <img
                  src={URL.createObjectURL(userData.profilePicture)}
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
              )}
              <span className="text-white">{userData.name}</span>
            </>
          )}
          <Link to="/create" className="text-white hover:text-gray-300 transition duration-200">
            Create Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
