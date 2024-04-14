import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";
import { FaGem, FaGithub } from 'react-icons/fa';
import sidebarBg from '../../assets/images/bg2.png';
import { Link } from 'react-router-dom';
const SideBar = (props) => {
    const { collapsed, toggled, handleToggleSidebar } = props;
    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <DiReact size={"3em"} color='00bfff' />
                        <Link to={'/'} className='text-decoration-none text-light'><span>Quiz Exam</span></Link>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<MdDashboard />}
                            suffix={<span className="badge red">Main</span>}
                        >
                            Dash board
                            <Link to={'/admins'} />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            title={"Features"}
                            icon={<FaGem />}
                            defaultOpen
                        >
                            <MenuItem>Manage Users<Link to={'/admins/manage-users'} /></MenuItem>
                            <MenuItem>Manage Quizzes<Link to={'/admins/manage-quizzes'} /></MenuItem>
                            <MenuItem>Manage Questions<Link to={'/admins/manage-questions'} /></MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/tuan24072002/learn_reactjs"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub size={"1em"} />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                View Source
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}

export default SideBar