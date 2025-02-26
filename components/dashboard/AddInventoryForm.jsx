"use client"
import { useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import TextInput from '@/components/FormInputs/TextInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextareaInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import { makePostRequest, makePutRequest } from '@/lib/apiRequest';

export default function AddInventoryForm({items,warehouses,suppliers,initialData,isUpdate=false}) {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues:initialData,
    });
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (isUpdate && initialData) {
            Object.keys(initialData).forEach((key) => setValue(key, initialData[key]));
        }
    }, [isUpdate, initialData, setValue]);

    async function onSubmit(data) {
        console.log(data)
        if (isUpdate) {
            makePutRequest(setLoading, `api/adjustments/${initialData.id}`, data, "StockAdjustment", reset);
        } else {
            makePostRequest(setLoading, "api/adjustments/add", data, "StockAdjustment", reset);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <TextInput label="Reference Number" name="referenceNumber" register={register} errors={errors} />
                <SelectInput name="itemId" label="Select the Item" register={register} className="w-full" options={items} />
                <SelectInput name="supplierId" label="Select the Supplier" register={register} className="w-full" options={suppliers} />
                <TextInput type='number' label="Enter Quantity of Stock to Add" name="addStockQty" register={register} errors={errors} className='w-full' />
                <SelectInput name="receivingWarehouseId" label="Select the Warehouse that will receive the Stock" register={register} className="w-full" options={warehouses} />
                <TextareaInput label="Adjustment Notes" name="notes" register={register} errors={errors} />
            </div>
            <SubmitButton isLoading={loading} title={isUpdate ? "Updated Adjustment" : "Create Adjustment"}/>
        </form>
    )
}
