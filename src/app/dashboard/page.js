"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VendorList from "../component/VendorList";
import VendorForm from "../component/VendorForm";

// Dummy vendor data
const initialVendors = [
  {
    id: 1,
    name: "ABC Corporation",
    bankAccountNo: "123456789012",
    bankName: "Chase Bank",
    addressLine1: "123 Business St",
    addressLine2: "Suite 101",
    city: "New York",
    country: "USA",
    zipCode: "10001",
  },
  {
    id: 2,
    name: "XYZ Enterprises",
    bankAccountNo: "987654321098",
    bankName: "Bank of America",
    addressLine1: "456 Commerce Ave",
    addressLine2: "Floor 5",
    city: "Los Angeles",
    country: "USA",
    zipCode: "90001",
  },
  {
    id: 3,
    name: "Global Supplies Ltd",
    bankAccountNo: "567890123456",
    bankName: "Wells Fargo",
    addressLine1: "789 Market Blvd",
    addressLine2: "Unit 300",
    city: "Chicago",
    country: "USA",
    zipCode: "60601",
  },
  {
    id: 4,
    name: "Tech Innovations Inc",
    bankAccountNo: "345678912345",
    bankName: "Citibank",
    addressLine1: "101 Innovation Way",
    addressLine2: "Building 4",
    city: "San Francisco",
    country: "USA",
    zipCode: "94105",
  },
  {
    id: 5,
    name: "Prime Solutions",
    bankAccountNo: "678901234567",
    bankName: "TD Bank",
    addressLine1: "202 Solution Drive",
    addressLine2: "Office 505",
    city: "Boston",
    country: "USA",
    zipCode: "02108",
  },
  {
    id: 6,
    name: "Nexus Systems",
    bankAccountNo: "789012345678",
    bankName: "HSBC",
    addressLine1: "303 Tech Park",
    addressLine2: "Suite 202",
    city: "Seattle",
    country: "USA",
    zipCode: "98101",
  },
  {
    id: 7,
    name: "Summit Industries",
    bankAccountNo: "890123456789",
    bankName: "PNC Bank",
    addressLine1: "404 Industrial Lane",
    addressLine2: "Building B",
    city: "Pittsburgh",
    country: "USA",
    zipCode: "15222",
  },
];

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [vendors, setVendors] = useState(initialVendors);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [vendorToDelete, setVendorToDelete] = useState(null);
  const itemsPerPage = 4;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen bg-blue-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-blue-300"></div>
          <span className="mt-2 text-blue-600 font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVendors = vendors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(vendors.length / itemsPerPage);

  const handleAddVendor = (newVendor) => {
    const vendorWithId = {
      ...newVendor,
      id: vendors.length > 0 ? Math.max(...vendors.map(v => v.id)) + 1 : 1
    };
    setVendors([...vendors, vendorWithId]);
    setIsFormOpen(false);
  };

  const handleEditVendor = (updatedVendor) => {
    setVendors(vendors.map(vendor => 
      vendor.id === updatedVendor.id ? updatedVendor : vendor
    ));
    setEditingVendor(null);
    setIsFormOpen(false);
  };

  const openEditForm = (vendor) => {
    setEditingVendor(vendor);
    setIsFormOpen(true);
  };

  const confirmDelete = (vendor) => {
    setVendorToDelete(vendor);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteVendor = () => {
    if (vendorToDelete) {
      setVendors(vendors.filter(vendor => vendor.id !== vendorToDelete.id));
      setIsDeleteModalOpen(false);
      setVendorToDelete(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      {/* Header */}
      <header className="bg-white py-4 px-6 flex justify-between items-center shadow-md border-b border-blue-100">
        <div className="flex items-center">
          <svg className="w-8 h-8 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          <h1 className="text-2xl font-bold text-blue-800">Vendor Management System</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-blue-50 px-4 py-2 rounded-full">
            <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span className="text-blue-700 font-medium">{session.user?.name || "User"}</span>
          </div>
          <button
            onClick={() => router.push("/login?signout=true")}
            className="flex items-center bg-white border border-red-400 hover:bg-red-50 text-red-500 px-4 py-2 rounded-md transition-colors duration-150"
          >
            <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Add Vendor Button */}
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-blue-800">Vendor List</h2>
            <button
              onClick={() => {
                setEditingVendor(null);
                setIsFormOpen(true);
              }}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-150 shadow-sm"
            >
              <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Add New Vendor
            </button>
          </div>

          {/* Vendor Table */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md border border-blue-100 mb-6">
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
                {currentVendors.map((vendor) => (
                  <tr key={vendor.id} className="border-b border-blue-50 hover:bg-blue-50 transition-colors duration-150">
                    <td className="py-4 px-6 text-blue-800">{vendor.name}</td>
                    <td className="py-4 px-6 text-blue-800">{vendor.bankAccountNo}</td>
                    <td className="py-4 px-6 text-blue-800">{vendor.bankName}</td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => openEditForm(vendor)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2 transition-colors duration-150 shadow-sm"
                      >
                        <span className="hidden md:inline">Edit</span>
                        <svg className="h-5 w-5 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                        </svg>
                      </button>
                      <button
                        onClick={() => confirmDelete(vendor)}
                        className="bg-white border border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded-md transition-colors duration-150 shadow-sm"
                      >
                        <span className="hidden md:inline">Delete</span>
                        <svg className="h-5 w-5 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <nav className="flex items-center bg-white px-2 py-1 rounded-md shadow-sm border border-blue-100">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 mx-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-blue-700 hover:bg-blue-50 transition-colors duration-150"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`p-2 w-10 h-10 mx-1 rounded-md flex items-center justify-center transition-colors duration-150 ${
                    currentPage === i + 1 
                      ? "bg-blue-500 text-white" 
                      : "text-blue-700 hover:bg-blue-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 mx-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-blue-700 hover:bg-blue-50 transition-colors duration-150"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </main>

      {/* Vendor Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-10 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-xl border border-blue-100 m-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-blue-800">
                {editingVendor ? "Edit Vendor" : "Add New Vendor"}
              </h2>
              <button 
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingVendor(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <VendorForm
              onSubmit={editingVendor ? handleEditVendor : handleAddVendor}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingVendor(null);
              }}
              initialData={editingVendor}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-10 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl border border-blue-100 m-4">
            <div className="flex items-center mb-4 text-red-500">
              <svg className="h-8 w-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <h2 className="text-xl font-bold">Confirm Delete</h2>
            </div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete vendor <span className="font-semibold">{vendorToDelete?.name}</span>?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteVendor}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-150"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}