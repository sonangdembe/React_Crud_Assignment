import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Profile = () => {
  const [peopleList, setPeopleList] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('peopleList');
    if (savedData) {
      setPeopleList(JSON.parse(savedData));
    }

    const savedProfilePicture = localStorage.getItem('profilePicture');
    if (savedProfilePicture) {
      setProfilePicture(savedProfilePicture);
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/png') {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result);
        localStorage.setItem('profilePicture', reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Only PNG files are allowed');
    }
  };

  return (
    <>
      {/* Pass the profilePicture to Navbar */}
      <Navbar profilePicture={profilePicture} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Profiles</h1>

          {/* File upload container */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
              {profilePicture ? (
                <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>
            <input
              type="file"
              accept=".png"
              onChange={handleFileChange}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          

          <div className="mt-8 text-center">
            <Link
              to="/"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-6 rounded-md shadow-md hover:from-blue-600 hover:to-purple-700 transition duration-300 transform hover:scale-105"
            >
              Back to Create
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
