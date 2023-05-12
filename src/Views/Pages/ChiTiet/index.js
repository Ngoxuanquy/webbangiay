import React, { useState, useEffect, useRef } from "react";

import { useParams } from 'react-router-dom';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faFacebook, faTwitter, faInstagram, faBluetooth } from '@fortawesome/free-brands-svg-icons';

import { Link, useNavigate } from 'react-router-dom';

import Card from '../../../Components/Card/Card';



// import { FaStar } from "react-icons/fa";

const cx = classNames.bind(styles);

function ChiTiet() {

    let slug = useParams();

    let soluong = useRef();
    let Hine = useRef();
    let Hine1 = useRef();
    let Description1 = useRef();
    let Reviews1 = useRef();
    let Information1 = useRef();

    const [lists, setList] = useState([]);
    const [so, setSo] = useState(1)
    const [products, setProducts] = useState([]);


    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    useEffect(() => {
        if (slug.slug == "Người Lớn") {
            fetch('http://localhost:4000/api/products/' + slug.id)
                .then(res => res.json())
                .then(res => {
                    setProducts(res)
                })
                .catch(err => console.log(err))
                .finally(() => {
                })
        }
        else if (slug.slug == 'Baby') {
            fetch('http://localhost:4000/api/product_tre_em/' + slug.id)
                .then(res => res.json())
                .then(res => {
                    setProducts(res)
                })
                .catch(err => console.log(err))
                .finally(() => {
                })
        }
    }, [])

    console.log(products)

    useEffect(() => {
        fetch('http://localhost:4000/api/products/')
            .then(res => res.json())
            .then(res => {
                setList(res)
            })
            .catch(err => console.log(err))
            .finally(() => {
            })
    }, [])


    function handerCong() {
        setSo(so + 1);
    }

    function handerTru() {
        setSo(so - 1);
        if (so <= 1) {
            alert('Sản Phẩm Phải Lớn Hớn 1')
            setSo(1)
        }
    }

    function Description() {
        Hine.current.style.display = 'block';
        Hine1.current.style.display = 'block';

        Description1.current.style.color = "#495057"
        Information1.current.style.color = "#999999"
        Reviews1.current.style.color = "#999999"


    }

    function Information() {
        Hine.current.style.display = 'none';
        Hine1.current.style.display = 'block';

        Description1.current.style.color = "#999999"
        Information1.current.style.color = "#495057"
        Reviews1.current.style.color = "#999999"
    }

    function Reviews() {
        Hine1.current.style.display = 'none';
        Description1.current.style.color = "#999999"
        Information1.current.style.color = "#999999"
        Reviews1.current.style.color = "#495057"
    }

    const [id, setId] = useState('')

    const email = localStorage.getItem('email')

    useEffect(() => {
        fetch('http://localhost:4000/api/users/')
            .then(res => res.json())
            .then(res => res.map(re => {
                if (re.email == email) {
                    setId(re.id)
                }
            }))
    }, [])


    const handerAdd = (id1) => {
        if (email == null) {
            const a = window.confirm("Vui Lòng Đăng Nhập Để Mua Hàng!")
            if (a == true) {
                window.location = "/login";
            } else {
                window.location = "/";

            }
        }
        else {
            products.map(list => {
                if (list.id == id1) {
                    fetch('http://localhost:4000/api/orders/create', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: id,
                            img: list.img,
                            price: list.price,
                            tenhang: list.name,
                            name: email,
                            soluong: so
                            // number: number
                        })
                    })
                }
            })
        }
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
            <div className={cx('phu')}>
                {products.map((list) => (
                    <div className={cx('box')}>
                        <div className={cx('left')}>
                            <img src={list.img} />
                        </div>
                        <div className={cx('right')}>
                            <h1>{list.name}</h1>
                            <div className={cx('icon')}>
                                <FontAwesomeIcon icon={faFacebook} />&nbsp;
                                <FontAwesomeIcon icon={faFacebook} />&nbsp;
                                <FontAwesomeIcon icon={faFacebook} />&nbsp;
                                <FontAwesomeIcon icon={faFacebook} />&nbsp;
                                <FontAwesomeIcon icon={faFacebook} />
                            </div>
                            <h1>
                                {list.Price}
                            </h1>
                            <p className={cx('conten')}>
                                Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus.
                            </p>

                            <div className={cx('Amount')}>
                                <div>
                                    <button onClick={() => handerTru()}>-</button>
                                    <input type="text" value={so} ref={soluong} />
                                    <button onClick={() => handerCong()}>+</button>
                                </div>
                                <div className={cx('AddCard')}>

                                    <button
                                        onClick={() => handerAdd(list.id)}
                                    >ADD TO CARD</button>

                                </div>
                            </div>

                            <hr />

                            <table className={cx('table')}>
                                <tr>
                                    <td>
                                        Availability
                                    </td>
                                    <td >
                                        In Stock
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Shipping
                                    </td>
                                    <td>
                                        01 day shipping. <i>Free pickup today </i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Weight
                                    </td>
                                    <td>
                                        0.5 kg
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Share on
                                    </td>
                                    <td>
                                        <FontAwesomeIcon icon={faFacebook} />&nbsp;
                                        <FontAwesomeIcon icon={faFacebook} />&nbsp;
                                        <FontAwesomeIcon icon={faFacebook} />&nbsp;
                                        <FontAwesomeIcon icon={faFacebook} />&nbsp;

                                    </td>
                                </tr>
                            </table>

                        </div>
                    </div>
                ))}
                <div className={cx('slick')}>
                    <Slider {...settings}>
                        {lists.map((list, index) => (
                            <div>
                                <Card props={list} />
                            </div>
                        ))}
                    </Slider>
                </div>

            </div>
            <div className={cx('conten1')}>
                <ul>
                    <li><div></div></li>
                    <li onClick={() => Description()} ref={Description1}>
                        Description
                    </li>
                    <li onClick={() => Information()} ref={Information1}>
                        Information
                    </li>
                    <li onClick={() => Reviews()} ref={Reviews1}>
                        Reviews (1)
                    </li>
                    <li><div></div></li>

                </ul>
                <div>
                    <p>
                        <h1>Products Infomation</h1>
                        Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget tortor risus.
                    </p>
                    <br />
                    <p ref={Hine}>
                        Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Sed porttitor lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus.
                    </p>
                    <p ref={Hine1}>
                        Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Sed porttitor lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.
                    </p>

                </div>

                <div className={cx('SanPhamTuongTu')}>
                    {lists.map((list, index) => (
                        <div>
                            <Card props={list} />
                        </div>
                    ))}
                </div>
            </div>
        </div>




    )
}

export default ChiTiet