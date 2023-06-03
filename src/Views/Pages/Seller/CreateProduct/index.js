import React, { useEffect, useState, useRef } from 'react';
import Left from '../../../../Components/Left/index'

import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import Cookies from 'js-cookie';
import { firebase } from '../../../../config/config'

const cx = classNames.bind(styles);


function Index() {

    const URL = process.env.REACT_APP_URL

    const [apis, setApi] = useState([]);
    const [uploadedImage, setUploadedImage] = useState(null);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = () => {
            setUploadedImage(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const name_local = Cookies.get('name');

    // Chuyển ảnh thành đường dẫn
    const [img, setImg] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');

    // const uploadImage = async () => {
    //     try {
    //         const response = await fetch(uploadedImage);
    //         const blob = await response.blob();
    //         const filename = uploadedImage ? uploadedImage.substring(uploadedImage.lastIndexOf('/') + 1) : '';
    //         const storageRef = firebase.storage().ref().child(`photo/${filename}`);

    //         const uploadTaskSnapshot = await storageRef.put(blob);
    //         const downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();

    //         return downloadURL;
    //     } catch (error) {
    //         throw error;
    //     }
    // };

    const handerSubmit = async () => {
        try {
            const token = Cookies.get('accessToken');
            const id = Cookies.get('id');
            const cleanedJwtString = token.replace(/^"|"$/g, '');
            const cleanId = id.replace(/^"|"$/g, '');

            // Call the uploadImage function and get the image URL
            // const imgURL = await uploadImage();

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': '30929e75539a12a71ea783896b3b99f6d93e78ab41a820ae7e5a3477c520b1fbc6205681dd9f3c2f5950177c233ce246d1df8579f2ba091a303f19cb66c99282',
                    authorization: cleanedJwtString,
                    'x-client-id': cleanId,
                },
                body: JSON.stringify({
                    product_name: name,
                    product_price: Number(price),
                    product_description: description,
                    product_type: selectedOption,
                    product_quantity: Number(quantity),
                    product_thumb: img,
                    product_attributes: {
                        manufacturer: 'quy',
                        color: color,
                        size: size,
                    }
                })
            };

            fetch(URL + '/product', requestOptions)
                .then(() => {
                    window.location = '/api/select/product';
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('container')}>
            <div>
                <div className={cx('header')}>
                    <Link to={'/login'}>
                        <div className={cx('login')}>
                            {name_local}
                        </div>
                    </Link>
                </div>
                <div className={cx('left')}>
                    <Left />
                </div>
            </div>

            <div className={cx('rigth')}>
                <div style={{
                    padding: 10
                }}>
                    <div style={{
                        fontSize: 22
                    }}>
                        Sản Phẩm
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 20
                    }}>
                        <div style={{
                            fontSize: 16,
                            width: 130
                        }}>
                            Tên Sản Phẩm

                        </div>
                        <input style={{
                            width: 300,
                            height: 30,
                            // marginLeft: 20
                        }}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                    <div style={{
                        fontSize: 16,
                        width: 130,
                        marginLeft: 10
                    }}>
                        Giá

                    </div>
                    <input style={{
                        width: 300,
                        height: 30,
                        // marginLeft: 20
                    }}
                        onChange={(e) => setPrice(e.target.value)}

                    />
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 10

                }}>
                    <div style={{
                        fontSize: 16,
                        width: 130,
                        marginLeft: 10,
                    }}>
                        Hình Ảnh

                    </div>
                    <input style={{
                        width: 300,
                        height: 30,
                        // marginLeft: 20
                    }}
                        onChange={(e) => setImg(e.target.value)}

                    />
                    {/* <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p style={{
                            fontSize: 16,
                            padding: 2
                        }}>Thả file ảnh vào đây hoặc nhấp để chọn file</p>
                    </div> */}
                    {img && <img src={img} alt="Uploaded" style={{
                        width: 200,
                        height: 200
                    }} />}
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                    <div style={{
                        fontSize: 16,
                        width: 130,
                        marginLeft: 10
                    }}>
                        Ghi Chú

                    </div>
                    <input style={{
                        width: 300,
                        height: 30,
                    }}
                        onChange={(e) => setDescription(e.target.value)}

                    />
                </div>

                (
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: 18,
                    marginBottom: 10

                }}>
                    <div style={{
                        width: 130,
                        marginLeft: 10,
                    }}>
                        Thể Loại
                    </div>
                    <select value={selectedOption} onChange={handleChange}>
                        <option value="">--- Chọn ---</option>
                        <option value="Electronics">Giày Thể Thao</option>
                        <option value="Clothing">Giày Đi Bộ</option>
                        <option value="Furniture">Giày Đị Chơi</option>
                    </select>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: 10
                }}>
                    <div style={{
                        fontSize: 16,
                        width: 130,
                        marginLeft: 10
                    }}>
                        Size

                    </div>
                    <input style={{
                        width: 300,
                        height: 30,
                    }}
                        onChange={(e) => setSize(e.target.value)}

                    />
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: 10
                }}>
                    <div style={{
                        fontSize: 16,
                        width: 130,
                        marginLeft: 10
                    }}>
                        Màu

                    </div>
                    <input style={{
                        width: 300,
                        height: 30,
                    }}
                        onChange={(e) => setColor(e.target.value)}

                    />
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                    <div style={{
                        fontSize: 16
                    }}>
                        Số Lượng Trong Kho

                    </div>
                    <input style={{
                        width: 300,
                        height: 30,
                        marginLeft: 20
                    }}
                        onChange={(e) => setQuantity(e.target.value)}

                    />
                </div>

                <div style={{
                    marginLeft: 20,
                    padding: 10
                }}>
                    <div>
                        <button style={{
                            padding: 5,
                            fontSize: 18
                        }}
                            onClick={() => handerSubmit()}
                        >
                            Xác Nhận
                        </button>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Index