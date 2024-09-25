import HomeNavbar from '@/components/dashboard/HomeNavbar'
import React from 'react'

export default function layout({children}) {
    return (
        <div className=''>
            <HomeNavbar/>
            {children}
        </div>
    )
}
