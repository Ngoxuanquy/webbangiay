import React, { useEffect, useState, useRef } from 'react'

// import { Link } from 'react-router-dom'

import styles from "./index.module.scss"
import classNames from "classnames/bind"
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import HomePage from './../../Views/Pages/HomePage/HomePage';

// const { Header, Content, Footer, Sider } = Layout;

const { Sider } = Layout;
const { SubMenu } = Menu;

// function getItem(
//     label,
//     key,
//     icon,
//     children
// ) {
//     return {
//         key,
//         icon,
//         children,
//         label,
//     };
// }


const getItem = (title, key, icon, children) => {
    if (children) {
        return (
            <SubMenu key={key} icon={icon} title={title}>
                {children}
            </SubMenu>
        );
    }

    return (
        <Menu.Item key={key} icon={icon} onClick={() => console.log(key)}>
            <Link >{title}</Link>
            {key == 1 ?
                <Link to={`/`}>{title}</Link>
                : null
            }
            {key == 2 ?
                <Link to={`/api/select/product`}>{title}</Link>
                : null
            }
            {key == 3 ?
                <Link to={`/api/listkhachhang`}>{title}</Link>
                : null
            }
        </Menu.Item>
    );
};


// const items = [
//     getItem('Danh sách sản phẩm', '1', <PieChartOutlined />),
//     getItem('Danh sách khách hàng', '2', <DesktopOutlined />),
//     getItem('User', 'sub1', <UserOutlined />, [
//         getItem('Tom', '3'),
//         getItem('Bill', '4'),
//         getItem('Alex', '5'),
//     ]),
//     getItem('Team', 'sub2', <TeamOutlined />, [
//         getItem('Team 1', '6'),
//         getItem('Team 2', '8')
//     ]),
//     getItem('Files', '9', <FileOutlined />)
// ];

const cx = classNames.bind(styles)

const name = localStorage.getItem('name')


// console.log(name)

