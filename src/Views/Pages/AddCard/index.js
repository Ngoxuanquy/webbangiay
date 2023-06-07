import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

import classNames from 'classnames/bind';
import styles from './index.module.scss';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Modal from 'react-modal';

const cx = classNames.bind(styles);

function AddCard() {

    const URL = process.env.REACT_APP_URL;

    let slug = useParams();
    const [so, setSo] = useState(1);

    function handerCong() {
        setSo(so + 1);
    }

    function handerTru() {
        setSo(so - 1);
    }

    const email = localStorage.getItem('email')
    const [apis, setApi] = useState([])

    useEffect(() => {

        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const cleanedJwtString = token?.replace(/^"|"$/g, '');
        const cleanId = id?.replace(/^"|"$/g, '');

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
        fetch(URL + `/cart?userId=${cleanId}`, requestOptions)
            .then((res) => res.json())
            .then(res => setApi(res.metadata.cart_products))

    }, [])

    //xử lý tính tổng khi update sản phẩm

    const [total, setTotal] = useState()

    useEffect(() => {
        // Calculate the total value
        const Tong = apis.reduce((accumulator, quantity) => {
            return accumulator + quantity.quantity * quantity.product_price;
        }, 0);

        // Do something with the calculated value (e.g., update state)
        // ...
        setTotal(Tong)

    }, [apis]);

    //Xử lý khi xóa sản phẩm
    const handerDelete = (productId) => {

        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const cleanedJwtString = token?.replace(/^"|"$/g, '');
        const cleanId = id?.replace(/^"|"$/g, '');


        console.log(cleanId)
        console.log(productId)


        const requestOptions = {
            method: 'delete',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "30929e75539a12a71ea783896b3b99f6d93e78ab41a820ae7e5a3477c520b1fbc6205681dd9f3c2f5950177c233ce246d1df8579f2ba091a303f19cb66c99282",
                "authorization": cleanedJwtString,
                "x-client-id": cleanId
            },
            body: JSON.stringify({
                userId: cleanId,
                productId: productId
            })
        };

        // Lấy dữ liệu của khách hàng
        fetch(URL + `/cart`, requestOptions)
            .then((res) => res.json())
            .then(res => window.location.reload()
            )
    }

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

    const handerSubmit = () => {

        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const cleanedJwtString = token?.replace(/^"|"$/g, '');
        const cleanId = id?.replace(/^"|"$/g, '');

        const user = {
            userId: cleanId,
            name: 'a',
            number: "0123",
            adrees: 'Haf Nooij'
        }

        const requestOptions = {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "30929e75539a12a71ea783896b3b99f6d93e78ab41a820ae7e5a3477c520b1fbc6205681dd9f3c2f5950177c233ce246d1df8579f2ba091a303f19cb66c99282",
                "authorization": cleanedJwtString,
                "x-client-id": cleanId
            },
            body: JSON.stringify({
                user: user,
                product: apis,
                shopId: apis[0].product_shop
            })
        };

        // Lấy dữ liệu của khách hàng
        fetch(URL + `/transaction`, requestOptions)
            .then((res) => res.json())
            .then(res => window.location.reload()
            )
    }


    return (
        <div className={cx('container')}>
            <div className={cx('img-bia')}>
                <div className={cx('text-bia')}>
                    <div>
                        <div>
                            <h2> QT - Shop </h2>
                        </div>
                        <p> Home - Shop </p>
                    </div>
                </div>
                <img src="https://technext.github.io/ogani/img/breadcrumb.jpg" />
            </div>
            {/* <button onClick={openModal}>Open Modal</button> */}
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
                                Thông tin thanh toán
                            </div>
                        </div>
                        <div className={cx('table_mode')} style={{
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

                                {apis.map(api => (
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
                                                onClick={() => handerDelete(api._id)}
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

                        <div style={{
                            marginTop: '50px'
                        }}>
                            <div style={{
                                fontSize: 23,
                                fontWeight: 500
                            }}>
                                Thông Tin Khách Hàng
                            </div>

                            <div>
                                <main>
                                    <div className={cx('container')}>
                                        <header className={cx('heading')}>
                                            <div className={cx('green-bar')}></div>
                                            <h1 id="title" className={cx('main-heading')}>Thông Tin Khách Hàng</h1>
                                            <p id="description" className={cx('main-description')}>
                                                Thank you for taking the time to help us improve our product
                                            </p>
                                            <hr />
                                            <p className={cx('instructions')}><span className={cx('required')}>*</span> Indicates question are required to be answered</p>
                                        </header>

                                        <form action="#" method="post" id="survey-form" className={cx('survey-form')}>
                                            <label htmlFor="name" id="name-label">Name<span className={cx('required')}>*</span></label>
                                            <input type="text" name="name" id="name" className={cx('name')} placeholder="Enter your full name" required />

                                            <label htmlFor="email" id="email-label">Email<span className={cx('required')}>*</span></label>
                                            <input type="email" name="email" id="email" className={cx('email')} placeholder="Enter your email" required />

                                            <label htmlFor="number" id="number-label">Phone-Number</label>
                                            <input type="number" name="age" id="number" className={cx('age')} min="13" max="110" placeholder="Enter your Number" />

                                            <label htmlFor="dropdown" id="dropdown-label">How often did you use our product?<span className={cx('required')}>*</span></label>
                                            <select name="dropdown" id="dropdown" className={cx('dropdown')} required>
                                                <option value="">Select an option</option>
                                                <option value="1">Regularly</option>
                                                <option value="2">Weekly</option>
                                                <option value="3">Twice a month</option>
                                                <option value="4">Just Once</option>
                                            </select>

                                            <p className={cx('radio-btn-description')}>How easy is our product to use?<span className={cx('required')}>*</span></p>
                                            <label className={cx('radio-btn-label')} htmlFor="very-easy">
                                                <input type="radio" id="very-easy" name="ease-of-use" className={cx('ease-of-use')} value="very easy" checked /> Very Easy
                                            </label>

                                            <label className={cx('radio-btn-label')} htmlFor="easy">
                                                <input type="radio" id="easy" name="ease-of-use" className={cx('ease-of-use')} value="easy" /> Easy
                                            </label>

                                            <label className={cx('radio-btn-label')} htmlFor="intermediate">
                                                <input type="radio" id="intermediate" name="ease-of-use" className={cx('ease-of-use')} value="intermediate" /> Intermediate
                                            </label>

                                            <label className={cx('radio-btn-label')} htmlFor="difficult">
                                                <input type="radio" id="difficult" name="ease-of-use" className={cx('ease-of-use')} value="difficult" /> Difficult
                                            </label>

                                            <p className={cx('checkbox-description')}>What would you like to see improved? (Check all that apply)</p>
                                            <label className={cx('checkbox-label')} htmlFor="support">
                                                <input type="checkbox" name="support" id="support" value="support" /> Improve customer support
                                            </label>

                                            <label className={cx('checkbox-label')} htmlFor="features">
                                                <input type="checkbox" name="features" id="features" value="features" /> New features
                                            </label>

                                            <label className={cx('checkbox-label')} htmlFor="price">
                                                <input type="checkbox" name="price" id="price" value="price" /> Make the product cheaper
                                            </label>

                                            <label className={cx('checkbox-label')} htmlFor="website-ui">
                                                <input type="checkbox" name="website-ui" id="website-ui" value="website-ui" /> Improve website UI
                                            </label>

                                            <label htmlFor="comments">Node</label>
                                            <textarea name="comments" id="comments" cols="30" rows="5" placeholder="Enter your suggestions here"></textarea>

                                            <div style={{
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <button type="submit" id="submit" className={cx('submit')} value="Submit" style={{
                                                }}
                                                    onClick={() => handerSubmit()}
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </form>

                                        <footer>
                                            <p>Created by <a href="https://twitter.com/SandipanIO">Sandipan Mukherjee</a></p>
                                        </footer>
                                    </div>
                                </main>
                            </div>
                        </div>
                    </div>
                </div>

            </Modal >

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
                                <img src={api.product_thumb} className={cx('img_cart')} />

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
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}>
                                    <button onClick={handerTru} style={{
                                        backgroundColor: '#fff',
                                        width: 40,
                                        height: 40

                                    }}
                                    >-</button>
                                    <input type="text" value={api.quantity} readOnly style={{
                                        textAlign: 'center',
                                        width: 40,
                                        height: 40,
                                    }}

                                    />
                                    <button onClick={handerCong} style={{
                                        backgroundColor: '#fff',
                                        width: 40,
                                        height: 40
                                    }}

                                    >+</button>
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
                                    onClick={() => handerDelete(api._id)}
                                >
                                    <ion-icon name="trash-outline" style={{
                                        width: 30
                                    }}></ion-icon>
                                </button>
                            </td>
                        </tr>
                    ))}



                </table>

                {/* <button onClick={handerCong}>+</button> */}


            </div>
            <div className={cx('box')}>
                <div className={cx('button_update')}>
                    <div>
                        <button>CONTINUE SHOPPING</button>
                    </div>
                    <div>
                        <button>
                            UPADATE CART
                        </button>
                    </div>
                </div>
            </div>
            <div className={cx('box-all1')}>
                <div className={cx('box1')}>
                    <div className={cx('left')}>
                        <div className={cx('title')} >
                            <h1 >
                                Discount Codes
                            </h1>
                        </div>
                        <div className={cx('Discount')}>
                            <div>
                                <input type='text' placeholder="Enter you coupon code" />
                            </div>
                            <div>
                                <button style={{
                                    marginTop: "25px"
                                }}>
                                    APPLY COUPON
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('right')}>
                        <div>
                            <h1>
                                Cart Total
                            </h1>
                            <table>
                                <tr>
                                    <td>
                                        Subtotal
                                    </td>
                                    <td>${total}</td>
                                </tr>
                                <hr />
                                <tr>
                                    <td>
                                        Total
                                    </td>
                                    <td>${total}</td>
                                </tr>


                            </table>
                        </div>
                        <button onClick={() => openModal()}>PROCEED TO CHECKOUT</button>
                        <div data-tooltip="Price:-$20" className={cx('banner-btn')}>
                            <div className={cx("button-wrapper")}>
                                <div className={cx('text')}>Buy Now</div>
                                <span className={cx("icon")}>
                                    <svg
                                        viewBox="0 0 16 16"
                                        className={cx("bi bi-cart2")}
                                        fill="currentColor"
                                        height="16"
                                        width="16"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default AddCard;