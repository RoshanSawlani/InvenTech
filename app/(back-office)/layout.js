import Header from '@/components/dashboard/Header'
import Sidebar from '@/components/dashboard/Sidebar'
import React from 'react'

export default function Layout({children}) {
    return (
        <div className='flex'>
            <Sidebar/>
            <main className='sm:ml-60 ml-0 min-h-screen w-full bg-slate-100'>
                <Header/>
                {children}
            </main>
        </div>
    )
}
