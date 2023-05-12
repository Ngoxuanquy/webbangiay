import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './DangKy.module.scss';


const cx = classNames.bind(styles);


function DangKy() {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [re_Pass, setRe_Passs] = useState('')
    const [number, setNumber] = useState('')


    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            pass: pass,
        })
    };

    function handerSubmit() {
        if (pass === re_Pass) {
            fetch('http://localhost:4000/api/users/create', options)
                .then(() => {
                    fetch('http://localhost:4000/api/thanhtoan/create', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: email,
                            number: number
                        })
                    })

                })
                .finally(() => {
                    window.location = "/login";
                })

        }
        else {
            alert('sai mk')
        }

    }

    return (
        <div className={cx('container')}>
            <div>
                <div className={cx('box')}>
                    <div className={cx('form')}>
                        <div className={cx('all')}>
                            <div className={cx('left')}>
                                <div className={cx('login')}>
                                    Đăng Ký
                                </div>
                                <div className={cx('titer')}>
                                    By logging in you agree to the ridiculously long terms that you didn't bother to read
                                </div>
                                <div className={cx('taikhoan')}>
                                    Bạn Chưa Có Tài Khoản?
                                    <Link to={'/login'}>
                                        <span>
                                            Đăng Nhập
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
                                            onChange={(e) => setPass(e.target.value)}

                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className={cx('matkhau')}>
                                        Mật Lại Mật Khẩu
                                    </div>
                                    <div>
                                        <input className={cx('input')}
                                            onChange={(e) => setRe_Passs(e.target.value)}

                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className={cx('matkhau')}>
                                        Số Điện Thoại
                                    </div>
                                    <div>
                                        <input className={cx('input')}
                                            onChange={(e) => setNumber(e.target.value)}

                                        />
                                    </div>
                                </div>

                                <div >
                                    <button className={cx('submit')} onClick={() => handerSubmit()}>
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

export default DangKy
