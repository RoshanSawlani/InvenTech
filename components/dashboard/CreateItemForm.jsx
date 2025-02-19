"use client"

import { useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import TextInput from '@/components/FormInputs/TextInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextareaInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import ImageInput from '@/components/FormInputs/ImageInput';
import { makePostRequest, makePutRequest } from '@/lib/apiRequest';
import { useRouter } from 'next/navigation';


export default function CreateItemForm({ units, brands, warehouses,initialData = {}, isUpdate=false }) {

    const [imageUrl, setImageUrl] = useState(initialData.imageUrl)
    const router = useRouter()
    const {
        register,   
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues:initialData
    });
    const [loading, setLoading] = useState(false)
    const [suppliers, setSuppliers] = useState([]);  // State to store the suppliers
    const [loadingSuppliers, setLoadingSuppliers] = useState(true);  // Loading state for suppliers
    const [categories, setCategories] = useState([]); // Assuming you already have this for categories
    const [loadingCategories, setLoadingCategories] = useState(true); 

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await fetch('/api/suppliers');  // Replace with your API URL for suppliers
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();  // Parse the JSON response
                setSuppliers(data);  // Update the suppliers state
                setLoadingSuppliers(false);  // Set loading to false once data is fetched
            } catch (error) {
                console.error('Error fetching suppliers:', error);
                setLoadingSuppliers(false);   // Handle error gracefully and set loading to false
            }
        };

        fetchSuppliers();  // Call the function to fetch suppliers when component mounts
    }, []);  // Empty dependency array to run the effect only once

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories');  // Replace with your API URL
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();  // Parse the JSON response
                setCategories(data);
                setLoadingCategories(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setLoadingCategories(false); // Handle error gracefully
            }
        };
        fetchCategories();
    }, []);

    function redirect(){
        router.push("/dashboard/inventory/items")
    }

    async function onSubmit(data) {
        data.imageUrl = imageUrl
        console.log(data)
        if(isUpdate){
            // update request
            makePutRequest(setLoading,`api/items/${initialData.id}`,data,"Item",redirect,reset)
        }else{
            makePostRequest(setLoading, 'api/items', data, "Item", reset)
            setImageUrl("")
        }
        
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <TextInput label="Warehouse Title" name="title" register={register} errors={errors} className='w-full' />
                <SelectInput name="categoryId" label="Select the Item Category" register={register} className="w-full" options={categories || []} />
                <TextInput label="Item SKU" name="sku" register={register} errors={errors} className="w-full" />
                <TextInput label="Item Barcode" name="barcode" register={register} errors={errors} className="w-full" />
                <TextInput label="Item Quantity" name="qty" register={register} errors={errors} className="w-full" />
                <SelectInput name="unitId" label="Select the Item Unit" register={register} className="w-full" options={units} />
                <SelectInput name="brandId" label="Select the Item Brand" register={register} className="w-full" options={brands} />
                <TextInput label="Buying Price" type="number" name="buyingPrice" register={register} errors={errors} className="w-full" />
                <TextInput label="Selling Price" type="number" name="sellingPrice" register={register} errors={errors} className="w-full" />
                <SelectInput name="supplierId" label="Select the Item Supplier" register={register} className="w-full" options={suppliers} />
                <TextInput label="Re-Order Point" type="number" name="reOrderPoint" register={register} errors={errors} className="w-full" />
                <SelectInput name="warehouseId" label="Select the Item Warehouse" register={register} className="w-full" options={warehouses} />
                <TextInput label="Item Weight in Kgs" type="number" name="weight" register={register} errors={errors} className="w-full" />
                <TextInput label="Item Dimensions in cm (20 x 30 x 100)" name="dimensions" register={register} errors={errors} className="w-full" />
                <TextInput label="Item Tax Rate in %" type="number" name="taxRate" register={register} errors={errors} className="w-full" />
                <TextareaInput label="Item Description" name="description" register={register} errors={errors} />
                <TextareaInput label="Item Notes" name="notes" register={register} errors={errors} />
                <ImageInput label="Item Image" imageUrl={imageUrl} setImageUrl={setImageUrl} endpoint="imageUploader" />
            </div>
            <SubmitButton isLoading={loading} title={isUpdate ? "Update Item" : "New Item"} />
        </form>
    )
}
