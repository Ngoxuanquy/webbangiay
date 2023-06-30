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
import Cookies from 'js-cookie';
import { Button, toaster } from 'evergreen-ui'

// import { FaStar } from "react-icons/fa";

const cx = classNames.bind(styles);

function ChiTiet() {

    const { productId } = useParams()

    console.log(productId)

    let soluong = useRef();
    let Hine = useRef();
    let Hine1 = useRef();
    let Description1 = useRef();
    let Reviews1 = useRef();
    let Information1 = useRef();

    const [lists, setList] = useState([]);
    const [so, setSo] = useState(1)


    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

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

    const name = localStorage.getItem('name')
    // const [product, setproduct] = useState()
    const [products, setProduct] = useState([])

    const URL = process.env.REACT_APP_URL

    useEffect(() => {

        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        // const cleanedJwtString = token ? token.replace(/^"|"$/g, '') : "";
        const cleanId = id ? id.replace(/^"|"$/g, '') : "";
        setId(cleanId)

        const requestOptions = {
            method: 'Get',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.REACT_APP_KEY,
                // "authorization": cleanedJwtString,
                // "x-client-id": cleanId
            },
        };

        // Lấy dữ liệu của khách hàng
        fetch(URL + '/product/byId/' + productId, requestOptions)
            .then((data) => {
                return data.json()
            })
            .then((data) => {
                setProduct([data.metadata])

            })
    }, [])

    // const [so, setSo] = useState(1);


    function handerCong() {
        console.log('aaa')
        setSo(so + 1);
    }

    function handerTru() {
        if (so > 1) {
            setSo(so - 1);
        }
        else {
            alert('Sản Phẩm Phải Lớn hơn 1')
        }
    }

    // console.log(products[0].product_shop)
    const handerAdd = (productId, userId, event) => {
        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');


        let updatedProducts = products.map(product => ({
            ...product,
            quantity: so,
            productId: products[0]._id,
        }));
        const cleanId = id ? id.replace(/^"|"$/g, '') : '';

        // if (cleanId == userId) {
        //     alert('Sản Phẩm này của bạn, không mua được')
        // }
        if (!token) {
            alert('Bạn phải đăng nhập để mua hàng!!');
            window.location = '/login';
        }
        else if (cleanId == userId) {
            event.preventDefault();
            alert('Sản Phẩm này của bạn, không mua được')
        }
        else {
            const cleanedJwtString = token ? token.replace(/^"|"$/g, '') : '';
            const cleanId = id ? id.replace(/^"|"$/g, '') : '';

            const requestOptions = {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": process.env.REACT_APP_KEY,
                    "authorization": cleanedJwtString,
                    "x-client-id": cleanId
                },
                body: JSON.stringify({
                    userId: cleanId,
                    shopId: products[0].product_shop,
                    product: updatedProducts[0]
                })
            };

            // Lấy dữ liệu của khách hàng
            fetch(URL + '/cart', requestOptions)
                .then((data) => {

                    toaster.success(() => {
                        <button>
                            Thêm vào của hàng thành công
                        </button>
                    },
                        {
                            duration: 3,
                            description: 'Connect your source to a destination to receive data.',
                        }
                    )
                    // window.location = "/card";

                    // toaster.notify(({ onClose }) => (
                    //     <div>
                    //         <span>My custom toaster</span>
                    //         <button onClick={onClose}>Close me please</button>
                    //     </div>
                    // ));


                    // return data.json()
                })


        }
    }

    console.log(products)



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
                {products.map(product => (

                    <div className={cx('box')}>
                        <div className={cx('left')}>
                            <img src={product.product_thumb} className={cx('img')} />
                        </div>
                        <div className={cx('right')}>
                            <h1>{product.product_name}</h1>
                            <div className={cx('icon')}>
                                <FontAwesomeIcon icon={faFacebook} />&nbsp;
                                <FontAwesomeIcon icon={faFacebook} />&nbsp;
                                <FontAwesomeIcon icon={faFacebook} />&nbsp;
                                <FontAwesomeIcon icon={faFacebook} />&nbsp;
                                <FontAwesomeIcon icon={faFacebook} />
                            </div>
                            <h1>
                                {product.product_price}
                            </h1>
                            <p className={cx('conten')}>
                                Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus.
                            </p>

                            <div className={cx('Amount')}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}>
                                    <button onClick={() => handerTru()}>-</button>
                                    <input type="text" value={so} ref={soluong} style={{
                                        marginTop: "0px"
                                    }} />
                                    <button onClick={() => handerCong()}>+</button>
                                </div>
                                {id == product.product_shop ? <>
                                    <div style={{
                                        opacity: 0.5,
                                        cursor: "not-allowed",
                                        marginLeft: 20
                                    }}
                                        title="Sản phẩm của bạn, không thể mua!!!"
                                    >
                                        <button style={{
                                            opacity: 1,
                                            cursor: "not-allowed",
                                            width: 120,
                                            backgroundColor: "#28a745",
                                            color: "#fff"
                                        }}
                                        >ADD TO CARD</button>

                                    </div>
                                </> :
                                    <div className={cx('AddCard')}>

                                        <button
                                            onClick={(event) => handerAdd(product._id, product.product_shop, event)}
                                            style={{
                                                color: "#fff"

                                            }}
                                        >ADD TO CARD</button>

                                    </div>
                                }
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
                        {products.map((list, index) => (
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
                    {products.map((list, index) => (
                        <div>
                            <Card props={list} />
                        </div>
                    ))}
                </div>
            </div>
        </div >




    )
}

export default ChiTiet