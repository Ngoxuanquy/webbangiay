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

    const URL = 'http://localhost:3056/v1/api';

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


    const uploadImage = async () => {
        try {
            const response = await fetch(uploadedImage);
            const blob = await response.blob();
            const filename = uploadedImage.substring(uploadedImage.lastIndexOf('/') + 1);
            const storageRef = firebase.storage().ref().child(`photo/${filename}`);

            const uploadTaskSnapshot = await storageRef.put(blob);
            const downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();


            return downloadURL;
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        uploadImage()
            .then(downloadURL => {
                console.log(downloadURL);
                setImg(downloadURL);

                // Thực hiện các thao tác khác với đường dẫn tải xuống ở đây
            })
            .catch(error => {
                console.log(error);
                // Xử lý lỗi nếu có
            });
    }, [uploadedImage]);

    // Khai báo biến
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [color, setColor] = useState('')
    const [size, setSize] = useState('')



    const handerSubmit = async () => {
        // ...
        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const cleanedJwtString = token.replace(/^"|"$/g, '');
        const cleanId = id.replace(/^"|"$/g, '');

        // Call the uploadImage function and get the image URL
        // const test = await uploadImage()

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '025ce9a805c109871ed8664bea8a8e5403f162daf9d7bfd220b4aee6683993350483959b54538db3dc220fa426f334c9e740c66e068cc9ab03318ab4426f606b',
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
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                window.location = '/api/select/product';
            })
            .catch((error) => {
                console.log(error);
            });

    };

    // Call the uploadImage function when uploadedImage changes
    useEffect(() => {
        uploadImage();
    }, [uploadedImage]);


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
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p style={{
                            fontSize: 16,
                            padding: 2
                        }}>Thả file ảnh vào đây hoặc nhấp để chọn file</p>
                    </div>
                    {uploadedImage && <img src={uploadedImage} alt="Uploaded" style={{
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