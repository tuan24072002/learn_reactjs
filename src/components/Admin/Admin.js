import React, { useState } from 'react'
import SideBar from './SideBar'
import "../../styles/Admin.scss"
import { FaBars } from 'react-icons/fa'
import { Outlet } from 'react-router-dom';
const Admin = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className='admin-container'>
            <div className='admin-sidebar'>
                <SideBar collapsed={collapsed} />
            </div>
            <div className='admin-content'>
                <div className='admin-header' onClick={() => setCollapsed(!collapsed)}>
                    <FaBars />
                </div>
                <div className='admin-main'>
                    <Outlet />
                </div>

            </div>
        </div>
    )
}

export default Admin