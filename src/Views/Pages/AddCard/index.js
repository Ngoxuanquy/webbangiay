import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

import classNames from 'classnames/bind';
import styles from './index.module.scss';
const cx = classNames.bind(styles);

// import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';


function Card() {

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
        fetch('http://localhost:4000/api/thanhtoan/khachhang/' + email)
            .then((res) => res.json())
            .then(res => setApi(res[0].orders))

    }, [])


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


            <div className={cx('table')}>
                <table>
                    <tr>
                        <div>
                            <td>
                                Products
                            </td>
                        </div>
                        <div>
                            <td>
                                Price
                            </td>
                            <td>
                                Quantity
                            </td>
                            <td>
                                Total
                            </td>
                        </div>
                    </tr>

                    {apis.map(api => (
                        <tr>
                            <div>
                                <td>
                                    <img src={api.img} style={{
                                        width: '150px',
                                        height: '150px'
                                    }} />

                                </td>
                            </div>
                            <div>
                                <td>

                                    <div> {api.TenHang} </div>
                                </td>
                            </div>
                            <div>
                                <td>
                                    <p>
                                        $ {api.price}
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <button onClick={() => handerTru()}>-</button>
                                        <input type='text' value={so} />
                                        <button onClick={() => handerCong()}>+</button>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        $110.00
                                        {/* <faInstagram /> */}
                                    </p>
                                </td>
                            </div>
                        </tr>
                    ))}

                </table>

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
                                <button>
                                    APPLY COUPON
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('right')}>
                        <h1>
                            Cart Total
                        </h1>
                        <table>
                            <tr>
                                <td>
                                    Subtotal
                                </td>
                                <td>$454.98</td>
                            </tr>
                            <hr />
                            <tr>
                                <td>
                                    Total
                                </td>
                                <td>$454.98</td>
                            </tr>


                        </table>
                        <button>PROCEED TO CHECKOUT</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;