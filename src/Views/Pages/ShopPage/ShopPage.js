import React, { useEffect, useState, useRef } from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import classNames from 'classnames/bind';
import styles from './shoppage.module.scss';
import Card from '../../../Components/Card/Card';
import SlideContext from '../../../Components/SlideContent/SlideContent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faBars, faChevronDown, faEnvelope, faPhone, faGrid2 } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faBluetooth } from '@fortawesome/free-brands-svg-icons';

import { Link, useNavigate } from 'react-router-dom';

import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import Cookies from 'js-cookie';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';


const cx = classNames.bind(styles);

const ShopPage = () => {
    const ref_slider = useRef();
    const ref_valueMin = useRef();
    const ref_valueMax = useRef();
    const [products, setProducts] = useState([]);
    const URL = 'http://localhost:3056/v1/api';


    const list = [
        { id: 1, departments: 'Fresh Meat' },
        { id: 2, departments: 'Vegetables' },
        { id: 3, departments: 'Fruit & Nut Gifts' },
        { id: 4, departments: 'T-Shirts' },
        { id: 5, departments: 'Fresh Berries' },
        { id: 6, departments: 'Ocean Foods ' },
        { id: 7, departments: 'Butter & Eggs ' },
        { id: 8, departments: 'Fastfood ' },
        { id: 9, departments: 'Fresh Onion ' },
        { id: 10, departments: 'Papayaya & Crisps ' },
    ];

    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    const data = [
        { id: 1, img: 'https://technext.github.io/ogani/img/product/discount/pd-5.jpg', Price: 100, color: 'Green' },
        { id: 2, img: 'https://technext.github.io/ogani/img/product/discount/pd-4.jpg', Price: 300, color: 'Black' },
        { id: 3, img: 'https://technext.github.io/ogani/img/product/discount/pd-3.jpg', Price: 100, color: 'Gray' },
        { id: 4, img: 'https://technext.github.io/ogani/img/product/discount/pd-6.jpg', Price: 400, color: 'Blue' },
        { id: 5, img: 'https://technext.github.io/ogani/img/product/discount/pd-2.jpg', Price: 200, color: 'white' },
        { id: 6, img: 'https://technext.github.io/ogani/img/product/discount/pd-1.jpg', Price: 250, color: 'Red' },
    ];


    const [lists, setList] = useState([]);
    const [prices, setPrices] = useState([]);
    const [hande, setHande] = useState([]);
    const [datas, setData] = useState(products);

    const colors = [
        { id: 1, color: 'white' },
        { id: 2, color: 'Red' },
        { id: 3, color: 'Blue' },
        { id: 4, color: 'Gray' },
        { id: 5, color: 'Black' },
        { id: 6, color: 'Green' },
    ];

    const buttons = [
        { id: 1, item: 'Large' },
        { id: 1, item: 'Medium' },
        { id: 1, item: 'Small' },
        { id: 1, item: 'Tiny' },
    ];

    useEffect(() => {
        noUiSlider.create(document.getElementById('slider'), {
            start: [100, 400],
            connect: true,
            range: {
                min: 100,
                max: 400,
            },
        });

    }, []);

    //khai báo inout range
    const [value, setValue] = useState({ min: 0, max: 100 });

    const handleRangeChange = (newValue) => {
        setValue(newValue);
    };



    const [apiproduct, setApiProduct] = useState([])

    //apis đã puclic

    const [apipublic, setPublic] = useState([])

    useEffect(() => {

        const requestOptions = {
            method: 'Get',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "025ce9a805c109871ed8664bea8a8e5403f162daf9d7bfd220b4aee6683993350483959b54538db3dc220fa426f334c9e740c66e068cc9ab03318ab4426f606b",
                // "authorization": cleanedJwtString,
                // "x-client-id": cleanId
            },
        };

        // Lấy dữ liệu của khách hàng
        fetch(URL + '/product', requestOptions)
            .then((data) => {
                return data.json()
            })
            .then((data) => {
                console.log(data)
                setApiProduct(data.metadata.reverse())
            })
    }, [])

    console.log(apiproduct)


    function unique(arr) {
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
            if (newArr.indexOf(arr[i]) === -1) {
                newArr.push(arr[i]);
            }
        }
        return newArr;
    }

    console.log(apiproduct)


    const b = unique(apiproduct).filter(function (item) {
        return (
            item.product_price >= Number(value.max) && item.product_price >= Number(value.min)
        );
    });

    console.log(b)






    function handerColor(color) {
        alert('click  ' + color);
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

            <div className={cx('row')}>
                <div className={cx('row-left')}>
                    <h2>Department</h2>
                    <ul>
                        {list.map((item, index) => (
                            <div className={cx('ul_departments')}>
                                <li key={item.id}> {item.departments} </li>
                            </div>
                        ))}
                    </ul>
                    <h4 className={cx('Price')}>Price</h4>

                    <div>
                        <div>
                            <InputRange
                                minValue={0}
                                maxValue={100}
                                value={value}
                                onChange={handleRangeChange}
                            />
                            <p>Giá trị nhỏ nhất: {value.min}</p>
                            <p>Giá trị lớn nhất: {value.max}</p>
                        </div>
                        {/* <input type="range" min='0' max='100'  className={cx('range')} /> */}
                        <div id="slider" className={cx('range')} ref={ref_slider} ></div>
                        <div class={cx('text')}>
                            $
                            <span id="kt_slider_basic_min" ref={ref_valueMin}>
                                100
                            </span>
                            -- $
                            <span id="kt_slider_basic_max" ref={ref_valueMax}>
                                300

                            </span>
                        </div>
                    </div>

                    <div>
                        <h2>Colors</h2>
                        <div className={cx('ul-color')}>
                            {colors.map((color, index) => (
                                <div
                                    key={color.id}
                                    onClick={() => {
                                        handerColor(color.color);
                                    }}
                                >
                                    {/* <input type="radio" style={{background: '#D62D2D'}} /> */}
                                    {color.color}
                                    <div
                                        className={cx('fake-color')}
                                        style={{
                                            background: color.color,
                                            width: '15px',
                                            height: '15px',
                                            marginTop: '-20px',
                                            marginLeft: '-20px',
                                            borderRadius: '100px',
                                            border: '0.1px solid black',
                                        }}
                                    >
                                        {' '}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <h2>Popular Size</h2>
                        <div className={cx('fake-button')}>
                            {buttons.map((button, index) => (
                                <div>
                                    <input type="button" value={button.item} />
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '50px' }}>
                            <SlideContext />
                        </div>
                    </div>
                </div>
                <div className={cx('row-right')}>
                    <h2>Sale Off</h2>
                    <Slider {...settings}>
                        {products.map((list, index) => (
                            <div>
                                <Card props={list} />
                            </div>
                        ))}
                    </Slider>
                    <hr />
                    <div className={cx('test')}>
                        <div> Sort By </div>
                        <div className={cx('Default')}> Default </div>
                        <div className={cx('Products')}> 16 Products found </div>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faEnvelope} /> &nbsp;&nbsp;
                            <FontAwesomeIcon icon={faBagShopping} />
                        </div>
                    </div>
                    <span></span>
                    <div className={cx('list-card')}>
                        {b.map((list, index) => (
                            <div>
                                <Card props={list} />
                            </div>
                        ))}
                    </div>
                    <div className={cx('list-card')}>
                        {apiproduct.map((list, index) => (
                            <div>
                                <Card props={list} />
                            </div>
                        ))}
                    </div>

                    <div className={cx('btn-slide')}>
                        <div>
                            <input type="button" value="1" />
                        </div>
                        <div>
                            <input type="button" value="2" />
                        </div>{' '}
                        <div>
                            <input type="button" value="3" />
                        </div>
                        <div>
                            <input type="button" value="->" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
