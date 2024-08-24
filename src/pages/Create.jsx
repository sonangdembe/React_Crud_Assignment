import React, { useState, useEffect } from 'react';

const Create = () => {
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profilePicture: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new entry with a unique ID
    const newEntry = { ...formData, id: Date.now() };

    // Retrieve existing data from localStorage or initialize an empty array
    const existingData = JSON.parse(localStorage.getItem('peopleList')) || [];

    // Add new entry to the list
    existingData.push(newEntry);

    // Save updated list to localStorage
    localStorage.setItem('peopleList', JSON.stringify(existingData));

    // Update component state
    setPeopleList(existingData);

    // Clear form data
    setFormData({
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

    // Optionally, you can notify the user
    console.log('Form data saved to localStorage:', newEntry);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Create</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Phone Number:</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your phone number"
              />
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
              className="shadow appearance-none border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>



        <h2 className="text-2xl font-bold text-center my-4">People List</h2>
        <div className="overflow-x-auto">
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
              </tr>
            </thead>
            <tbody>
              {peopleList.map(person => (
                <tr key={person.id}>
                  <td className="py-2 px-4 border-b">{person.name}</td>
                  <td className="py-2 px-4 border-b">{person.email}</td>
                  <td className="py-2 px-4 border-b">{person.phoneNumber}</td>
                  <td className="py-2 px-4 border-b">{person.dob}</td>
                  <td className="py-2 px-4 border-b">{person.city}</td>
                  <td className="py-2 px-4 border-b">{person.district}</td>
                  <td className="py-2 px-4 border-b">{person.province}</td>
                  <td className="py-2 px-4 border-b">{person.country}</td>         
                  <td className="py-2 px-4 border-b text-center">
            <button
              onClick={() => handleEdit(person.id)} // Assuming you have a handleEdit function
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            >
              Edit
            </button>
          </td>


                </tr>
                <button>edit</button>
              ))}
            </tbody>
     
        </div>




      </div>

  );
};

export default Create;
