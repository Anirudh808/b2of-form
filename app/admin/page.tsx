"use client";

import { useState, useEffect } from "react";
import { verifyLogin, logout, getRegistrations, checkAuth } from "../actions/admin";
import { useActionState } from "react";

// Types
type UserForm = {
  id: number;
  firstName: string;
  lastName: string;
  grade: string;
  schoolName: string;
  parentName: string;
  parentEmail: string | null;
  parentPhone: string;
  address: string;
  intrestedInSummerCamp: "Yes" | "No";
  createdAt: Date;
};

const loginInitialState = {
    message: "",
    success: false
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [registrations, setRegistrations] = useState<UserForm[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserForm | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  const [loginState, loginAction, isLoginPending] = useActionState(verifyLogin, loginInitialState);

  useEffect(() => {
    checkAuth().then(setIsAuthenticated);
  }, []);

  useEffect(() => {
    if (loginState?.success) {
        setIsAuthenticated(true);
    }
  }, [loginState?.success])

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    setLoading(true);
    const result = await getRegistrations();
    if (result.authorized) {
      setRegistrations(result.data as UserForm[]);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
    setRegistrations([]);
  };

  const handleRowClick = (user: UserForm) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  if (isAuthenticated === null) {
      return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h1>
          <form action={loginAction} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input name="username" type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-black focus:border-black" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input name="password" type="password" className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-black focus:border-black" required />
            </div>
            <button disabled={isLoginPending} type="submit" className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 transition-colors">
              {isLoginPending ? "Logging in..." : "Login"}
            </button>
            {loginState?.message && !loginState.success && <p className="text-red-500 text-sm text-center">{loginState.message}</p>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Registrations Dashboard</h1>
          <button onClick={handleLogout} className="bg-red-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded text-sm hover:bg-red-700 transition">Logout</button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {loading ? (
             <div className="p-6 md:p-8 text-center text-gray-500 text-sm md:text-base">Loading registrations...</div>
          ) : registrations.length === 0 ? (
            <div className="p-6 md:p-8 text-center text-gray-500 text-sm md:text-base">No registrations found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 md:px-6 py-2 md:py-3 text-left text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-3 md:px-6 py-2 md:py-3 text-left text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider">Child Name</th>
                    <th scope="col" className="px-3 md:px-6 py-2 md:py-3 text-left text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Grade</th>
                    <th scope="col" className="px-3 md:px-6 py-2 md:py-3 text-left text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Parent</th>
                    <th scope="col" className="px-3 md:px-6 py-2 md:py-3 text-left text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th scope="col" className="px-3 md:px-6 py-2 md:py-3 text-left text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Summer Camp</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {registrations.map((reg) => (
                    <tr 
                      key={reg.id} 
                      onClick={() => handleRowClick(reg)}
                      className="hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                        {new Date(reg.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">
                        {reg.firstName} {reg.lastName}
                      </td>
                       <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 hidden sm:table-cell">
                        {reg.grade}
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 hidden md:table-cell">
                        {reg.parentName}
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                        <div>{reg.parentPhone}</div>
                        <div className="text-[10px] md:text-xs">{reg.parentEmail}</div>
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 hidden lg:table-cell">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${reg.intrestedInSummerCamp === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {reg.intrestedInSummerCamp}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-3 md:p-4 z-50 overflow-y-auto" onClick={closeModal}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full my-4 max-h-[85vh] md:max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h2 className="text-lg md:text-2xl font-bold text-gray-900">Registration Details</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-2xl md:text-3xl leading-none">&times;</button>
              </div>

              <div className="space-y-4 md:space-y-6">
                {/* Kids Information */}
                <div>
                  <h3 className="text-base md:text-lg font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-3 md:mb-4">Kids Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-500">First Name</label>
                      <p className="mt-1 text-sm md:text-base text-gray-900">{selectedUser.firstName}</p>
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-500">Last Name</label>
                      <p className="mt-1 text-sm md:text-base text-gray-900">{selectedUser.lastName}</p>
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-500">Grade</label>
                      <p className="mt-1 text-sm md:text-base text-gray-900">{selectedUser.grade}</p>
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-500">School Name</label>
                      <p className="mt-1 text-sm md:text-base text-gray-900">{selectedUser.schoolName}</p>
                    </div>
                  </div>
                </div>

                {/* Parent Information */}
                <div>
                  <h3 className="text-base md:text-lg font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-3 md:mb-4">Parent Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-500">Parent Name</label>
                      <p className="mt-1 text-sm md:text-base text-gray-900">{selectedUser.parentName}</p>
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-500">Phone Number</label>
                      <p className="mt-1 text-sm md:text-base text-gray-900">{selectedUser.parentPhone}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs md:text-sm font-medium text-gray-500">Email ID</label>
                      <p className="mt-1 text-sm md:text-base text-gray-900">{selectedUser.parentEmail || 'N/A'}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs md:text-sm font-medium text-gray-500">Address</label>
                      <p className="mt-1 text-sm md:text-base text-gray-900">{selectedUser.address}</p>
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-500">Interested in Summer Camp</label>
                      <p className="mt-1">
                        <span className={`px-2 md:px-3 py-1 inline-flex text-xs md:text-sm font-semibold rounded-full ${selectedUser.intrestedInSummerCamp === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {selectedUser.intrestedInSummerCamp}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 md:mt-8 flex justify-end">
                <button onClick={closeModal} className="bg-gray-900 text-white px-4 md:px-6 py-2 rounded-md text-sm md:text-base hover:bg-gray-800 transition-colors">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

