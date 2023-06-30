import React, { useEffect, useState, useRef } from 'react';
import Cookies from 'js-cookie';
import classNames from 'classnames/bind';
import styles from './profile.module.scss';
import { Card } from '../../../Components';

const cx = classNames.bind(styles);



const Breadcrumb = () => {
    return (
        <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
            <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item"><a href="#">User</a></li>
                <li className="breadcrumb-item active" aria-current="page">User Profile</li>
            </ol>
        </nav>
    );
};

const UserProfileCard = () => {


    const name = Cookies.get('name');

    return (
        <div className="card mb-4" style={{
            marginLeft: 170,
            height: 320
        }}>
            <div className="card-body text-center">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" className="rounded-circle img-fluid" style={{ width: '150px' }} />
                <h5 className="my-3"> {name} </h5>
                <p className="text-muted mb-1">Full Stack Developer</p>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                <div className="d-flex justify-content-center mb-2">
                    {/* <button type="button" className="btn btn-primary"
                        onClick={() => window.location = "/api/create/product"}
                    >Đăng Sản Phẩm</button> */}
                    <button
                        onClick={() => window.location = "/api/select/product"}
                        className={cx('button1')}
                    >
                        Quản Lý
                        <div id="clip" className={cx('clip')}>
                            <div id="leftTop" className={cx("corner1")}></div>
                            <div id="rightBottom" className={cx("corner2")}></div>
                            <div id="rightTop" className={cx("corner3")}></div>
                            <div id="leftBottom" className={cx("corner4")}></div>
                        </div>
                        <span id="rightArrow" className={cx("arrow1")}></span>
                        <span id="leftArrow" className={cx("arrow2")}></span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const SocialLinks = () => {


    return (
        <div className="card mb-4 mb-lg-0">
            <div className="card-body p-0">
                <ul className="list-group list-group-flush rounded-3">
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <i className="fas fa-globe fa-lg text-warning"></i>
                        <p className="mb-0">https://mdbootstrap.com</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <i className="fab fa-github fa-lg" style={{ color: '#333333' }}></i>
                        <p className="mb-0">'a</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <i className="fab fa-twitter fa-lg" style={{ color: '#55acee' }}></i>
                        <p className="mb-0">@mdbootstrap</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <i className="fab fa-instagram fa-lg" style={{ color: '#ac2bac' }}></i>
                        <p className="mb-0">mdbootstrap</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <i className="fab fa-facebook-f fa-lg" style={{ color: '#3b5998' }}></i>
                        <p className="mb-0">mdbootstrap</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

const UserInformation = () => {
    return (
        <div className="card mb-4" style={{
            // marginLeft: 250,
            right: -130,
            height: 320
        }}>
            <div className="card-body" style={{
                height: 80
            }}>
                <div className="row" style={{
                    height: 40,
                    fontSize: 16
                }}>
                    <div className="col-sm-3" style={{
                        marginTop: 10
                    }}>
                        <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9" style={{
                        marginTop: 10
                    }}>
                        <div className={cx("input-container")} style={{
                            marginTop: '-20px'
                        }}>
                            <input
                                // placeholder="Full Name"
                                className={cx("input-field")}
                                type="text"

                            />
                            <label htmlFor="input-field" className={cx("input-label")} style={{
                                marginTop: '0px'
                            }}>
                                Full Name
                            </label>
                            <span className={cx("input-highlight")}></span>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row" style={{
                    height: 40,
                    fontSize: 16
                }}>
                    <div className="col-sm-3">
                        <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                        <div className={cx("input-container")} style={{
                            marginTop: '-10px'
                        }}>
                            <input
                                // placeholder="Full Name"
                                className={cx("input-field")}
                                type="text"

                            />
                            <label htmlFor="input-field" className={cx("input-label")} style={{
                                marginTop: '0px'
                            }}>
                                Email
                            </label>
                            <span className={cx("input-highlight")}></span>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row" style={{
                    height: 40,
                    fontSize: 16
                }}>
                    <div className="col-sm-3">
                        <p className="mb-0">Phone</p>
                    </div>
                    <div className="col-sm-9">
                        <div className={cx("input-container")} style={{
                            marginTop: '-10px'
                        }}>
                            <input
                                // placeholder="Full Name"
                                className={cx("input-field")}
                                type="text"

                            />
                            <label htmlFor="input-field" className={cx("input-label")} style={{
                                marginTop: '0px'
                            }}>
                                Phone
                            </label>
                            <span className={cx("input-highlight")}></span>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row" style={{
                    height: 40,
                    fontSize: 16
                }}>
                    <div className="col-sm-3">
                        <p className="mb-0">Mobile</p>
                    </div>
                    <div className="col-sm-9">
                        <div className={cx("input-container")} style={{
                            marginTop: '-10px'
                        }}>
                            <input
                                // placeholder="Full Name"
                                className={cx("input-field")}
                                type="text"

                            />
                            <label htmlFor="input-field" className={cx("input-label")} style={{
                                marginTop: '0px'
                            }}>
                                Mobile
                            </label>
                            <span className={cx("input-highlight")}></span>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row" style={{
                    height: 40,
                    fontSize: 16
                }}>
                    <div className="col-sm-3">
                        <p className="mb-0">Address</p>
                    </div>
                    <div className="col-sm-9">
                        <div className={cx("input-container")} style={{
                            marginTop: '-10px'
                        }}>
                            <input
                                // placeholder="Full Name"
                                className={cx("input-field")}
                                type="text"

                            />
                            <label htmlFor="input-field" className={cx("input-label")} style={{
                                marginTop: '0px'
                            }}>
                                Địa Chỉ
                            </label>
                            <span className={cx("input-highlight")}></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function Profile() {

    const URL = process.env.REACT_APP_URL

    //apis đã puclic

    const [apipublic, setPublic] = useState([])

    useEffect(() => {

        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const cleanedJwtString = token?.replace(/^"|"$/g, '');
        const cleanId = id?.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'Get',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.REACT_APP_KEY,
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


    return (
        <div className={cx('container')} style={{
            // marginTop: 40
        }}>
            <div className={cx('box')}>
                <div className={cx('Information')} style={{
                    marginTop: 40
                }}>
                    <div className={cx('left')} style={{
                        marginTop: 40
                    }}>
                        <UserProfileCard />
                        {/* <SocialLinks /> */}
                    </div>

                    <div className={cx('rigth')} style={{
                        marginTop: 40
                    }}>
                        <UserInformation />
                        {/* <Breadcrumb /> */}
                    </div>
                </div>

                <div>
                    <div style={{
                        fontSize: 20,
                        padding: 15,
                        fontWeight: 600,
                    }}>
                        Sản Phẩm Khách Hàng Nhìn Thấy

                    </div>

                </div>
            </div>
            <div style={{
            }}
                className={cx('cart')}
            >
                {apipublic && apipublic.map((api) => {
                    return <Card props={api} />;
                })}
            </div>
        </div>
    )
}

export default Profile