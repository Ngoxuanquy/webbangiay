import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBagShopping, faBars, faChevronDown, faEnvelope, faPhone, faUser } from "@fortawesome/free-solid-svg-icons"
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons"

import { Search } from "../../Components"

import classNames from "classnames/bind"
import styles from "./header.module.scss"
import Cookies from 'js-cookie';
import { auth } from '../../Views/Pages/config/index'

const cx = classNames.bind(styles)
const Header = () => {

    const [isActive, setIsActive] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    // const [selected, setSelected] = useState('')

    const handleSelectDepartments = (item) => {
        alert(`you choosed ${item.departments}`)
    }

    // fake data api departments
    const data = [
        { id: 1, departments: 'Jeans' },
        { id: 2, departments: 'Shirts' },
        { id: 3, departments: 'Dress' },
        { id: 4, departments: 'T-Shirts' },
        { id: 5, departments: 'Hoodie' },
        { id: 6, departments: 'Manchester United' },
    ]

    const navigate = useNavigate()

    const handleCart = () => {
        navigate("/cart")
    }

    function handerLogin() {
        // Xóa dữ liệu trong localStorage khi component được tải
        auth.signOut()
        const cookies = document.cookie.split(";");

        cookies.forEach(cookie => {
            const cookieName = cookie.trim().split("=")[0];
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });
        window.location = '/login'
    }

    const email = localStorage.getItem('email')
    // console.log(img)

    function handerClickShop() {
        setIsActive(false)
        window.location = '/shop'
    }

    const handerProfile = () => {
        setIsLoading(!isLoading)
        // window.location = '/profile'
        console.log(isLoading)
    }


    const name = Cookies.get('name');
    const img = Cookies.get('img');

    console.log(img)

    return (
        <div className={cx('container')}>
            <div className={cx('header__top')}>
                <div className="container">
                    <div className={cx('header__top-box')}>
                        <div className={cx('left-side')}>
                            <div className={cx('mail')}>
                                <FontAwesomeIcon icon={faEnvelope} />
                                <p>
                                    {email}
                                </p>
                            </div>
                            <div className={cx('separate')}></div>
                            <div className={cx('slogan')}>
                                <p>Free Shipping for all Order </p>
                            </div>
                        </div>
                        <div className={cx('right-side')}>
                            <div className={cx('social-media')}>
                                <a href="#">
                                    <FontAwesomeIcon icon={faFacebook} />
                                </a>
                                <a href="#">
                                    <FontAwesomeIcon icon={faTwitter} />
                                </a>
                                <a href="#">
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                            </div>
                            <div className={cx('separate')}></div>
                            <div className={cx('language')}>
                                <p>English</p>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                            <div className={cx('separate')}></div>
                            <div className={cx('authentication')}>
                                {img ?
                                    <img src={img} />
                                    :
                                    <FontAwesomeIcon icon={faUser} />

                                }

                                {name == null ?
                                    <button
                                        style={{
                                            border: "none",
                                            backgroundColor: "var(--primary-grey-color)"
                                        }}
                                        onClick={() => handerLogin()}
                                    >
                                        "Login"
                                    </button>
                                    :
                                    <button
                                        style={{
                                            border: "none",
                                            backgroundColor: "var(--primary-grey-color)"
                                        }}
                                        className={cx('name_hover')}
                                        onClick={() => handerProfile()}

                                    >
                                        {name}
                                    </button>
                                }
                            </div>

                            {isLoading == false ? null :
                                <div className={cx('menu_an')}>
                                    <div>
                                        <Link to="/profile">

                                            <div style={{
                                                fontSize: 15,
                                                textAlign: 'center',
                                                // marginBottom: 10,
                                                marginTop: 10
                                            }}>
                                                Thông Tin Cá Nhân
                                            </div>
                                            /</Link>
                                        <div style={{
                                            fontSize: 15,
                                            textAlign: 'center',
                                            marginBottom: 10,
                                        }}>
                                            Đặt Lại Mật Khẩu
                                        </div>
                                        <div style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            fontSize: 15,
                                            textAlign: 'center',
                                            marginBottom: 10,
                                        }}>
                                            <button
                                                onClick={() => handerLogin()}
                                                style={{
                                                    border: 'none',
                                                    width: 200
                                                }}
                                            >
                                                <div style={{
                                                    fontSize: 15,
                                                    textAlign: 'center',
                                                    marginBottom: 10,
                                                }}

                                                >
                                                    Đăng Xuất
                                                </div>
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('header__mid')}>
                <div className="container">
                    <div className={cx('header__mid-box')}>
                        <div className={cx('logo')}>
                            <Link to="/">
                                <h1 style={{
                                    color: "white"
                                }}> SHOP</h1>
                            </Link>
                        </div>
                        <div className={cx('menu')}>
                            <ul>
                                <li >
                                    <Link to="/" style={{
                                        color: "white"
                                    }}>
                                        <p>HOME</p>
                                    </Link>
                                </li>
                                <li style={{
                                    border: "none",
                                    fontWeight: 700,
                                    fontSize: "15px",
                                    color: "white",

                                }}>
                                    <button
                                        style={{
                                            border: "none",
                                            fontWeight: 700,
                                            backgroundColor: 'transparent',
                                            fontSize: "15px",

                                        }}
                                        onClick={() => handerClickShop()}
                                    >
                                        <p style={{
                                            color: "white"
                                        }}>SHOP</p>
                                    </button>
                                </li>
                                <li>
                                    <Link to="/card" style={{
                                        color: "white"
                                    }}>
                                        <p>Cart</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/contact" style={{
                                        color: "white"
                                    }}>
                                        <p>CONTACT</p>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div
                            className={cx('cart')}
                            onClick={() => handleCart()}
                        >
                            <FontAwesomeIcon icon={faBagShopping} color="white" />
                            <div className={cx('amount-product')}>
                                <p>6</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('header__bot')}>
                <div className="container">
                    <div className={cx('header__bot-box')}>
                        <div className={cx('department')}>
                            <FontAwesomeIcon icon={faBars} color="white" />
                            <p>All department</p>
                            <div
                                className={cx('evt-down')}
                                onClick={() => setIsActive(!isActive)}
                            >
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                            {isActive &&
                                <div className={cx('drop-down')}>
                                    <ul className={cx('drop-down-list')}>
                                        {data.map((item) => {
                                            return (
                                                <li key={item.id} onClick={() => handleSelectDepartments(item)} >{item.departments}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            }
                        </div>
                        <div className={cx('search')}>
                            <Search />
                        </div>
                        <div className={cx('contact')} style={{
                            color: "white"
                        }}>
                            <div className={cx('contact-icon')}>
                                <FontAwesomeIcon className={cx('phone-icon')} icon={faPhone} />
                            </div>
                            <div className={cx('contact-detail')}>
                                <p className={cx('phone-num')}>+84 590.401.978</p>
                                <p className={cx('time-contact')}>support 24/7 time</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Header