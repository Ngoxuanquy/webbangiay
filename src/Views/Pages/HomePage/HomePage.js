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

    const URL = process.env.REACT_APP_URL

    const navigate = useNavigate();
    const buttonRef = useRef();
    const [products, setProducts] = useState([]);
    const [product_Tre_Em, setProductTreEm] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    //xử lý hiệu ứng loadinh đầu vào 
    useEffect(() => {
        const timer = setInterval(() => {
            setIsLoading(false);
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    }, []);

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

    //apis đã puclic

    const [apipublic, setPublic] = useState([])

    useEffect(() => {

        const requestOptions = {
            method: 'Get',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "30929e75539a12a71ea783896b3b99f6d93e78ab41a820ae7e5a3477c520b1fbc6205681dd9f3c2f5950177c233ce246d1df8579f2ba091a303f19cb66c99282",
                // "authorization": cleanedJwtString,
                // "x-client-id": cleanId
            },
        };

        // Lấy dữ liệu của khách hàng
        fetch(URL + '/product/1', requestOptions)
            .then((data) => {
                return data.json()
            })
            .then((data) => {
                console.log(data)
                setApiProduct(data.metadata.reverse())
                setPublic(data.metadata)
                // setIsLoading(false);

            })
    }, [])


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
            {isLoading &&
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 1
                }}>
                    <iframe src="https://embed.lottiefiles.com/animation/144353" style={{
                        height: "100vh", /* Set the height to 100% of the viewport height */
                        width: "98.9vw",
                    }}></iframe>
                </div>
            }
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
                        <img src="https://photo-cms-tpo.epicdn.me/w890/Uploaded/2023/zatmzz/2015_11_12/1_NBBR.jpg" className={cx('img_home')} alt="Banner" />
                    </div>
                </div>
                {/* slider products */}
                <div className={cx('product-box')}>
                    <Slider {...settings}>
                        {apipublic.map((item) => {
                            return (
                                <div key={item._id} className={cx('list-product__item')}>
                                    <img src={item.product_thumb} alt="Product Item" />
                                    {/* <div className={cx('name-product')}>{item.name}</div> */}
                                </div>
                            );
                        })}
                    </Slider>
                </div>
                {/* featured products */}
                <div className={cx('featured-product-box')} >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <h2 className={cx('featured-product__heading')}>Sản Phẩm Bán Chạy</h2>
                        {/* <iframe src="https://embed.lottiefiles.com/animation/144238"
                            style={{
                                height: '70px',
                                width: '100px',
                                position: 'absolute',
                                right: '30%'
                            }}
                        ></iframe> */}
                    </div>
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
                    <h2 className={cx('featured-product__heading')}>Sản Phẩm Giảm Giá</h2>
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


                {/* sub - banner */}
                <div className={cx('sub-banner')}>
                    <div className={cx('sub-banner__item')} data-aos="zoom-out-right">
                        {/* <img src="https://lottiefiles.com/145040-dinosaur-sticker" alt="Sub Banner" /> */}
                        <iframe src="https://embed.lottiefiles.com/animation/144943"></iframe>

                    </div>
                    <div className={cx('sub-banner__item')} data-aos="zoom-out-down">
                        {/* <img src="https://lottiefiles.com/144943-walking-chicken" alt="Sub Banner" /> */}
                        <iframe src="https://embed.lottiefiles.com/animation/144749"></iframe>

                    </div>
                    <div className={cx('sub-banner__item')}>
                        {/* <img src="https://lottiefiles.com/144943-walking-chicken" alt="Sub Banner" /> */}
                        <iframe src="https://embed.lottiefiles.com/animation/145040" data-aos="zoom-out-left"></iframe>

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
