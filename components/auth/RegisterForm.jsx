"use client";

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function RegisterForm() {
    const router = useRouter();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false)
    const [emailErr, setEmailErr] = useState("")
    console.log(emailErr)

    async function onSubmit(data) {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
            setLoading(true)
            const response = await fetch(`${baseUrl}/api/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const responseData = await response.json()
            if (response.ok) {
                setLoading(false)
                toast.success("User Created Successfully")
                reset()
                router.push("/login")
            } else {
                if (response.status === 409) {
                    setEmailErr("Email already exists")
                    toast.error("Email already exists")
                } else {
                    // Handle other errors
                    console.error("Server Error: ", responseData.message)
                    toast.error("Oops! Something went wrong")
                }
            }
        } catch (error) {
            setLoading(false)
            console.error("Network Error: ", error)
            toast.error("Something went wrong, Please try again")
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                <input {...register("name", { required: true })} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required="" />
                {errors.name && (
                    <small className='text-red-600 text-sm'>
                        This field is required
                    </small>
                )}
            </div>
            <div>
                <label htmlFor="Email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                <input {...register("email", { required: true })} type="email" name="email" id="email" placeholder="name@company.com" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                {errors.email && (
                    <small className='text-red-600 text-sm'>
                        This field is required
                    </small>
                )}
                <small className='text-red-600 text-sm'>{emailErr}</small>
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input {...register("password", { required: true })} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                {errors.password && (
                    <small className='text-red-600 text-sm'>
                        This field is required
                    </small>
                )}
            </div>
            {loading ? (
                <button
                disabled
                type="button"
                className="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center"
            >
                <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.0815 50.5908C9.0815 73.1855 27.4053 91.5093 50 91.5093C72.5947 91.5093 90.9185 73.1855 90.9185 50.5908C90.9185 27.9961 72.5947 9.6723 50 9.6723C27.4053 9.6723 9.0815 27.9961 9.0815 50.5908Z"
                        fill="#E5E7EB"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3691 89.8167 20.348C86.7616 16.3255 83.1122 12.7877 79.0305 9.89545C74.9401 7.00131 70.4673 4.79622 65.7915 3.38116C61.1162 1.96662 56.2763 1.36738 51.4303 1.59808C46.5843 1.82891 41.7952 2.88657 37.313 4.73041C32.8323 6.57488 28.7191 9.16432 25.1345 12.3878C21.5482 15.611 18.5483 19.4182 16.2388 23.6438C13.9289 27.8688 12.3475 32.4501 11.5626 37.164C10.777 41.8775 10.7955 46.6586 11.6172 51.3498C12.4387 56.0406 14.0499 60.5754 16.378 64.7861C18.7072 68.9965 21.7222 72.8144 25.2986 76.0965C28.8734 79.3783 32.9612 82.0758 37.3716 84.0751C41.7822 86.0741 46.4483 87.3404 51.1978 87.8202C55.947 88.2999 60.731 87.9875 65.3754 86.8974C70.0203 85.8071 74.4627 83.9553 78.4969 81.4109C82.5312 78.8663 86.0889 75.6724 89.0406 71.9728C91.9924 68.2732 94.3027 64.1192 95.8825 59.6571C96.6878 57.3647 95.0092 54.9254 92.5738 54.2886C90.1391 53.6521 87.7068 55.3328 86.9022 57.6243C85.644 61.3057 83.5479 64.7089 80.7661 67.5818C77.9841 70.4545 74.5817 72.7239 70.8574 74.2264C67.1337 75.7286 63.1843 76.425 59.2183 76.2596C55.2522 76.094 51.3414 75.0696 47.7188 73.253C44.0959 71.4363 40.8397 68.8708 38.1582 65.7006C35.4764 62.5302 33.4168 58.8195 32.0953 54.829C30.7735 50.8383 30.2171 46.6405 30.4515 42.4482C30.6856 38.2554 31.7079 34.1287 33.458 30.2996C35.2076 26.4702 37.6513 22.9976 40.6738 20.0913C43.697 17.1845 47.2298 14.8997 51.063 13.3678C54.8962 11.8353 58.9632 11.0784 63.0736 11.1408C67.1841 11.2033 71.2544 12.0833 75.0955 13.7398C78.9367 15.3964 82.4777 17.7986 85.5428 20.8296C88.6078 23.8604 91.1447 27.461 93.0402 31.4189C94.9359 35.3766 96.162 39.6183 96.6785 44.0135C97.1952 48.4089 96.9897 52.8635 96.0716 57.2057C95.6665 59.1797 96.9453 61.1701 98.9193 61.5754C100.893 61.9806 102.883 60.7015 103.288 58.7275C104.39 53.4811 104.431 48.1009 103.409 42.7854C102.387 37.4697 100.316 32.3481 97.3285 27.7026C94.3413 23.057 90.5021 18.977 86.0445 15.7136C81.5871 12.4501 76.6001 10.0701 71.3095 8.70377C66.0187 7.33769 60.5282 7.0116 55.0966 7.74841C49.665 8.48525 44.3804 10.2736 39.5685 13.0187C34.7563 15.7638 30.5157 19.4176 27.0877 23.8334C23.6594 28.2492 21.1071 33.356 19.5824 38.8611C18.0577 44.3661 17.5924 50.1615 18.2142 55.9025C18.8361 61.6433 20.5334 67.2391 23.2033 72.3031C25.873 77.3668 29.4552 81.7987 33.7326 85.3795C38.0103 88.9601 42.8813 91.6075 48.0897 93.1879C53.298 94.7684 58.727 95.2569 64.1256 94.6295C69.5242 94.002 74.8163 92.2641 79.6517 89.5244C84.4875 86.7843 88.7808 83.1087 92.2896 78.7361C95.7985 74.3633 98.4439 69.3663 100.078 64.0177C101.711 58.669 101.295 53.0021 99.8671 47.5964C98.4395 42.1904 96.0581 37.218 93.9676 39.0409Z"
                        fill="currentColor"
                    />
                </svg>
                Creating, please wait...
            </button>
            
            ) : (
                <button
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Sign Up
                </button>
            )}
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? {" "} <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</a>
            </p>
        </form>
    )
}