function Left() {

    const [img, setImg] = useState();

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer }
    } = theme.useToken();

    const handleClick = (event) => {
        const value = event.target.textContent;
        console.log('Clicked value:', value);
    };


    // console.log(img)

    return (
        // <div className={cx('box')} id="box2" >
        //     <div className={cx('left')}>
        //         <Link to="/" style={{ color: '#fff' }}>
        //             <div className={cx('logo')}>
        //                 <div>
        //                     <img src="https://adminlte.io/themes/v3/dist/img/AdminLTELogo.png" />
        //                 </div>
        //                 <div>
        //                     <h1>Home</h1>
        //                 </div>
        //             </div>
        //         </Link>

        //         <div className={cx('author')}>
        //             <div>
        //                 <img src={img} />
        //             </div>
        //             <div>
        //                 <h3>{name != "" ? name : 'Đăng ký'}</h3>
        //             </div>
        //         </div>

        //         <div className={cx('search')}>
        //             <div>
        //                 <input type="text" placeholder="Search" />
        //             </div>
        //         </div>


        //         <div className={cx('dropdown')}>
        //             <details>

        //                 <summary>
        //                     <Link to='/api/select/product' >
        //                         Danh Sách Sản Phẩm

        //                     </Link>
        //                 </summary>
        //                 <ul>
        //                     <li>  <div className={cx('conten')} id='name' >
        //                         <Link to="/api/create/product" style={{ color: '#fff' }}   >
        //                             <p >Create</p>
        //                         </Link>
        //                     </div></li>
        //                     <li>Dashboard 2</li>
        //                     <Link to='/' >
        //                         <li>Dashboard 3</li>
        //                     </Link>


        //                 </ul>
        //             </details>
        //         </div>

        //         <div className={cx('Widgets')}>
        //             <div className={cx('icon')}>
        //                 <i class="fa-solid fa-table-cells"></i>
        //             </div>

        //             <div></div>
        //         </div>


        //         <div className={cx('dropdown_Layout')}>
        //             <details>
        //                 <summary>
        //                     <Link to={'/api/listkhachhang'}>
        //                         DS Người Mua Hàng
        //                     </Link >
        //                 </summary>

        //                 <ul>
        //                     <Link to={'/admin'}>
        //                         <li >
        //                             Lớp A1
        //                         </li>
        //                     </Link>
        //                     <Link to={'/admin/a2'}>
        //                         <li >
        //                             Lớp A2
        //                         </li>
        //                     </Link>
        //                     <li>Điều khoản 3</li>
        //                     <li>Điều khoản 4</li>

        //                 </ul>
        //             </details>
        //         </div>

        //         <div className={cx('dropdown_Charts')}>
        //             <details>
        //                 <summary>
        //                     <Link to='/chart' style={{ color: '#fff', textDecoration: 'none' }}>
        //                         Charts
        //                     </Link>
        //                 </summary>
        //                 <ul>
        //                     <li>Điều khoản 1</li>
        //                     <li>Điều khoản 2</li>
        //                     <li>Điều khoản 3</li>
        //                     <li>Điều khoản 4</li>

        //                 </ul>
        //             </details>
        //         </div>

        //         <div className={cx('dropdown_UI')}>
        //             <details>
        //                 <summary>
        //                     <Link to={'/quanly'} style={{ color: '#fff', textDecoration: 'none' }}>
        //                         Quản Lý
        //                     </Link>
        //                 </summary>
        //                 <ul>
        //                     <li>Điều khoản 1</li>
        //                     <li>Điều khoản 2</li>
        //                     <li>Điều khoản 3</li>
        //                     <li>Điều khoản 4</li>

        //                 </ul>
        //             </details>
        //         </div>

        //         <div className={cx('dropdown_Forms')}>
        //             <details>

        //                 <summary>
        //                     Forms
        //                 </summary>
        //                 <ul>
        //                     <li>Điều khoản 1</li>
        //                     <li>Điều khoản 2</li>
        //                     <li>Điều khoản 3</li>
        //                     <li>Điều khoản 4</li>

        //                 </ul>
        //             </details>
        //         </div>

        //         <div className={cx('dropdown_Tables')}>
        //             <details>

        //                 <summary>
        //                     Tables
        //                 </summary>
        //                 <ul>
        //                     <li>Điều khoản 1</li>
        //                     <li>Điều khoản 2</li>
        //                     <li>Điều khoản 3</li>
        //                     <li>Điều khoản 4</li>

        //                 </ul>
        //             </details>
        //         </div>

        //         <div className={cx('EXAMPLES')}>
        //             <h4>EXAMPLES</h4>
        //         </div>

        //         <div className={cx('Calendar')}>
        //             <div className={cx('icon')}>
        //                 <i class="fa-solid fa-calendar-days"></i>
        //             </div>
        //             <div className={cx('conten')}>
        //                 <p>Calendar</p>
        //             </div>
        //             <div></div>
        //         </div>

        //         <div className={cx('Gallery')}>
        //             <div className={cx('icon')}>
        //                 <i class="fa-solid fa-gallery-thumbnails"></i>
        //             </div>
        //             <div className={cx('conten')}>
        //                 <p>
        //                     Gallery</p>
        //             </div>
        //             <div></div>
        //         </div>

        //         <div className={cx('Kanban')}>
        //             <div className={cx('icon')}>
        //                 <i class="fa-solid fa-square-kanban"></i>
        //             </div>
        //             <div className={cx('conten')}>
        //                 <p>
        //                     Kanban Board</p>
        //             </div>
        //             <div></div>
        //         </div>



        //         <div className={cx('dropdown_Mailbox')}>
        //             <details>

        //                 <summary>
        //                     Mailbox
        //                 </summary>
        //                 <ul>
        //                     <li>Điều khoản 1</li>
        //                     <li>Điều khoản 2</li>
        //                     <li>Điều khoản 3</li>
        //                     <li>Điều khoản 4</li>

        //                 </ul>
        //             </details>
        //         </div>

        //         <div className={cx('dropdown_Pages')}>
        //             <details>

        //                 <summary>
        //                     Pages
        //                 </summary>
        //                 <ul>
        //                     <li>Điều khoản 1</li>
        //                     <li>Điều khoản 2</li>
        //                     <li>Điều khoản 3</li>
        //                     <li>Điều khoản 4</li>

        //                 </ul>
        //             </details>
        //         </div>

        //         <div className={cx('dropdown_Extras')}>
        //             <details>

        //                 <summary>
        //                     Extras
        //                 </summary>
        //                 <ul>
        //                     <li>Điều khoản 1</li>
        //                     <li>Điều khoản 2</li>
        //                     <li>Điều khoản 3</li>
        //                     <li>Điều khoản 4</li>

        //                 </ul>
        //             </details>
        //         </div>

        //         <div className={cx('dropdown_Search')}>
        //             <details>

        //                 <summary>
        //                     Search
        //                 </summary>
        //                 <ul>
        //                     <li>Điều khoản 1</li>
        //                     <li>Điều khoản 2</li>
        //                     <li>Điều khoản 3</li>
        //                     <li>Điều khoản 4</li>

        //                 </ul>
        //             </details>
        //         </div>

        //         <div className={cx('MISCELLANEOUS')}>
        //             <h4>
        //                 MISCELLANEOUS

        //             </h4>
        //         </div>


        //         <div className={cx('Tabbed')}>
        //             <div className={cx('icon')}>
        //                 <i class="fa-solid fa-ellipsis"></i>
        //             </div>
        //             <div className={cx('conten')}>
        //                 <p>
        //                     Tabbed IFrame Plugin</p>
        //             </div>
        //             <div></div>
        //         </div>


        //         <div className={cx('Documentation')}>
        //             <div className={cx('icon')}>
        //                 <i class="fa-solid fa-file"></i>
        //             </div>
        //             <div className={cx('conten')}>
        //                 <p>
        //                     Documentation</p>
        //             </div>
        //             <div></div>
        //         </div>

        //         <div className={cx('MULTI')}>
        //             <h4>
        //                 MULTI LEVEL EXAMPLE
        //             </h4>
        //         </div>


        //         <div className={cx('Level_1')}>
        //             <div className={cx('icon')}>
        //                 <i class="fa-solid fa-circle"></i>
        //             </div>
        //             <div className={cx('conten')}>
        //                 <p>
        //                     Level 1</p>
        //             </div>
        //             <div></div>
        //         </div>

        //         <div className={cx('dropdown_Level_1')}>
        //             <details>

        //                 <summary>
        //                     Level 1
        //                 </summary>
        //                 <ul>
        //                     <li>Điều khoản 1</li>
        //                     <li>Điều khoản 2</li>
        //                     <li>Điều khoản 3</li>
        //                     <li>Điều khoản 4</li>

        //                 </ul>
        //             </details>
        //         </div>

        //         <div className={cx('Level_1')}>
        //             <div className={cx('icon')}>
        //                 <i class="fa-solid fa-circle"></i>
        //             </div>
        //             <div className={cx('conten')}>
        //                 <p>
        //                     Level 1</p>
        //             </div>
        //             <div></div>
        //         </div>

        //         <div className={cx('LABELS')}>
        //             <h4>
        //                 LABELS
        //             </h4>
        //         </div>

        //         <div className={cx('Important')}>
        //             <div className={cx('icon')}>
        //                 <i class="fa-solid fa-genderless"></i>
        //             </div>
        //             <div className={cx('conten')}>
        //                 <p>
        //                     Important </p>
        //             </div>
        //             <div></div>
        //         </div>

        //         <div className={cx('Warning')}>
        //             <div className={cx('icon')}>
        //                 <i class="fa-solid fa-genderless"></i>
        //             </div>
        //             <div className={cx('conten')}>
        //                 <p>
        //                     Warning </p>
        //             </div>
        //             <div></div>
        //         </div>

        //         <div className={cx('Informational')}>
        //             <div className={cx('icon')}>
        //                 <i class="fa-solid fa-genderless"></i>
        //             </div>
        //             <div className={cx('conten')}>
        //                 <p>
        //                     Informational </p>
        //             </div>
        //             <div></div>
        //         </div>

        //     </div>

        // </div >
        <Layout style={{ minHeight: '100vh', backgroundColor: 'white' }}>
            <Sider collapsible>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    {getItem('Home', '1', <PieChartOutlined />)}
                    {getItem('Danh sách sản phẩm', '2', <PieChartOutlined />)}
                    {getItem('Danh sách khách hàng', '3', <DesktopOutlined />)}
                    {getItem('User', 'sub1', <UserOutlined />, [
                        getItem('Tom', '4'),
                        getItem('Bill', '5'),
                        getItem('Alex', '6'),
                    ])}
                    {getItem('Team', 'sub2', <TeamOutlined />, [
                        getItem('Team 1', '7'),
                        getItem('Team 2', '8')
                    ])}
                    {getItem('Files', '9', <FileOutlined />)}
                </Menu>
            </Sider>
        </Layout>


    )
}

export default Left