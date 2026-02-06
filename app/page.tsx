"use client";

import { useActionState } from "react";
import { registerUser } from "./actions/register";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const initialState = {
  message: "",
  errors: {},
};

export default function Home() {
  const [state, formAction, isPending] = useActionState(registerUser, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      alert("Registration Successful!");
    }
  }, [state?.success]);

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8 font-sans relative">
      {/* Admin Login Button - Positioned to not overlap form */}
      <Link href="/admin" className="top-3 right-3 md:top-4 md:right-4 bg-gray-100 text-slate-800 px-3 py-1.5 md:px-4 md:py-2 rounded-md text-xs md:text-sm font-medium hover:bg-gray-300 transition-colors shadow-sm z-10">
        Admin
      </Link>

      {/* Add top margin to prevent overlap with admin button */}
      <div className="max-w-3xl mx-auto bg-white p-4 sm:p-6 md:p-8 shadow-xl rounded-lg border-t-4 md:border-t-8 border-gray-800 mt-12 md:mt-0">
        
        {/* Header Section */}
        <div className="text-center mb-6 md:mb-10 relative">

            <div className="flex justify-center items-center gap-4 mb-3 md:mb-4">
               {/* Logo */}
                <Image src="/B2of-Logo-file-registered_black.png" alt="Logo" width={300} height={100} />
            </div>
            
            <h1 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-gray-800 mb-1">Registration Form</h1>
            <h2 className="text-lg md:text-xl font-bold text-gray-700 mb-1">OOH-LA-LA CARNIVAL</h2>
            <p className="text-sm md:text-base text-gray-600 font-semibold">FEBRUARY (06, 07, 08.02.2026)</p>
        </div>

        <form action={formAction} ref={formRef} className="space-y-4 md:space-y-6">
          
          {/* Kids Information */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-base md:text-lg font-bold text-gray-800 uppercase tracking-wide border-b-2 border-gray-200 pb-2 mb-4 md:mb-6 text-center">Kids Information</h3>
            <div className="space-y-3 md:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-6 gap-2 md:gap-4 items-center">
                    <label htmlFor="firstName" className="sm:col-span-2 font-medium text-gray-700 text-sm md:text-base">First Name :</label>
                    <div className="sm:col-span-4">
                        <input type="text" name="firstName" id="firstName" required className="w-full border-b border-gray-300 focus:border-black outline-none py-1 px-2 bg-transparent transition-colors text-sm md:text-base" />
                        {state?.errors?.firstName && <p className="text-red-500 text-xs md:text-sm mt-1">{state.errors.firstName}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-6 gap-2 md:gap-4 items-center">
                    <label htmlFor="lastName" className="sm:col-span-2 font-medium text-gray-700 text-sm md:text-base">Last Name :</label>
                    <div className="sm:col-span-4">
                        <input type="text" name="lastName" id="lastName" required className="w-full border-b border-gray-300 focus:border-black outline-none py-1 px-2 bg-transparent transition-colors text-sm md:text-base" />
                         {state?.errors?.lastName && <p className="text-red-500 text-xs md:text-sm mt-1">{state.errors.lastName}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-6 gap-2 md:gap-4 items-center">
                    <label htmlFor="grade" className="sm:col-span-2 font-medium text-gray-700 text-sm md:text-base">Grade :</label>
                    <div className="sm:col-span-4">
                         <input type="text" name="grade" id="grade" required className="w-full border-b border-gray-300 focus:border-black outline-none py-1 px-2 bg-transparent transition-colors text-sm md:text-base" />
                         {state?.errors?.grade && <p className="text-red-500 text-xs md:text-sm mt-1">{state.errors.grade}</p>}
                    </div>
                </div>
                
                 <div className="grid grid-cols-1 sm:grid-cols-6 gap-2 md:gap-4 items-center">
                    <label htmlFor="schoolName" className="sm:col-span-2 font-medium text-gray-700 text-sm md:text-base">School Name :</label>
                    <div className="sm:col-span-4">
                        <input type="text" name="schoolName" id="schoolName" required className="w-full border-b border-gray-300 focus:border-black outline-none py-1 px-2 bg-transparent transition-colors text-sm md:text-base" />
                         {state?.errors?.schoolName && <p className="text-red-500 text-xs md:text-sm mt-1">{state.errors.schoolName}</p>}
                    </div>
                </div>
            </div>
          </div>

          {/* Parent Information */}
          <div>
            <h3 className="text-base md:text-lg font-bold text-gray-800 uppercase tracking-wide border-b-2 border-gray-200 pb-2 mb-4 md:mb-6 text-center">Parent Information</h3>
            <div className="space-y-3 md:space-y-4">
                 <div className="grid grid-cols-1 sm:grid-cols-6 gap-2 md:gap-4 items-center">
                    <label htmlFor="parentName" className="sm:col-span-2 font-medium text-gray-700 text-sm md:text-base">Parent Name :</label>
                    <div className="sm:col-span-4">
                         <input type="text" name="parentName" id="parentName" required className="w-full border-b border-gray-300 focus:border-black outline-none py-1 px-2 bg-transparent transition-colors text-sm md:text-base" />
                         {state?.errors?.parentName && <p className="text-red-500 text-xs md:text-sm mt-1">{state.errors.parentName}</p>}
                    </div>
                </div>

                 <div className="grid grid-cols-1 sm:grid-cols-6 gap-2 md:gap-4 items-center">
                    <label htmlFor="parentPhone" className="sm:col-span-2 font-medium text-gray-700 text-sm md:text-base">Phone Number :</label>
                    <div className="sm:col-span-4">
                        <input type="text" name="parentPhone" id="parentPhone" required className="w-full border-b border-gray-300 focus:border-black outline-none py-1 px-2 bg-transparent transition-colors text-sm md:text-base" />
                         {state?.errors?.parentPhone && <p className="text-red-500 text-xs md:text-sm mt-1">{state.errors.parentPhone}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-6 gap-2 md:gap-4 items-center">
                    <label htmlFor="parentEmail" className="sm:col-span-2 font-medium text-gray-700 text-sm md:text-base">Email ID (Optional) :</label>
                    <div className="sm:col-span-4">
                         <input type="email" name="parentEmail" id="parentEmail" className="w-full border-b border-gray-300 focus:border-black outline-none py-1 px-2 bg-transparent transition-colors text-sm md:text-base" />
                         {state?.errors?.parentEmail && <p className="text-red-500 text-xs md:text-sm mt-1">{state.errors.parentEmail}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-6 gap-2 md:gap-4 items-start">
                    <label htmlFor="address" className="sm:col-span-2 font-medium text-gray-700 text-sm md:text-base">Address with Pincode :</label>
                    <div className="sm:col-span-4">
                        <textarea name="address" id="address" rows={3} required className="w-full border border-gray-300 focus:border-black rounded-md outline-none p-2 bg-transparent transition-colors text-sm md:text-base"></textarea>
                         {state?.errors?.address && <p className="text-red-500 text-xs md:text-sm mt-1">{state.errors.address}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-6 gap-2 md:gap-4 items-center">
                    <label className="sm:col-span-2 font-medium text-gray-700 text-sm md:text-base">Interested in Summer Camp :</label>
                    <div className="sm:col-span-4 flex gap-4 md:gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="intrestedInSummerCamp" value="Yes" required className="w-4 h-4 text-black focus:ring-black" />
                            <span className="text-sm md:text-base">Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="intrestedInSummerCamp" value="No" required className="w-4 h-4 text-black focus:ring-black" />
                            <span className="text-sm md:text-base">No</span>
                        </label>
                    </div>
                     {state?.errors?.intrestedInSummerCamp && <p className="text-red-500 text-xs md:text-sm mt-1 col-span-full text-right">{state.errors.intrestedInSummerCamp}</p>}
                </div>

            </div>
          </div>

          <div className="pt-4 md:pt-6 text-center">
             <button disabled={isPending} type="submit" className="bg-gray-900 text-white px-6 py-2 md:px-8 md:py-3 rounded-md text-sm md:text-base font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto">
              {isPending ? "Registering..." : "Submit Registration"}
             </button>
             {state?.message && !state.success && <p className="text-red-500 mt-3 md:mt-4 font-semibold text-sm md:text-base">{state.message}</p>}
             {state?.success && <p className="text-green-600 mt-3 md:mt-4 font-semibold text-sm md:text-base">{state.message}</p>}
          </div>

        </form>
      </div>
    </div>
  );
}
