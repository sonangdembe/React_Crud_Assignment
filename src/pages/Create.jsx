import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'

const Create = () => {
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    id: null, 
    name: '',
    email: '',
    phoneNumber: '',
    dob: '',
    city: '',
    district: '',
    province: '1',
    country: 'Nepal',
    profilePicture: null,
  });
  const [peopleList, setPeopleList] = useState([]);
  const [errors, setErrors] = useState({}); // For storing validation errors

  useEffect(() => {
    // Fetch the list of countries from the API
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const countryNames = data.map(country => country.name.common);
        setCountries(countryNames);
      })
      .catch(error => console.error('Error fetching countries:', error));

    // Load saved form data from localStorage
    const savedData = localStorage.getItem('peopleList');
    if (savedData) {
      setPeopleList(JSON.parse(savedData));
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{7,}$/;

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!emailPattern.test(formData.email)) newErrors.email = 'Email must be in the format name@example.com';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    else if (!phonePattern.test(formData.phoneNumber)) newErrors.phoneNumber = 'Phone number must be at least 7 digits';
    if (formData.profilePicture && formData.profilePicture.type !== 'image/png') newErrors.profilePicture = 'Only PNG files are allowed';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateForm();
  };



  const handleEdit = (id) => {
    // Find the person by ID
    const personToEdit = peopleList.find(person => person.id === id);
  
    if (personToEdit) {
      // Set form data with the selected person's data
      setFormData({
        ...personToEdit,
        profilePicture: null, // Clear profile picture for editing (if needed)
      });
    }
  };
  

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profilePicture: e.target.files[0],
    });
    validateForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    let updatedList;
    if (formData.id) {
      // Editing an existing entry
      updatedList = peopleList.map(person =>
        person.id === formData.id ? formData : person
      );
    } else {
      // Creating a new entry
      const newEntry = { ...formData, id: Date.now() };
      updatedList = [...peopleList, newEntry];
    }

    // Save updated list to localStorage
    localStorage.setItem('peopleList', JSON.stringify(updatedList));

    // Update component state
    setPeopleList(updatedList);

    // Clear form data
    setFormData({
      id: null,
      name: '',
      email: '',
      phoneNumber: '',
      dob: '',
      city: '',
      district: '',
      province: '1',
      country: 'Nepal',
      profilePicture: null,
    });

    // Clear errors
    setErrors({});
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const updatedList = peopleList.filter(person => person.id !== id);
      
      // Save updated list to localStorage
      localStorage.setItem('peopleList', JSON.stringify(updatedList));

      // Update component state
      setPeopleList(updatedList);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center bg-gray-100">
        <div className="w-full max-w-4xl p-8 bg-white shadow-md rounded-lg">
          <h1 className="text-3xl font-bold text-center mb-6">Create or Edit</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Enter your name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">Phone Number:</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phoneNumber ? 'border-red-500' : ''}`}
                  placeholder="Enter your phone number"
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">DOB:</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">City:</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your city"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">District:</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your district"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">Province:</label>
                <select
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="1">Province 1</option>
                  <option value="2">Province 2</option>
                  <option value="3">Province 3</option>
                  <option value="4">Province 4</option>
                  <option value="5">Province 5</option>
                  <option value="6">Province 6</option>
                  <option value="7">Province 7</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">Country:</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="Nepal">Nepal</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Profile Picture:</label>
              <input
                type="file"
                name="profilePicture"
                onChange={handleFileChange}
                className={`shadow appearance-none border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.profilePicture ? 'border-red-500' : ''}`}
              />
              {errors.profilePicture && <p className="text-red-500 text-sm mt-1">{errors.profilePicture}</p>}
            </div>
            <div className="flex items-center justify-center">
              <button className="bg-green-600 h-9 rounded text-white" type="submit">
                {formData.id ? 'Update' : 'Submit'}
              </button>
            </div>
          </form>
        </div>

        <h2 className="text-2xl font-bold text-center my-4">People List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Phone Number</th>
                <th className="py-2 px-4 border-b text-left">DOB</th>
                <th className="py-2 px-4 border-b text-left">City</th>
                <th className="py-2 px-4 border-b text-left">District</th>
                <th className="py-2 px-4 border-b text-left">Province</th>
                <th className="py-2 px-4 border-b text-left">Country</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {peopleList.map((person) => (
                <tr key={person.id}>
                  <td className="py-2 px-4 border-b">{person.name}</td>
                  <td className="py-2 px-4 border-b">{person.email}</td>
                  <td className="py-2 px-4 border-b">{person.phoneNumber}</td>
                  <td className="py-2 px-4 border-b">{person.dob}</td>
                  <td className="py-2 px-4 border-b">{person.city}</td>
                  <td className="py-2 px-4 border-b">{person.district}</td>
                  <td className="py-2 px-4 border-b">{person.province}</td>
                  <td className="py-2 px-4 border-b">{person.country}</td>
                  <td className="py-2 px-4 border-b">
                    <button onClick={() => handleEdit(person.id)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                    <button onClick={() => handleDelete(person.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Create;
