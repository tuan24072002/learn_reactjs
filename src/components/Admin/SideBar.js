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
import { useTranslation } from 'react-i18next';
const SideBar = (props) => {
    const { t } = useTranslation();
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
                        <Link to={'/'} className='text-decoration-none text-light'><DiReact size={"3em"} color='00bfff' className='icon-brand' />
                            <span>{t(`header.brand`)}</span></Link>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<MdDashboard />}
                            suffix={<span className="badge red">{t(`sidebar.dashboard_1`)}</span>}
                        >
                            {t(`sidebar.dashboard`)}
                            <Link to={'/admins'} />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            title={t(`sidebar.features`)}
                            icon={<FaGem />}
                            defaultOpen
                        >
                            <MenuItem>{t(`sidebar.manage-users`)}<Link to={'/admins/manage-users'} /></MenuItem>
                            <MenuItem>{t(`sidebar.manage-quizzes`)}<Link to={'/admins/manage-quizzes'} /></MenuItem>
                            <MenuItem>{t(`sidebar.manage-questions`)}<Link to={'/admins/manage-questions'} /></MenuItem>
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
                                {t(`sidebar.view-source`)}
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}

export default SideBar