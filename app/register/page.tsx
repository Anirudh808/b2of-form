"use client";

import { useActionState } from "react";
import { registerUser } from "../actions/register";
import { useEffect, useRef } from "react";
import Image from "next/image";

const initialState = {
  message: "",
  errors: {},
};

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerUser, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      alert("Registration Successful!");
    }
  }, [state?.success]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-xl rounded-lg border-t-8 border-gray-800">
        
        {/* Header Section */}
        <div className="text-center mb-10 relative">
            <div className="absolute top-0 right-0 p-2 border border-gray-800 rounded-full w-24 h-24 flex items-center justify-center text-xs text-center transform rotate-12 bg-white shadow-sm">
                <div className="flex flex-col">
                    <span className="font-bold">REGISTRATION</span>
                    <span className="font-bold">FEE</span>
                    <span className="text-gray-600">Rs. 200/ Kid</span>
                </div>
            </div>

            <div className="flex justify-center items-center gap-4 mb-4">
               {/* Logo Placeholder */}
                {/* <div className="w-32 h-16 bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-400 rounded">
                    <span className="text-gray-500 text-sm font-bold">LOGO HERE</span>
                </div> */}
								<Image src="/B2of-Logo-file-registered_black.png" alt="Logo" width={100} height={100} />
            </div>
            
            <h1 className="text-2xl font-bold uppercase tracking-wider text-gray-800 mb-1">Registration Form</h1>
            <h2 className="text-xl font-bold text-gray-700 mb-1">OOH-LA-LA CARNIVAL</h2>
            <p className="text-gray-600 font-semibold">FEBRUARY (06, 07, 08.02.2026)</p>
        </div>

        <form action={formAction} ref={formRef} className="space-y-6">
          
          {/* Kids Information */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wide border-b-2 border-gray-200 pb-2 mb-6 text-center">Kids Information</h3>
            <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-center">
                    <label htmlFor="firstName" className="sm:col-span-2 font-medium text-gray-700">First Name :</label>
                    <div className="sm:col-span-4">
                        <input type="text" name="firstName" id="firstName" required className="w-full border-b border-gray-300 focus:border-black outline-hidden py-1 px-2 bg-transparent transition-colors" />
                        {state?.errors?.firstName && <p className="text-red-500 text-sm mt-1">{state.errors.firstName}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-center">
                    <label htmlFor="lastName" className="sm:col-span-2 font-medium text-gray-700">Last Name :</label>
                    <div className="sm:col-span-4">
                        <input type="text" name="lastName" id="lastName" required className="w-full border-b border-gray-300 focus:border-black outline-hidden py-1 px-2 bg-transparent transition-colors" />
                         {state?.errors?.lastName && <p className="text-red-500 text-sm mt-1">{state.errors.lastName}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-center">
                    <label htmlFor="grade" className="sm:col-span-2 font-medium text-gray-700">Grade :</label>
                    <div className="sm:col-span-4">
                         <input type="text" name="grade" id="grade" required className="w-full border-b border-gray-300 focus:border-black outline-hidden py-1 px-2 bg-transparent transition-colors" />
                         {state?.errors?.grade && <p className="text-red-500 text-sm mt-1">{state.errors.grade}</p>}
                    </div>
                </div>
                
                 <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-center">
                    <label htmlFor="schoolName" className="sm:col-span-2 font-medium text-gray-700">School Name :</label>
                    <div className="sm:col-span-4">
                        <input type="text" name="schoolName" id="schoolName" required className="w-full border-b border-gray-300 focus:border-black outline-hidden py-1 px-2 bg-transparent transition-colors" />
                         {state?.errors?.schoolName && <p className="text-red-500 text-sm mt-1">{state.errors.schoolName}</p>}
                    </div>
                </div>
            </div>
          </div>

          {/* Parent Information */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wide border-b-2 border-gray-200 pb-2 mb-6 text-center">Parent Information</h3>
            <div className="space-y-4">
                 <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-center">
                    <label htmlFor="parentName" className="sm:col-span-2 font-medium text-gray-700">Parent Name :</label>
                    <div className="sm:col-span-4">
                         <input type="text" name="parentName" id="parentName" required className="w-full border-b border-gray-300 focus:border-black outline-hidden py-1 px-2 bg-transparent transition-colors" />
                         {state?.errors?.parentName && <p className="text-red-500 text-sm mt-1">{state.errors.parentName}</p>}
                    </div>
                </div>

                 <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-center">
                    <label htmlFor="parentPhone" className="sm:col-span-2 font-medium text-gray-700">Phone Number :</label>
                    <div className="sm:col-span-4">
                        <input type="text" name="parentPhone" id="parentPhone" required className="w-full border-b border-gray-300 focus:border-black outline-hidden py-1 px-2 bg-transparent transition-colors" />
                         {state?.errors?.parentPhone && <p className="text-red-500 text-sm mt-1">{state.errors.parentPhone}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-center">
                    <label htmlFor="parentEmail" className="sm:col-span-2 font-medium text-gray-700">Email ID (Optional) :</label>
                    <div className="sm:col-span-4">
                         <input type="email" name="parentEmail" id="parentEmail" className="w-full border-b border-gray-300 focus:border-black outline-hidden py-1 px-2 bg-transparent transition-colors" />
                         {state?.errors?.parentEmail && <p className="text-red-500 text-sm mt-1">{state.errors.parentEmail}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-start">
                    <label htmlFor="address" className="sm:col-span-2 font-medium text-gray-700">Address with Pincode :</label>
                    <div className="sm:col-span-4">
                        <textarea name="address" id="address" rows={3} required className="w-full border border-gray-300 focus:border-black rounded-md outline-hidden p-2 bg-transparent transition-colors"></textarea>
                         {state?.errors?.address && <p className="text-red-500 text-sm mt-1">{state.errors.address}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-center">
                    <label className="sm:col-span-2 font-medium text-gray-700">Interested in Summer Camp :</label>
                    <div className="sm:col-span-4 flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="intrestedInSummerCamp" value="Yes" required className="w-4 h-4 text-black focus:ring-black" />
                            <span>Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="intrestedInSummerCamp" value="No" required className="w-4 h-4 text-black focus:ring-black" />
                            <span>No</span>
                        </label>
                    </div>
                     {state?.errors?.intrestedInSummerCamp && <p className="text-red-500 text-sm mt-1 col-span-full text-right">{state.errors.intrestedInSummerCamp}</p>}
                </div>

            </div>
          </div>

          <div className="pt-6 text-center">
             <button disabled={isPending} type="submit" className="bg-gray-900 text-white px-8 py-3 rounded-md font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {isPending ? "Registering..." : "Submit Registration"}
             </button>
             {state?.message && !state.success && <p className="text-red-500 mt-4 font-semibold">{state.message}</p>}
             {state?.success && <p className="text-green-600 mt-4 font-semibold">{state.message}</p>}
          </div>

        </form>
      </div>
    </div>
  );
}
