import React from 'react'
import AdminSidebar from './AdminSidebar'


interface AdminDashboardLayoutProps {
    children: React.ReactNode
}
const AdminDashboardLayout = ({ children }: AdminDashboardLayoutProps) => {
    return (
        <div className='fix-height flex'>
            <div className='w-1/4 bg-purple-800 text-white p-4'>
                <AdminSidebar />
            </div>
            <div className='w-full'>
                {children}
            </div>
        </div>
    )
}

export default AdminDashboardLayout