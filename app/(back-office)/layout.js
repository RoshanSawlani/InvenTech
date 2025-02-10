"use client"
import Header from '@/components/dashboard/Header'
import Sidebar from '@/components/dashboard/Sidebar'
import React, { useState } from 'react'

export default function Layout({children}) {
    const [showSidebar,setShowSidebar] = useState(false)
    return (
        <div className='flex'>
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
            <main className='lg:ml-60 ml-0 min-h-screen w-full bg-slate-100'>
                <Header setShowSidebar={setShowSidebar}/>
                {children}
            </main>
        </div>
    )
}
