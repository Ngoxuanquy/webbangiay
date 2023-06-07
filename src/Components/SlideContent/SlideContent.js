import { Link } from 'react-router-dom'
import { useRef, useEffect, useState, useLayoutEffect } from 'react'

import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Picture1 from "../../assets/Photos/picture1.png"

import classNames from "classnames/bind"
import styles from "./slidecontent.module.scss"

const cx = classNames.bind(styles)

const SlideContent = (props) => {

    const { isSmall } = props

    // console.log(props)

    const [index, setIndex] = useState(0)
    const refCard = useRef()
    const refContent = useRef()
    const sliderLenght = useRef()

    // fake api slideContent
    //b1: built function slice array data -> child array
    // ( child array ) 
    const data = [
        ["T-shirt", "Jeans", "Bomber"],
        ["ManCity", "Manuted", "liverpool"],
        ["U20", "U18", "U19"],
        ["Hot dog", "Snack", "Candy"]
    ]
    //b2: set child array -> data -> component

    useLayoutEffect(() => {
        setTimeout(() => {
            handleNext()
        }, 2000)
    }, [index])


    const handleChangeSlide = (direction) => {
        const widthCard = refCard.current.offsetWidth
        if (direction === 1) {
            setIndex((prev) => prev + 1)
            if (index >= sliderLenght.current) {
                setIndex(0)
            }
            refContent.current.style.transform = `translateX(-${index * widthCard}px)`
        } else if (direction === -1) {
            setIndex((prev) => prev - 1)
            if (index <= 0) {
                setIndex(sliderLenght.current)
            }
            refContent.current.style.transform = `translateX(-${index * widthCard}px)`
        }
    }

    const handleNext = () => {
        handleChangeSlide(1)
    }

    const handlePrev = () => {
        handleChangeSlide(-1)
    }

    return (
        <div className={cx('container', isSmall ? 'small' : '')}>
            <div className={cx('heading')}>
                <h4 className={cx('title')}>Top Rate Products</h4>
                <div className={cx('btn-navigate')}>
                    <button
                        className={cx('btn-prev')}
                        onClick={() => handlePrev()}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                    <button
                        className={cx('btn-next')}
                        onClick={() => handleNext()}
                    >
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                </div>
            </div>
            <div className={cx('content')}>
                <div ref={refContent} className={cx('content-box')}>
                    {
                        data.map((items, index) => {
                            sliderLenght.current = items.length
                            return (
                                <div ref={refCard} key={index} className={cx('card')}>
                                    {
                                        items.map((item, index) => {
                                            return (
                                                <Link key={index} to={"/shop"} className={cx('card-box')}>
                                                    <div className={cx('card-image')}>
                                                        <img src={Picture1} alt="card" />
                                                    </div>
                                                    <div className={cx('card-name')}>
                                                        <p className={cx('name')}>Crab Pool Security</p>
                                                        <p className={cx('price')}>$30.00</p>
                                                    </div>
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default SlideContent