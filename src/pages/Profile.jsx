import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedPicture = localStorage.getItem('profilePicture');
    if (savedPicture) {
      setProfilePicture(savedPicture);
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/png') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        localStorage.setItem('profilePicture', reader.result);
        setErrors('');
        navigate('/'); // Redirect after successful upload
      };
      reader.readAsDataURL(file);
    } else {
      setErrors('Only PNG files are allowed.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5F5DC]">
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
        <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden mb-4">
          {profilePicture ? (
            <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="flex items-center justify-center h-full text-gray-500">Upload Picture</span>
          )}
        </div>
        <input
          type="file"
          accept="image/png"
          onChange={handleFileChange}
          className="mb-4"
        />
        {errors && <p className="text-red-500">{errors}</p>}
      </div>
    </div>
  );
};

export default Profile;
