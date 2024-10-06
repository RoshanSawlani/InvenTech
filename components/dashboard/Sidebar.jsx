"use client"
import { BaggageClaim, BarChart4, Cable, ChevronLeft, Files, Home, ShoppingBag, ShoppingBasket, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import SubscriptionCard from './SubscriptionCard'
import SidebarDropdownLink from './SidebarDropdownLink';

export default function Sidebar() {
    const inventoryLinks = [
        {
            title:"Items",
            href:"/dashboard/inventory",
        },
        {
            title:"Item Groups",
            href:"/dashboard/inventory",
        },
        {
            title:"Inventory Adjustments",
            href:"/dashboard/inventory",
        },
    ]
    const salesLinks = [
        {
            title:"Customers",
            href:"#",
        },
        {
            title:"Sales Orders",
            href:"#",
        },
        {
            title:"Packages",
            href:"#",
        },
        {
            title:"Shipments",
            href:"#",
        },
        {
            title:"Invoices",
            href:"#",
        },
        {
            title:"Sales Reciepts",
            href:"#",
        },
        {
            title:"Payment Received",
            href:"#",
        },
        {
            title:"Sales returns",
            href:"#",
        },
        {
            title:"Credit Notes",
            href:"#",
        },
    ]
    return (
        <div className="w-60 min-h-screen bg-slate-800 text-slate-50 fixed">
            {/* top part */}
            <div className="flex flex-col">
                {/* logo */}
                <Link href="#" className="bg-slate-950 flex space-x-2 items-center py-4 px-4">
                    <ShoppingCart />
                    <span className='flex text-xl font-semibold'>Inventory</span>
                </Link>
                {/* links */}
                <nav className="flex flex-col gap-3 px-5 py-6">
                    <Link className='flex items-center space-x-2 bg-blue-600 text-slate-50 p-2 rounded-md' href="#">
                        <Home className='w-4 h-4' />
                        <span>Home</span>
                    </Link>
                    <SidebarDropdownLink items={inventoryLinks} title="Inventory" icon={BaggageClaim}/>
                    <SidebarDropdownLink items={salesLinks} title="Sales" icon={ShoppingBasket}/>
                    <button className='flex items-center space-x-2 p-2'>
                        <ShoppingBag className='w-4 h-4' />
                        <span>Purchases</span>
                    </button>
                    <Link className='flex items-center space-x-2 p-2' href="#">
                        <Cable className='w-4 h-4' />
                        <span>Integrations</span>
                    </Link>
                    <Link className='flex items-center space-x-2 p-2' href="#">
                        <BarChart4 className='w-4 h-4' />
                        <span>Reports</span>
                    </Link>
                    <Link className='flex items-center space-x-2 p-2' href="#">
                        <Files className='w-4 h-4' />
                        <span>Documents</span>
                    </Link>
                </nav>
                <SubscriptionCard />
            </div>
            {/* bottom part */}
            <div className="flex flex-col">
                <button className="bg-slate-950 flex space-x-2 items-center justify-center mt-12 py-5 px-4">
                    <ChevronLeft />
                </button>
            </div>
            {/* subscription card */}
            {/* footer icon */}
        </div>
    )
}
