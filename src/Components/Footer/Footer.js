import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

import classNames from "classnames/bind"
import styles from "./footer.module.scss"

const cx = classNames.bind(styles)
const Footer = () => {

    const [test, settest] = useState('');

    return (
        <div className={cx('container')}>
            <div className="container">
                <div className={cx('box')}>
                    <div className={cx('row')}>
                        <h1>Quy-Thành</h1>
                        <p>Address: 60-49 Road 11378 New York</p>
                        <p>New York</p>
                        <p>Phone: +65 11.188.888</p>
                        <p>Email: hello@colorlib.com</p>
                    </div>
                    <div className={cx('footer__widget')}>
                        <h2>Useful Links</h2>
                        <table>
                            <tr>
                                <td>
                                    <ul>
                                        <li><Link to={'#'}> About Us </Link> </li>
                                        <li><Link to={'#'}> About Our Shop </Link> </li>
                                        <li><Link to={'#'}> Secure Shopping </Link> </li>
                                        <li><Link to={'#'}> Delivery infomation </Link> </li>
                                        <li><Link to={'#'}> Privacy Policy </Link> </li>
                                        <li><Link to={'#'}> Our Sitemap</Link> </li>
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                        <li><Link to={'#'}> Who We Are </Link> </li>
                                        <li><Link to={'#'}> Our Services </Link> </li>
                                        <li><Link to={'#'}> Projects </Link> </li>
                                        <li><Link to={'#'}> Contact </Link> </li>
                                        <li><Link to={'#'}> Innovation </Link> </li>
                                        <li><Link to={'#'}> Testimonials </Link> </li>
                                    </ul>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className={cx('footer_right')}>
                        <h6>Join Our Newsletter Now</h6>
                        <p>Get E-mail updates about our latest shop and special offers.</p>
                        <input type="text" placeholder="Enter your mail" />
                        <button><h2>SUBSCRIBE</h2></button>
                        <div className={cx('icon')}>
                            <Link to={'#'}><i style={{
                                border: '1px solid black',
                                marginLeft: '10px',
                                width: '40px'
                            }} class="fa fa-facebook"> </i> </Link>
                            <Link to={'#'}> <i class="fa fa-instagram"></i> </Link>
                            <Link to={'#'}> <i class="fa fa-twitter"></i> </Link>
                            <Link to={'#'}><i class="fa fa-pinterest"></i></Link>

                        </div>

                    </div>
                </div>
                <hr />
                <div className={cx('bottom')}>
                    <div>

                        <p >Copyright ©2022 All rights reserved | This template is made with  by Colorlib</p>
                    </div>
                    <div><img src='https://technext.github.io/ogani/img/payment-item.png' /></div>
                </div>
            </div>
        </div>
    )
}

export default Footer