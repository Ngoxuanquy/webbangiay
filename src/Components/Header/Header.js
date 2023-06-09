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

import { SideSheet, Paragraph, Button } from 'evergreen-ui';

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

    const [isShown, setIsShown] = useState(false)

    return (
        <div className={cx('container')}>
            <div className={cx('header__top')}>
                <div className="container">
                    <div className={cx('header__top-box')}>
                        <div className={cx('left-side')}>
                            <div className={cx('mail')}>
                                <FontAwesomeIcon icon={faEnvelope} style={{
                                    color: 'black',
                                }} />
                                <p style={{
                                    color: 'black',
                                    marginTop: '10px'
                                }}>
                                    {email}
                                </p>
                            </div>
                            <div className={cx('separate')}></div>
                            <div className={cx('slogan')}>
                                <p style={{
                                    color: 'black',
                                    marginTop: '10px'
                                }}>Free Shipping for all Order </p>
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
                                <p style={{
                                    color: 'black',
                                    marginTop: '10px'
                                }}>
                                    English</p>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                            <div className={cx('separate')}></div>
                            <div className={cx('authentication')}>
                                {img ?
                                    <img src={img} />
                                    :
                                    <FontAwesomeIcon icon={faUser} />

                                }

                                {/* {name == null ?
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
                                } */}
                                <SideSheet
                                    isShown={isShown}
                                    onCloseComplete={() => setIsShown(false)}
                                    preventBodyScrolling
                                    style={{
                                        backgroundColor: 'red',
                                        width: '100px',
                                        height: '100%',
                                    }}
                                >
                                    {/* <div className={cx('menu_an')}>
                                        <div style={{
                                            width: '100%',
                                            backgroundColor: 'white',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <Link to="/profile">

                                                <div style={{
                                                    fontSize: 15,
                                                    // textAlign: 'center',
                                                    // marginBottom: 10,
                                                    marginTop: 10,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    // textAlign: 'center',
                                                }}>
                                                    <div style={{
                                                        textAlign: 'center',
                                                        // width: '70%',
                                                        borderBottom: '1px solid black',

                                                    }}>
                                                        Thông Tin Cá Nhân
                                                    </div>
                                                </div>
                                                /</Link>
                                            <div style={{
                                                fontSize: 15,
                                                textAlign: 'center',
                                                marginBottom: 10,
                                                borderBottom: '1px solid black',
                                                // width: '70%',

                                            }}>
                                                Đặt Lại Mật Khẩu
                                            </div>
                                            <div style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                fontSize: 25,
                                                textAlign: 'center',
                                                // marginBottom: 10,
                                            }}>
                                                <button
                                                    onClick={() => handerLogin()}
                                                    style={{
                                                        border: 'none',
                                                        // width: 200
                                                        borderBottom: '1px solid black',
                                                        backgroundColor: 'white',
                                                        width: '100%',
                                                        marginTop: '40px'
                                                    }}
                                                >
                                                    <div style={{
                                                        fontSize: 20,
                                                        textAlign: 'center',
                                                        // marginBottom: 10,
                                                    }}

                                                    >
                                                        Đăng Xuất
                                                    </div>
                                                </button>
                                            </div>

                                        </div> */}

                                    <nav>
                                        {/* <input type="checkbox" name="open" id="open" style={{
                                            color: 'black'
                                        }} /> */}
                                        {/* <label for="open" class="open">
                                            <i class="fa fa-bars"></i>
                                        </label> */}
                                        <div className={cx("menu_fake1")}>
                                            <div className={cx("logo")} >
                                                <a href="#">
                                                    <img src="logo.png" alt="" />
                                                </a>
                                            </div>
                                            <ul style={{
                                                color: 'white',
                                                listStyle: "none",

                                            }}
                                                className={cx('ul')}
                                            >
                                                <li className={cx('li')}>
                                                    <a href="/" style={{
                                                        color: 'white',
                                                        fontSize: '20px',
                                                        textDecoration: 'none'
                                                    }}>
                                                        <span >
                                                            <i class="fa fa-home"></i>
                                                        </span>
                                                        <span style={{
                                                            marginLeft: '10px'
                                                        }}>
                                                            Home
                                                        </span>
                                                    </a>
                                                </li>
                                                <li className={cx('li')}>
                                                    <a href="#" style={{
                                                        color: 'white',
                                                        fontSize: '20px',
                                                        textDecoration: 'none'

                                                    }}>
                                                        <span><i class="fa fa-address-card"></i></span>
                                                        <span style={{
                                                            marginLeft: '10px'
                                                        }}>

                                                            About
                                                        </span>
                                                    </a>
                                                </li>
                                                <li className={cx('li')}>

                                                    <a href="#" style={{
                                                        color: 'white',
                                                        fontSize: '20px',
                                                        textDecoration: 'none'

                                                    }}>
                                                        <span><i class="fa fa-cog"></i></span>
                                                        <span style={{
                                                            marginLeft: '10px'
                                                        }}>
                                                            Settings
                                                        </span>
                                                    </a>
                                                </li>

                                                <li className={cx('li')}>
                                                    <a href="#" style={{
                                                        color: 'white',
                                                        fontSize: '20px',
                                                        textDecoration: 'none'

                                                    }}>
                                                        <span><i class="fa fa-address-book"></i></span>
                                                        <span style={{
                                                            marginLeft: '10px'
                                                        }}>
                                                            Contact
                                                        </span>
                                                    </a>
                                                </li>
                                                {/* <Link to="/" > */}
                                                <li className={cx('li')}>

                                                    <a href="/profile" style={{
                                                        color: 'white',
                                                        fontSize: '20px',
                                                        textDecoration: 'none'

                                                    }}>
                                                        <span><i class="fa fa-fw fa-address-book" aria-hidden="true"></i></span>
                                                        <span style={{
                                                            marginLeft: '10px'
                                                        }}>
                                                            Thông tin cá nhân
                                                        </span>
                                                    </a>
                                                </li>
                                                {/* </Link> */}
                                                {/* <Link to="/login" > */}

                                                <li className={cx('li')}>
                                                    <a href="/login" style={{
                                                        color: 'white',
                                                        fontSize: '20px',
                                                        textDecoration: 'none'

                                                    }}>
                                                        <span><i class="fa fa-fw fa-sign-in" aria-hidden="true"></i></span>
                                                        <span style={{
                                                            marginLeft: '10px'
                                                        }}>
                                                            <button
                                                                style={{
                                                                    backgroundColor: "#212121",
                                                                }}
                                                                onClick={() => handerLogin()}
                                                            >
                                                                <div style={{
                                                                    color: 'white',
                                                                    fontSize: '20px',
                                                                    textDecoration: 'none'
                                                                }}>
                                                                    Đăng Xuất
                                                                </div>
                                                            </button>
                                                        </span>
                                                    </a>
                                                </li>
                                                {/* </Link> */}
                                            </ul>
                                        </div>
                                    </nav>
                                    {/* </div> */}

                                </SideSheet >
                                {name != null ?
                                    <Button onClick={() => setIsShown(true)}>{name}</Button>
                                    :
                                    <Button onClick={() => handerLogin()}>Đăng Nhập</Button>
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
            </div >
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
                                    <Link to="/" >
                                        <p style={{
                                            color: "white",
                                            marginTop: '20px'
                                        }}>HOME</p>
                                    </Link>
                                </li>
                                <li style={{
                                    border: "none",
                                    fontWeight: 700,
                                    fontSize: "15px",
                                    color: "white",
                                    marginTop: '20px'
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
                                        color: "white",
                                        marginTop: '40px'

                                    }}>
                                        <p style={{
                                            color: "white",
                                            marginTop: '20px'

                                        }}>Cart</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/contact" style={{
                                        color: "white",
                                        marginTop: '40px'

                                    }}>
                                        <p style={{
                                            color: "white",
                                            marginTop: '20px'
                                        }}>CONTACT</p>
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
                                <p style={{
                                    color: "white"
                                }}>6</p>
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
                                <FontAwesomeIcon className={cx('phone-icon')} icon={faPhone} color="white" />
                            </div>
                            <div className={cx('contact-detail')}>
                                <p className={cx('phone-num')} >+84 590.401.978</p>
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