import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import classNames from 'classnames/bind';
import styles from './homepage.module.scss';
// import { SlideContent, Card, Blog } from '../../../Components/';
import Card from '../../../Components/Card/Card';
import SlideContent from '../../../Components/SlideContent/SlideContent';
import Blog from '../../../Components/Blog/Blog';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';


const cx = classNames.bind(styles);
const HomePage = () => {

    const URL = 'http://localhost:4000/v1/api';

    const navigate = useNavigate();
    const buttonRef = useRef();
    const [products, setProducts] = useState([]);
    const [product_Tre_Em, setProductTreEm] = useState([]);


    //setting slick slider
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4.5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        cssEase: 'ease-in-out',
    };

    // fake data

    const select = [
        { id: 1, item: 'All' },
        { id: 2, item: 'Váy' },
        { id: 3, item: 'Quần' },
        { id: 4, item: 'Vegetables' },
        { id: 5, item: 'Fastfood' },
    ];



    //Lưu token từ cookie

    // const [token, setToken] = useState()
    const secretKey = 'my-secret-key';

    //lấy dữ liệu product trừ db

    const [apiproduct, setApiProduct] = useState([])

    const getId = async () => {

        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const cleanedJwtString = token.replace(/^"|"$/g, '');

        const header = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "450327199bec52acb64e4cb06e10bd31ac0dd0ea13607023f98e2148d9bee7a3c18267b6d5840b4ae62bc2ca706aa6333b8d82e39a30501a3a96a868cae4e9a1",
                // "authorization": cleanedJwtString,
                // "x-client-id": id
            },
        };

        fetch(URL + '/product/get', header)
            .then((data) => data.json())
            .then((data) => setApiProduct(data.metadata))
    }

    useEffect(() => {
        getId()
    }, [])

    // console.log(product)


    const [product, setProduct] = useState(apiproduct);

    useEffect(() => {
        setProduct(apiproduct)
    }, [apiproduct])

    AOS.init();

    const handleSelect = (value) => {
        let data;
        if (value === 'All') {
            data = apiproduct;
            setProduct(data);
            return;
        }
        data = apiproduct.filter((item) => {
            return item.properties === value;
        });
        setProduct(data);
    };


    return (
        <div className={cx('container')}>
            <div className="container">
                {/* banner */}
                <div className={cx('banner-box')}>
                    <div className={cx('banner')}>
                        <div className={cx('banner-description')}>
                            <p className={cx('name-banner')}>FRUIT FRESH</p>
                            <p className={cx('slogan')}>Vegetable</p>
                            <p className={cx('slogan')}>100% Organic</p>
                            <p className={cx('benefit')}>Free Pickup and Delivery Available</p>
                            <div
                                className={cx('baner-btn')}
                                onClick={() => {
                                    navigate('/shop');
                                }}
                            >
                                Shop now
                            </div>
                        </div>
                        <img src="https://www.elleman.vn/wp-content/uploads/2018/08/13/gi%C3%A0y-sneakers-2-elle-man-8.jpg" alt="Banner" />
                    </div>
                </div>
                {/* slider products */}
                <div className={cx('product-box')}>
                    <Slider {...settings}>
                        {product.map((item) => {
                            return (
                                <div key={item.id} className={cx('list-product__item')}>
                                    <img src={item.image} alt="Product Item" />
                                    {/* <div className={cx('name-product')}>{item.name}</div> */}
                                </div>
                            );
                        })}
                    </Slider>
                </div>
                {/* featured products */}
                <div className={cx('featured-product-box')} >
                    <h2 className={cx('featured-product__heading')}>Giày Thể Thao :)))</h2>
                    <div className={cx('choose-product')} >
                        <ul className={cx('tag-product')} >
                            {select.map((item) => {
                                return (
                                    <li
                                        // ref={buttonRef}
                                        key={item.id}
                                        className={cx('tag-product__item')}
                                        onClick={() => handleSelect(item.item)}
                                    >
                                        {item.item}
                                    </li>
                                );
                            })}
                        </ul>
                        <div className={cx('featured-list')} data-aos="fade-up"
                            data-aos-duration="3000">
                            {product ? (
                                <>
                                    {product.map((product) => {
                                        return <Card props={product} />;
                                    })}
                                </>
                            ) : (
                                <>
                                    <h1 style={{ margin: '0 auto' }}>Not Found This Product or Sold Out</h1>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* featured products */}
                <div className={cx('featured-product-box')}>
                    <h2 className={cx('featured-product__heading')}>Quần Áo Trẻ Em</h2>
                    <div className={cx('choose-product')}>
                        <ul className={cx('tag-product')}>
                            {select.map((item) => {
                                return (
                                    <li
                                        // ref={buttonRef}
                                        key={item.id}
                                        className={cx('tag-product__item')}
                                        onClick={() => handleSelect(item.item)}
                                    >
                                        {item.item}
                                    </li>
                                );
                            })}
                        </ul>
                        <div className={cx('featured-list')}>

                        </div>
                    </div>
                </div>


                {/* sub - banner */}
                <div className={cx('sub-banner')}>
                    <div className={cx('sub-banner__item')}>
                        <img src="https://technext.github.io/ogani/img/banner/banner-1.jpg" alt="Sub Banner" />
                    </div>
                    <div className={cx('sub-banner__item')}>
                        <img src="https://technext.github.io/ogani/img/banner/banner-2.jpg" alt="Sub Banner" />
                    </div>
                </div>
                {/* list content */}
                <div className={cx('list-content__box')}>
                    <SlideContent />
                    <SlideContent />
                    <SlideContent />
                </div>
                <div className={cx('blog')}>
                    <h2 className={cx('blog-heading')}>From The Blog</h2>
                    <div className={cx('list-blog')} data-aos="zoom-out-down">
                        <Blog />
                        <Blog />
                        <Blog />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;