import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap'
import { app } from '../firebaseinit'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage'

const MyPage = ({ history }) => {
    const [loading, setLoading] = useState(false);
    const uid = sessionStorage.getItem("uid");
    const db = getFirestore(app);

    const [image, setImage] = useState('https://via.placeholder.com/200x200')
    const [file, setFile] = useState(null);
    
    const [form, setForm] = useState({
        email:sessionStorage.getItem('email'),
        name: '무기명',
        address: '인천 미추홀구 인하로 100',
        phone: '032-860-7144',
        photo: '',
    });

    const { name, address, phone, photo } = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onChangeFile = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0]);
    }

    const getUser = async() => {
        setLoading(true)
        const user = await getDoc(doc(db, 'user', uid))
        console.log(user.data())
        setForm(user.data());
        setLoading(false)
    }

    useEffect(()=>{
        getUser();
    }, [])

    if (loading) return <h1 className='my-5 text-center'>로딩중......</h1>
    return (
        <Row className='my-5'>
            <Col>
                <h1 className='text-center mb-5'>회원정보</h1>
                <Form className='px-3'>
                    <InputGroup className='my-2'>
                        <InputGroup.Text className='px-5'>성 명</InputGroup.Text>
                        <Form.Control value={name}
                            name="name" onChange={onChange} />
                    </InputGroup>
                    <Row>
                        <Col md={10} xs={9}>
                            <InputGroup className='my-2'>
                                <InputGroup.Text className='px-5'>주 소</InputGroup.Text>
                                <Form.Control value={address}
                                    name="address" onChange={onChange} />
                            </InputGroup>
                        </Col>
                    </Row>
                    <InputGroup className='my-2'>
                        <InputGroup.Text className='px-5'>전 화</InputGroup.Text>
                        <Form.Control value={phone}
                            name="phone" onChange={onChange} />
                    </InputGroup>
                    <div>
                        <img className='my-2'
                            src={image} width="20%" />
                        <Form.Control onChange={onChangeFile}
                            type="file" />
                    </div>
                    <div className='text-center my-3'>
                        <Button
                            className='px-5'>정보저장</Button>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}
export default MyPage