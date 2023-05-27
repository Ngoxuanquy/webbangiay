import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import Cookies from 'js-cookie';
import Left from '../../../../Components/Left/index'

const cx = classNames.bind(styles);

function ListKhachHang() {

    const URL = 'http://localhost:3056/v1/api';

    const [apis, setApi] = useState([])

    useEffect(() => {

        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const cleanedJwtString = token.replace(/^"|"$/g, '');
        const cleanId = id.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "025ce9a805c109871ed8664bea8a8e5403f162daf9d7bfd220b4aee6683993350483959b54538db3dc220fa426f334c9e740c66e068cc9ab03318ab4426f606b",
                "authorization": cleanedJwtString,
                "x-client-id": cleanId
            },
        };

        // Lấy dữ liệu của khách hàng
        fetch(URL + '/cart/shopId/' + cleanId, requestOptions)
            .then((res) => res.json())
            .then(res => setApi(res.metadata))

    }, [])

    console.log(apis)


    return (
        <div className={cx('container')}>
            <div>
                <div className={cx('header')}>
                    <Link to={'/login'}>
                        <div className={cx('login')}>
                            {/* {name_local} */}
                        </div>
                    </Link>
                </div>
                <div className={cx('left')}>
                    <Left />
                </div>
            </div>

            {/* Nội Dung */}
            <div style={{
                marginTop: 100
            }}>
                <div className={cx('table')}>
                    <table>
                        <tr style={{
                            justifyItems: 'center',
                            alignItems: 'center'
                        }}>
                            <td>
                                Products
                            </td>

                            <td>
                                Name
                            </td>
                            <td>
                                Price
                            </td>
                            <td>
                                Quantity
                            </td>
                            <td>
                                Total
                            </td>
                            <td>
                                Xóa
                            </td>
                        </tr>

                        {apis.map(api => (
                            <tr key={api._id} style={{
                                justifyItems: 'center',
                                alignItems: 'center'
                            }}>
                                <td>
                                    <img src={api.product_thumb} style={{
                                        width: '150px',
                                        height: '150px'
                                    }} />

                                </td>

                                <td>
                                    {api.product_name}
                                </td>

                                <td>
                                    $ {api.product_price}
                                </td>

                                <td>
                                    <p style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>

                                        <input type="text" value={api.quantity} readOnly style={{
                                            width: 40,
                                            height: 40,
                                            textAlign: 'center',

                                        }} />

                                    </p>
                                </td>
                                <td>
                                    <p>
                                        ${api.quantity * api.product_price}
                                        {/* <faInstagram /> */}
                                    </p>
                                </td>
                                <td>
                                    <button style={{
                                        border: 'none'
                                    }}
                                    // onClick={() => handerDelete(api._id)}
                                    >
                                        <ion-icon name="trash-outline" style={{
                                            width: 30
                                        }}></ion-icon>
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </table>

                </div>
            </div>
        </div>

    )
}

export default ListKhachHang