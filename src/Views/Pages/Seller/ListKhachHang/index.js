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

    const URL = process.env.REACT_APP_URL

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
                "x-api-key": "30929e75539a12a71ea783896b3b99f6d93e78ab41a820ae7e5a3477c520b1fbc6205681dd9f3c2f5950177c233ce246d1df8579f2ba091a303f19cb66c99282",
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
        setApiProduct([apis[index].transaction_products[0]])
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
                                            {api.quantity}
                                        </td>
                                        <td style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginLeft: 40
                                        }}>

                                            ${api.quantity * api.product_price}
                                            {/* <faInstagram /> */}

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
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Name</th>
                                <th scope="col">Số Điện Thoại</th>
                                <th scope="col" rowspan="2">Địa Chỉ</th>
                                <th scope="col" rowspan="1">#</th>

                            </tr>
                        </thead>
                        <tbody>
                            {apiUsers.map((apiUser, index) => (
                                <tr onClick={() => handerChiTiet(index)}>
                                    <td data-style="bold">{index + 1}</td>
                                    <td data-style="bold">{apiUser.transaction_userId[0].name}</td>
                                    <td data-style="bold">{apiUser.transaction_userId[0].number}</td>
                                    <td data-style="bold">
                                        {apiUser.transaction_userId[0].adrees}
                                    </td>
                                    <td style={{
                                        fontSize: 16
                                    }} >
                                        <button style={{
                                            backgroundColor: "none"
                                        }}
                                            onClick={() => handerChiTiet(index)}
                                        >
                                            Xem Chi Tiết

                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>

    )
}

export default ListKhachHang