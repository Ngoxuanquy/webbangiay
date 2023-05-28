import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import classNames from "classnames/bind"
import styles from "./blog.module.scss"


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBagShopping, faBars, faChevronDown, faEnvelope, faCalendar, faComment } from "@fortawesome/free-solid-svg-icons"
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons"


const cx = classNames.bind(styles)

const Blog = (props) => {

    return (
        <div className={cx('container')}>
            <div className="container">
                <div className={cx('box')}>
                    <div className={cx('blog')}>
                        <img className={cx('img-blog')} src="https://technext.github.io/ogani/img/blog/blog-1.jpg" />
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faCalendar} />May 4,2019 &ensp;&ensp;
                            <FontAwesomeIcon icon={faComment} /> 5
                        </div>

                        <h3>Cooking tips make cooking simple</h3>
                        <p>Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat</p>

                        <button> READ MORE </button>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default Blog