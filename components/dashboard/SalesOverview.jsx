import { Check, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function SalesOverview() {
    const salesActivity = [
        {
            title: "To be Packed",
            number: 10,
            unit: "Qty",
            href: "#",
            color: "text-blue-600"
        },
        {
            title: "To be Shipped",
            number: 10,
            unit: "Pkgs",
            href: "#",
            color: "text-red-600"
        },
        {
            title: "To be Delivered",
            number: 0,
            unit: "Pkgs",
            href: "#",
            color: "text-green-600"
        },
        {
            title: "To be Invoiced",
            number: 10,
            unit: "Qty",
            href: "#",
            color: "text-orange-600"
        },
    ]
    const inventorySummary = [
        {
            title: "Quantity in Hand",
            number: 10
        },
        {
            title: "Quatity to be recieved",
            number: 0,
        }
    ]
    return (
        <div className="bg-blue-50 border-b border-slate-300  grid grid-cols-12 gap-4">
            {/* SALES Activity */}
            <div className="col-span-8 border-r border-slate-300 p-8">
                <h2 className='mb-6 text-xl'>Sales Activity</h2>
                <div className="pr-8 grid grid-cols-4 gap-4">
                    {/* card  */}
                    {
                        salesActivity.map((item, i) => {
                            return (
                                <Link href={item.href} key={i} className="shadow rounded-lg bg-white border border-slate-200 hover:border-blue-500 px-3 py-4 cursor-pointer flex items-center flex-col gap-3 transition-all duration-300">
                                    <h4 className={`font-semibold text-3xl ${item.color}`}>{item.number}</h4>
                                    <small className='text-slate-500'>{item.unit}</small>
                                    <div className="flex items-center space-x-2 text-slate-500">
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span className="uppercase text-xs">{item.title}</span>
                                    </div>
                                </Link>
                            )
                        })
                    }

                </div>
            </div>
            {/* inventory summary */}
            <div className="col-span-4 p-8">
                <h2 className="mb-6 text-xl">Inventory Summary</h2>
                <div className="">
                    {
                        inventorySummary.map((item, i) => {
                            return (
                                <div key={i} className="mb-4 shadow rounded-lg bg-white border border-slate-200 hover:border-blue-500 px-4 py-2 cursor-pointer flex items-center gap-3 justify-between transition-all duration-300">
                                    <h2 className="uppercase text-sm text-slate-500">{item.title}</h2>
                                    <h4 className="text-2xl">{item.number}</h4>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
