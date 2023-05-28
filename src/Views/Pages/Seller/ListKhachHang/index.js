import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import Cookies from 'js-cookie';
import Left from '../../../../Components/Left/index'
import Modal from 'react-modal';

const cx = classNames.bind(styles);

function ListKhachHang() {

    const URL = 'http://localhost:3056/v1/api';

    const [apiUsers, setApiUser] = useState([])
    const [apiProduct, setApiProduct] = useState([])
    const [apis, setApis] = useState([])



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
        fetch(URL + '/transaction/shopId/' + cleanId, requestOptions)
            .then((res) => res.json())
            .then(res => {
                console.log(res)
                setApis(res.metadata)
                setApiUser(res.metadata)
                // setApiProduct(res.metadata.transaction_products[0])
            })

    }, [])

    console.log({ apiUsers })

    //Khai báo modal
    const customStyles = {
        overlay: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            // maxHeight: '100%',
            overflow: 'auto',
            height: '100%'
        },
    };

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }


    const handerChiTiet = (index) => {
        openModal()

        setApiProduct(apis[index].transaction_products[0])

    }

    // console.log(apis)

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
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div style={{
                    width: '100%',

                }}>
                    <div>
                        <div>
                            <div style={{
                                fontSize: 25,
                                fontWeight: 500,
                                margin: '20px 0px'
                            }}>
                                Thông tin đơn hàng
                            </div>
                        </div>
                        <div className={cx('table')} style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: "100px"
                        }}>
                            <table style={{
                                width: '90%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <tr style={{
                                    justifyItems: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    fontSize: 20,
                                    marginBottom: 20,
                                    marginTop: 20
                                }}>
                                    <td>
                                        Ảnh
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

                                {apiProduct.map(api => (
                                    <tr key={api._id} style={{
                                        justifyItems: 'center',
                                        alignItems: 'center',
                                        fontSize: 20
                                    }}>
                                        <td style={{
                                            marginTop: 20

                                        }}>
                                            <img src={api.product_thumb} style={{
                                                width: '100px',
                                                height: '100px'
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

            </Modal >

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
                            <td style={{
                                textAlign: 'center'
                            }}>
                                STT
                            </td>
                            <td style={{
                                textAlign: 'center'
                            }}>
                                Tên
                            </td>
                            <td>
                                Số Điện Thoại
                            </td>
                            <td>
                                Địa Chỉ
                            </td>

                            <td>
                                #
                            </td>
                        </tr>

                        {apiUsers.map((api, index) => (
                            <tr key={api._id} style={{
                                justifyItems: 'center',
                                alignItems: 'center'
                            }}>
                                <td style={{
                                    textAlign: 'center'
                                }}>
                                    {index + 1}

                                </td>

                                <td style={{
                                    textAlign: 'center'
                                }}>
                                    {api.transaction_userId[0].name}
                                </td>

                                <td>
                                    {api.transaction_userId[0].number}
                                </td>
                                <td>
                                    {api.transaction_userId[0].adrees}
                                    {/* <faInstagram /> */}
                                </td>
                                <td>
                                    <button style={{
                                        border: 'none'
                                    }}
                                        onClick={() => handerChiTiet(index)}
                                    >
                                        Xem Chi Tiết
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