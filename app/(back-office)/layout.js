import Header from '@/components/dashboard/Header'
import React from 'react'

export default function Layout({children}) {
    return (
        <div className='flex'>
            <div className="w-56 min-h-screen bg-slate-900 text-slate-50">
                sidebar
            </div>
            <main className='min-h-screen w-full bg-slate-100'>
                <Header/>
                {children}
            </main>
        </div>
    )
}
