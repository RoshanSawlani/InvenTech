"use client"
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import TextInput from '@/components/FormInputs/TextInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextareaInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import { makePostRequest } from '@/lib/apiRequest';

export default function AddInventoryForm() {
    const branches = [
        {
            label: "Branch A",
            value: "asdasd45498ad"
        },
        {
            label: "Branch B",
            value: "qwerwqedqasd7574asdasD"
        },
        {
            label: "Main A",
            value: "qwerwqedqasdasd7574asdasD"
        },
        {
            label: "Main B",
            value: "qwerwasdqedqasd7574asdasD"
        },
    ]
    const items = [
        {
            label: "Item C",
            value: "qwerwqedqasd7574asdasD"
        },
        {
            label: "Item A",
            value: "qwerwqedqasdasd7574asdasD"
        },
        {
            label: "Item B",
            value: "qwerwasdqedqasd7574asdasD"
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
        console.log(data)
        makePostRequest(setLoading,'api/adjustments/add',data,"StockAdjustment",reset)
        
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <TextInput type='number' label="Reference Number" name="referenceNumber" register={register} errors={errors} className='w-full'/>
                <SelectInput name="itemId" label="Select the Item" register={register} className="w-full" options={items} />
                <TextInput type='number' label="Enter Quantity of Stock to Add" name="addStockQty" register={register} errors={errors} className='w-full' />
                <SelectInput name="receivingWarehouseId" label="Select the Warehouse that will receive the Stock" register={register} className="w-full" options={branches} />
                <TextareaInput label="Adjustment Notes" name="notes" register={register} errors={errors} />
            </div>
            <SubmitButton isLoading={loading} title="Adjustment" />
        </form>
    )
}
