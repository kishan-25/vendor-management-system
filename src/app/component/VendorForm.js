
import React, { useState, useEffect } from 'react';

export default function VendorForm({ onSubmit, onCancel, initialData }) {
  const defaultFormData = {
    name: '',
    bankAccountNo: '',
    bankName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: '',
    zipCode: ''
  };

  const [formData, setFormData] = useState(initialData || defaultFormData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Vendor Name is required';
    }
    
    if (!formData.bankAccountNo.trim()) {
      newErrors.bankAccountNo = 'Bank Account Number is required';
    }
    
    if (!formData.bankName.trim()) {
      newErrors.bankName = 'Bank Name is required';
    }
    
    if (!formData.addressLine2.trim()) {
      newErrors.addressLine2 = 'Address Line 2 is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">
            Vendor Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Bank Account No. <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="bankAccountNo"
            value={formData.bankAccountNo}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.bankAccountNo ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.bankAccountNo && <p className="text-red-500 text-sm mt-1">{errors.bankAccountNo}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Bank Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.bankName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.bankName && <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Address Line 1</label>
          <input
            type="text"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Address Line 2 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.addressLine2 ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.addressLine2 && <p className="text-red-500 text-sm mt-1">{errors.addressLine2}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Zip Code</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {initialData ? 'Update Vendor' : 'Add Vendor'}
        </button>
      </div>
    </form>
  );
}