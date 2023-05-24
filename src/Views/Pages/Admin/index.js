import React, { useEffect, useState, useRef } from 'react';
import Left from '../../../Components/Left/index'

import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);


function Index() {

    const [apis, setApi] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/api/orders/')
            .then((res) => res.json())
            .then(res => setApi(res))

    }, [])

    console.log(apis)


    return (
        <div className={cx('container')}>
            <div>
                <div className={cx('header')}>
                    <Link to={'/login'}>
                        <div className={cx('login')}>
                            Login
                        </div>
                    </Link>
                </div>
                <div className={cx('left')}>
                    <Left />
                </div>
            </div>

            <div className={cx('rigth')}>
                <div className={cx('title')}>
                    <div style={{
                        fontSize: '24px',
                        color: 'green',
                        padding: "10px"
                    }}>
                        Những Người Đã Mua
                    </div>
                    <div style={{
                        // width: "1000px"
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <table class="table" style={{
                            width: '100%',

                        }}>
                            <thead style={{
                                fontSize: '20px',

                            }}>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Người Mua</th>
                                    <th scope="col">Số Điện Thoại</th>
                                    <th scope="col">Địa Chỉ</th>
                                    <th scope="col">Trạng Thái</th>
                                    <th scope="col"></th>


                                </tr>
                            </thead>
                            {apis.map((api, index) => (


                                <tbody style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: '20px',
                                    width: '100%',
                                }}>

                                    <tr style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontSize: '20px',
                                        width: '100%',
                                        textAlign: 'center',
                                    }}>

                                        <th scope="row">{index + 1}</th>
                                        <td>{api.KhachHang}</td>
                                        <td>{api.Phone_Number}</td>
                                        <td>{api.Address}</td>
                                        <td>{api.TrangThai}</td>
                                        <td style={{
                                            fontSize: '17px'
                                        }}>
                                            <Link to={`/chitietdonhang/${api.id}`}>
                                                Xem Chi Tiết
                                            </Link>
                                        </td>


                                    </tr>

                                </tbody>
                            ))}

                        </table>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Index