import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

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
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const countryNames = data.map(country => country.name.common);
        setCountries(countryNames);
      })
      .catch(error => console.error('Error fetching countries:', error));

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = (id) => {
    const personToEdit = peopleList.find(person => person.id === id);
    if (personToEdit) {
      setFormData({
        ...personToEdit,
        profilePicture: null,
      });
    }
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profilePicture: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    let updatedList;
    if (formData.id) {
      updatedList = peopleList.map(person =>
        person.id === formData.id ? formData : person
      );
    } else {
      const newEntry = { ...formData, id: Date.now() };
      updatedList = [...peopleList, newEntry];
    }

    localStorage.setItem('peopleList', JSON.stringify(updatedList));
    setPeopleList(updatedList);
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
    setErrors({});
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const updatedList = peopleList.filter(person => person.id !== id);
      localStorage.setItem('peopleList', JSON.stringify(updatedList));
      setPeopleList(updatedList);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = peopleList.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-purple-100 py-12">
        <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg mb-8 transition-all duration-300 hover:shadow-xl">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Create or Edit Profile</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
            <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
            <InputField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} error={errors.phoneNumber} />
            <InputField label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />
            <InputField label="City" name="city" value={formData.city} onChange={handleChange} />
            <InputField label="District" name="district" value={formData.district} onChange={handleChange} />
            <SelectField label="Province" name="province" value={formData.province} onChange={handleChange} options={[1, 2, 3, 4, 5, 6, 7]} />
            <SelectField label="Country" name="country" value={formData.country} onChange={handleChange} options={countries} />
            <div className="col-span-2">
              <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
              <input
                id="profilePicture"
                name="profilePicture"
                type="file"
                accept=".png"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            <div className="col-span-2 flex items-center justify-center">
              <button
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-6 rounded-md shadow-md hover:from-blue-600 hover:to-purple-700 transition duration-300 transform hover:scale-105"
                type="submit"
              >
                {formData.id ? 'Update' : 'Submit'}
              </button>
            </div>
          </form>
        </div>

        <div className="w-full max-w-6xl p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">List of Entries</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
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
                  <tr key={person.id} className="border-b border-gray-200 hover:bg-gray-50">
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
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(person.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={indexOfLastRow >= peopleList.length}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const InputField = ({ label, name, type = 'text', value, onChange, error }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-md shadow-sm p-2"
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-md shadow-sm p-2"
    >
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

export default Create;
