
import React from 'react';

export default function VendorList({ vendors, onEdit, onDelete }) {
  if (vendors.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center text-blue-600 border border-blue-100">
        No vendors found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md border border-blue-100">
      <table className="min-w-full">
        <thead className="bg-blue-50 border-b border-blue-100">
          <tr>
            <th className="py-4 px-6 text-left font-semibold text-blue-700">Vendor Name</th>
            <th className="py-4 px-6 text-left font-semibold text-blue-700">Bank Account No.</th>
            <th className="py-4 px-6 text-left font-semibold text-blue-700">Bank Name</th>
            <th className="py-4 px-6 text-center font-semibold text-blue-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id} className="border-b border-blue-50 hover:bg-blue-50 transition-colors duration-150">
              <td className="py-4 px-6 text-blue-800">{vendor.name}</td>
              <td className="py-4 px-6 text-blue-800">{vendor.bankAccountNo}</td>
              <td className="py-4 px-6 text-blue-800">{vendor.bankName}</td>
              <td className="py-4 px-6 text-center">
                <button
                  onClick={() => onEdit(vendor)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2 transition-colors duration-150 shadow-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(vendor)}
                  className="bg-white border border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded-md transition-colors duration-150 shadow-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}