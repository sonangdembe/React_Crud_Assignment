import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [peopleList, setPeopleList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; 

  useEffect(() => {
    const savedProfilePicture = localStorage.getItem('profilePicture');
    if (savedProfilePicture) {
      setProfilePicture(savedProfilePicture);
    }

    const savedPeopleList = JSON.parse(localStorage.getItem('peopleList')) || [];
    setPeopleList(savedPeopleList);
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

  const handleEdit = (id) => {
    console.log('Edit person with id:', id);
  };

  const handleDelete = (id) => {
    const updatedList = peopleList.filter((person) => person.id !== id);
    setPeopleList(updatedList);
    localStorage.setItem('peopleList', JSON.stringify(updatedList));
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = peopleList.slice(indexOfFirstRow, indexOfLastRow);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    if (indexOfLastRow < peopleList.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <Navbar profilePicture={profilePicture} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Profiles</h1>

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
              className="bg-gradient-to-r my-4 from-blue-500 to-purple-600 text-white font-semibold py-2 px-6 rounded-md shadow-md hover:from-blue-600 hover:to-purple-700 transition duration-300 transform hover:scale-105"
            >
              Back to Create
            </Link>
          </div>

          <div className="w-full p-8 bg-white my-4 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 ">List of Entries</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Phone Number</th>
                    <th className="py-3 px-4 text-left">DOB</th>
                    <th className="py-3 px-4 text-left">City</th>
                    <th className="py-3 px-4 text-left">District</th>
                    <th className="py-3 px-4 text-left">Province</th>
                    <th className="py-3 px-4 text-left">Country</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((person) => (
                    <tr key={person.id} className="border-b border-gray-200">
                      <td className="py-3 px-4">{person.name}</td>
                      <td className="py-3 px-4">{person.email}</td>
                      <td className="py-3 px-4">{person.phoneNumber}</td>
                      <td className="py-3 px-4">{person.dob}</td>
                      <td className="py-3 px-4">{person.city}</td>
                      <td className="py-3 px-4">{person.district}</td>
                      <td className="py-3 px-4">{person.province}</td>
                      <td className="py-3 px-4">{person.country}</td>
                      <td className="py-3 px-4 flex space-x-2">
                        <button
                          onClick={() => handleEdit(person.id)}
                          className="text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(person.id)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrevPage}
                className="px-4 py-2 rounded bg-green-500 rounded-l-md hover:bg-gray-300 focus:outline-none"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                className="px-4 py-2 rounded bg-green-500 rounded-r-md hover:bg-gray-300 focus:outline-none"
                disabled={indexOfLastRow >= peopleList.length}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
