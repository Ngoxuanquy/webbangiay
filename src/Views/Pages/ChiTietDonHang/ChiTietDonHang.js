import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import classNames from 'classnames/bind';
import styles from './ChiTietDonHang.module.scss';
import { useParams } from 'react-router-dom';

import Left from '../../../Components/Left';
const cx = classNames.bind(styles);


function ChiTietDonHang() {

    let id = useParams()

    const [apis, setApi] = useState([])
    const [orders, setOrder] = useState([])


    useEffect(() => {
        fetch('http://localhost:4000/api/thanhtoan/id/' + id.slug)
            .then((res) => res.json())
            .then(res => setApi(res))
    }, [])

    useEffect(() => {
        fetch('http://localhost:4000/api/thanhtoan/id/' + id.slug)
            .then((res) => res.json())
            .then(res => setOrder(res[0].orders))
    }, [])


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
                {apis.map(api => (
                    <div style={{
                        fontSize: '20px'
                    }}>
                        <div>
                            Thông Tin Khách Hàng: {api.KhachHang}
                        </div>
                        <div>
                            Phone_Number : {api.Phone_Number}
                        </div>
                        <div>
                            Address: {api.Address}
                        </div>
                        <div>
                            Trạng Thái: {api.TrangThai}
                        </div>
                    </div>
                ))}

                <div className={cx('ThongTinDon')}>
                    <div style={{
                        fontSize: '20px',
                        color: 'green',
                        padding: '10px'
                    }}>
                        Thông Tin Đơn
                    </div>
                    <table class="table" style={{
                        fontSize: '20px'
                    }}>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tên Hàng</th>
                                <th scope="col">Ảnh</th>
                                <th scope="col">Số Lượng</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Tổng Tiền</th>


                            </tr>
                        </thead>
                        {orders.map(order => (
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>{order.TenHang}</td>
                                    <td>
                                        <img src={order.img} style={{
                                            width: '100px',
                                            height: '100px'
                                        }} />
                                    </td>
                                    <td>{order.SoLuong}</td>
                                    <td>{order.price}</td>
                                    <td>{order.SoLuong * order.price}</td>

                                </tr>

                            </tbody>
                        ))}
                    </table>
                </div>
            </div>

        </div>
    )
}

export default ChiTietDonHang