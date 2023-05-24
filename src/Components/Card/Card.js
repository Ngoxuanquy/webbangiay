import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Card.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom"

import { faBagShopping, faBars, faChevronDown, faEnvelope, faPhone, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

const Card = (props) => {
    const [lists, setList] = useState([]);

    useEffect(() => {
        setList([...lists, props.props]);
    }, []);

    return (
        <div className={cx('container')}>
            {/* {lists.map((list) => ( */}
            <div className="container">
                <div className={cx('box')}>
                    <div className={cx('card')}>
                        <div className={cx('icon-card')}>
                            <Link to={`/chitiet/${props.props.product_type}/${props.props._id}`} >

                                <img className={cx('img_card')} src={props.props.product_thumb} />
                            </Link >

                            <div className={cx('icon1')}>
                                <FontAwesomeIcon icon={faHeart} className={cx('icon')} />
                            </div>
                            <div className={cx('icon2')}>
                                <FontAwesomeIcon icon={faChevronDown} className={cx('icon')} />
                            </div>
                            <div className={cx('icon3')}>
                                <FontAwesomeIcon icon={faBagShopping} className={cx('icon')} />
                            </div>
                        </div>
                        <div className={cx('text-card')} >
                            <span className={cx('title')} > Dried Fruit </span>
                            <h5 className={cx('name')} >{props.props.product_name}</h5>
                            <div className={cx('Gia')}>
                                {props.props.product_price}
                                <span> ${props.props.product_price} </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ))} */}
        </div >
    );
};

export default Card;
