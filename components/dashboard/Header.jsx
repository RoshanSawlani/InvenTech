"use client";
import { AlignJustify, BellDot, ChevronDown, History, LayoutGrid, Plus, Settings, Users } from 'lucide-react';
import React from 'react';
import SearchInput from './SearchInput';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { generateInitials } from '@/lib/generateInitials';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Login from '@/app/login/page';


export default function Header({ setShowSidebar }) {
    const { data: session, status } = useSession();
    

    if (status === 'loading') {
        return <p>Loading user...</p>;
    }
    if (status === "unauthenticated") {
        return <Login/>
    }

    const username = session?.user?.name.split(' ')[0] ?? "";
    const initials = generateInitials(session?.user?.name);

    return (
        <div className='bg-gray-100 h-12 flex items-center justify-between px-8 border-b border-slate-200 shadow'>
            <button className="lg:hidden" onClick={() => setShowSidebar(true)}>
                <AlignJustify className="h-6 w-6" />
            </button>

            <div className="flex gap-3">
                {/* Recent activities */}
                <button className="hidden lg:block">
                    <History className='w-6 h-6 ' />
                </button>
                {/* Search */}
                <SearchInput />
            </div>

            {/* Right-side Icons */}
            <div className="flex items-center gap-3">
                <div className="flex gap-3 items-center">
                    {/* Plus icon */}
                    <button className='p-1 rounded-lg bg-blue-600'>
                        <Plus className='text-slate-50 w-4 h-4' />
                    </button>
                    {/* Users */}
                    <button className='p-1 rounded-lg hover:bg-slate-100'>
                        <Users className='text-slate-900 w-4 h-4' />
                    </button>
                    {/* Bell Notifications */}
                    <button className='p-1 rounded-lg hover:bg-slate-100'>
                        <BellDot className='text-slate-900 w-4 h-4' />
                    </button>
                    {/* Settings */}
                    <button className='p-1 rounded-lg hover:bg-slate-100'>
                        <Settings className='text-slate-900 w-4 h-4' />
                    </button>

                    {/* Username & Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <button className='flex items-center space-x-1'>
                                <span>{username}</span>
                                <ChevronDown className='w-4 h-4' />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <button onClick={()=>signOut()}>Logout</button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>


                    {/* User Image */}
                    <button>
                        {session.user?.image ? (<Image src={session.user?.image} alt="user image" width={96} height={96} className="w-8 h-8 rounded-full border border-slate-800" />) : (
                            <div className="h-8 w-8 rounded-full border border-slate-800 bg-white">
                                {initials}
                            </div>
                        )}
                    </button>
                </div>

                {/* Layout Grid */}
                <button>
                    <LayoutGrid className='w-6 h-6 text-slate-900' />
                </button>
            </div>
        </div>
    );
}
