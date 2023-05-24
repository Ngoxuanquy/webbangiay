import React, { useEffect, useState, useRef } from 'react';
import Left from '../../../../Components/Left/index'

import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);


function Index() {

    const URL = 'http://localhost:3056/v1/api';

    const [apis, setApi] = useState([]);
    const [uploadedImage, setUploadedImage] = useState(null);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = () => {
            setUploadedImage(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const name_local = Cookies.get('name');


    //khai báo biến 
    const [apiproducts, setApiProduct] = useState('');


    useEffect(() => {

        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const cleanedJwtString = token.replace(/^"|"$/g, '');
        const cleanId = id.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'Get',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "025ce9a805c109871ed8664bea8a8e5403f162daf9d7bfd220b4aee6683993350483959b54538db3dc220fa426f334c9e740c66e068cc9ab03318ab4426f606b",
                "authorization": cleanedJwtString,
                "x-client-id": cleanId
            },
        };

        // Lấy dữ liệu của khách hàng
        fetch(URL + '/product/drafts/all', requestOptions)
            .then((data) => {
                return data.json()
            })
            .then((data) => {
                setApiProduct(data.metadata)
            })
    }, [])

    //apis đã puclic

    const [apipublic, setPublic] = useState([])

    useEffect(() => {

        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const cleanedJwtString = token.replace(/^"|"$/g, '');
        const cleanId = id.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'Get',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "025ce9a805c109871ed8664bea8a8e5403f162daf9d7bfd220b4aee6683993350483959b54538db3dc220fa426f334c9e740c66e068cc9ab03318ab4426f606b",
                "authorization": cleanedJwtString,
                "x-client-id": cleanId
            },
        };

        // Lấy dữ liệu của khách hàng
        fetch(URL + '/product/published/all', requestOptions)
            .then((data) => {
                return data.json()
            })
            .then((data) => {
                setPublic(data.metadata)
            })
    }, [])



    const handerDelete = () => {

    }

    const handerPublic = (productId) => {
        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const cleanedJwtString = token.replace(/^"|"$/g, '');
        const cleanId = id.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "025ce9a805c109871ed8664bea8a8e5403f162daf9d7bfd220b4aee6683993350483959b54538db3dc220fa426f334c9e740c66e068cc9ab03318ab4426f606b",
                "authorization": cleanedJwtString,
                "x-client-id": cleanId
            },
        };

        // Lấy dữ liệu của khách hàng
        fetch(URL + '/product/publish/' + productId, requestOptions)
            .then((data) => {
                alert('Public thành công!!')
                window.location.reload();
            })

    }


    const handerUnPublic = (productId) => {
        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const cleanedJwtString = token.replace(/^"|"$/g, '');
        const cleanId = id.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "025ce9a805c109871ed8664bea8a8e5403f162daf9d7bfd220b4aee6683993350483959b54538db3dc220fa426f334c9e740c66e068cc9ab03318ab4426f606b",
                "authorization": cleanedJwtString,
                "x-client-id": cleanId
            },
        };

        // Lấy dữ liệu của khách hàng
        fetch(URL + '/product/unpublish/' + productId, requestOptions)
            .then((data) => {
                alert('Public thành công!!')
                window.location.reload();
            })

    }

    const handerUpdate = (productId) => {
        window.location = '/api/update/product/' + productId
    }

    return (
        <div className={cx('container')}>
            <div>
                <div className={cx('header')}>
                    <Link to={'/login'}>
                        <div className={cx('login')}>
                            {name_local}
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
                        Danh Sách Sản Phẩm chưa public lên cho người dùng
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
                                    <th scope="col">Tên Sản Phẩm</th>
                                    <th scope="col">Giá</th>
                                    <th scope="col">Số Lượng</th>
                                    <th scope="col">Hình Ảnh</th>
                                    <th scope="col">Size</th>
                                    <th scope="col">Màu</th>
                                </tr>
                            </thead>
                            {apiproducts && apiproducts.map((api, index) => (
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
                                        <td>{api.product_name}</td>
                                        <td>{api.product_price}</td>
                                        <td>{api.product_quantity}</td>
                                        <td>
                                            <img src={api.product_thumb} style={{
                                                width: 100,
                                                height: 100
                                            }} />

                                        </td>
                                        <td>{api.product_attributes.size}</td>
                                        <td>{api.product_attributes.color}</td>
                                        <td style={{
                                            fontSize: '17px'
                                        }}>
                                            <button
                                                onClick={() => handerPublic(api._id)}
                                            >
                                                Public
                                            </button>
                                        </td>

                                        <td style={{
                                            fontSize: '17px'
                                        }}>
                                            <button
                                                onClick={() => handerUpdate(api._id)}
                                            >
                                                Sửa
                                            </button>
                                        </td>
                                        <td style={{
                                            fontSize: '17px'
                                        }}>
                                            <button
                                                onClick={() => handerDelete()}
                                            >
                                                Xóa
                                            </button>
                                        </td>


                                    </tr>
                                </tbody>
                            ))}

                        </table>
                    </div>
                </div>
                {/* //danh sách sản phẩm đã puclic */}
                <div className={cx('rigth')}>
                    <div className={cx('title')}>
                        <div style={{
                            fontSize: '24px',
                            color: 'green',
                            padding: "10px"
                        }}>
                            Danh Sách Sản Phẩm chưa public lên cho người dùng
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
                                        <th scope="col">Tên Sản Phẩm</th>
                                        <th scope="col">Giá</th>
                                        <th scope="col">Số Lượng</th>
                                        <th scope="col">Hình Ảnh</th>
                                        <th scope="col">Size</th>
                                        <th scope="col">Màu</th>
                                    </tr>
                                </thead>
                                {apipublic && apipublic.map((api, index) => (
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
                                            <td>{api.product_name}</td>
                                            <td>{api.product_price}</td>
                                            <td>{api.product_quantity}</td>
                                            <td>
                                                <img src={api.product_thumb} style={{
                                                    width: 100,
                                                    height: 100
                                                }} />

                                            </td>
                                            <td>{api.product_attributes.size}</td>
                                            <td>{api.product_attributes.color}</td>
                                            <td style={{
                                                fontSize: '17px'
                                            }}>
                                                <button
                                                    onClick={() => handerUnPublic(api._id)}
                                                >
                                                    UnPublic
                                                </button>
                                            </td>
                                            <td style={{
                                                fontSize: '17px'
                                            }}>
                                                <button
                                                    onClick={() => handerDelete()}
                                                >
                                                    Xóa
                                                </button>
                                            </td>


                                        </tr>
                                    </tbody>
                                ))}

                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Index