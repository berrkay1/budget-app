import Sidebar from '@/components/Sidebar'
import React from 'react'



const Main = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex h-full w-full'>
            <div className='sticky top-0 z-50'>
                <Sidebar />
            </div>
            <div className='flex-1 overflow-x-hidden'>
                {children}
            </div>
        </div>
    )
}

export default Main