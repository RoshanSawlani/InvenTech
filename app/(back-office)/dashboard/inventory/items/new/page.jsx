"use client"

import { useForm } from 'react-hook-form'
import FormHeader from '@/components/dashboard/FormHeader'
import React, { useState } from 'react'
import TextInput from '@/components/FormInputs/TextInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextareaInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import { UploadDropzone } from '@/lib/uploadthing';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import ImageInput from '@/components/FormInputs/ImageInput';

export default function NewItem() {
    const [imageUrl, setImageUrl] = useState("")
    const categories = [
        {
            label: "Electronics",
            value: "aeriry8890wra7ew87"
        },
        {
            label: "Clothes",
            value: "asdaawd45dw98"
        },
    ]
    const units = [
        {
            label: "Kg",
            value: "aerasdiry8890wra7ew87"
        },
        {
            label: "Pcs",
            value: "asdazcacbasewaawd45dw98"
        },
    ]
    const brands = [
        {
            label: "HP",
            value: "aera65454sdiry8890wra7ew87"
        },
        {
            label: "Dell",
            value: "asdazca5161616cbasewaawd45dw98"
        },
    ]
    const warehouses = [
        {
            label: "Warehouse A",
            value: "asdjkawsd65654ad"
        },
        {
            label: "Warehouse B",
            value: "asdjkawsd65asd654ad"
        },
        {
            label: "Warehouse C",
            value: "asdjkawsd6565asd4ad"
        },
    ]
    const suppliers = [
        {
            label: "Supplier A",
            value: "asdjkawsd65a654ad"
        },
        {
            label: "Supplier B",
            value: "asdjkawsd65dasd654ad"
        },
        {
            label: "Supplier C",
            value: "asdjkawsd65f65asd4ad"
        },
    ]
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false)

    async function onSubmit(data) {
        data.imageUrl = imageUrl
        console.log(data)
        setLoading(true)
        const baseUrl = "http://localhost:3004"
        try {
            const response = await fetch(`${baseUrl}/api/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                console.log(response)
                setLoading(false)
                reset()
            }

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <div>
            {/* Header */}
            <FormHeader title="New Item" href="/dashboard/inventory/" />
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <TextInput label="Warehouse Title" name="title" register={register} errors={errors} className='w-full' />
                    <SelectInput name="categoryId" label="Select the Item Category" register={register} className="w-full" options={categories} />
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
                    <ImageInput label="Item Image" imageUrl={imageUrl} setImageUrl={setImageUrl} endpoint = "imageUploader" />
                </div>
                <SubmitButton isLoading={loading} title="Item" />
            </form>
        </div>
    )
}
