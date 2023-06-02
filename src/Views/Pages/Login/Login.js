import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Cookies from 'js-cookie';
// import CryptoJS from 'crypto-js';

const cx = classNames.bind(styles);

function Login() {

    const URL = process.env.REACT_APP_URL;
    // const URL = process.env.REACT_APP_URL

    console.log(URL + '/login')

    const [email, setEmail] = useState([])
    const [matkhau, setMatKhau] = useState([])
    const [apis, setApi] = useState([])


    function handerSubmit() {

        // const user = apis.find(user => user.email === email && user.pass == matkhau)


        // if (email == "admin" && matkhau == "123") {
        //     window.location = "/api/admin";
        //     return;
        // }

        // if (!user) return alert('sai tk hoặc mk');

        // window.location = "/";
        // localStorage.setItem('email', email)

        console.log('a')

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "30929e75539a12a71ea783896b3b99f6d93e78ab41a820ae7e5a3477c520b1fbc6205681dd9f3c2f5950177c233ce246d1df8579f2ba091a303f19cb66c99282",
            },
            body: JSON.stringify({
                email: email,
                password: matkhau
            },)
        };


        // Lấy dữ liệu của khách hàng
        fetch(URL + '/shop/login', requestOptions)
            .then((data) => {
                return data.json()
            })
            .then((data) => {
                console.log(data)
                if (data.message === 'Success') {
                    const token = data.metadata.tokens.accessToken
                    const name = data.metadata.shop.name


                    // Khóa bí mật (secret key) - cần được bảo mật cẩn thận
                    const secretKey = 'my-secret-key';

                    //mã hóa token
                    // const encryptedCookie = CryptoJS.AES.encrypt(token, secretKey).toString();

                    Cookies.set('accessToken', JSON.stringify(token), { expires: 7 });
                    Cookies.set('name', JSON.stringify(name), { expires: 7 });


                    // console.log('aa')
                    Cookies.set('id', JSON.stringify(data.metadata.shop._id), { expires: 7 });
                    Cookies.set('timeeexp', JSON.stringify(data.metadata.tokens.timeExp), { expires: 7 });
                    window.location = "/";

                }
                else {
                    alert(data.message)
                }
            });


    }


    return (
        <div className={cx('container')}>
            <div>
                <div className={cx('box')}>
                    <div className={cx('form')}>
                        <div className={cx('all')}>
                            <div className={cx('left')}>
                                <div className={cx('login')}>
                                    Đăng Nhập
                                </div>
                                <div className={cx('titer')}>
                                    By logging in you agree to the ridiculously long terms that you didn't bother to read
                                </div>
                                <div className={cx('taikhoan')}>
                                    Bạn Chưa Có Tài Khoản?
                                    <Link to={'/dangky'}>
                                        <span>
                                            Đăng Ký
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className={cx('rigth')}>
                                <div>
                                    <div className={cx('email')}>
                                        Email
                                    </div>
                                    <div>
                                        <input className={cx('input')}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className={cx('matkhau')}>
                                        Mật Khẩu
                                    </div>
                                    <div>
                                        <input className={cx('input')}
                                            onChange={(e) => setMatKhau(e.target.value)}

                                        />
                                    </div>
                                </div>

                                <div >
                                    <button className={cx('submit')}
                                        onClick={() => handerSubmit()}
                                    >
                                        Submit
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
