import React, { useState } from 'react'
import { Col, Row, Card, Button, Form, InputGroup} from 'react-bootstrap'
import {app} from '../firebaseinit'
import {getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { Link } from 'react-router-dom'
import {getFirestore, doc, setDoc} from 'firebase/firestore'

const JoinPage = ({history}) => {
    const auth = getAuth(app);
    const db = getFirestore(app);
    const [form, setForm] = useState({
        email:'red@inha.com',
        password: '12341234'
    });
    const [loading, setLoading] = useState(false);
    const {email, password} = form;
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }

    const onJoin = () => {
        if(!window.confirm('회원 등록?')) return
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
        .then(success => {
            const uid=success.user.uid
            setDoc(doc(db, 'user', uid), {
                email : email,
                name:'홍길동',
                address:'인천 미추홀구 용현5동',
                phone : '010-1234-5678',
                photo:''
            });
            setLoading(false)
            history.push('/login')
        })
        .catch(error => {
            alert('error'+error.message)
        })
    }

    if(loading) return <h1 className='my-5 text-center'>로딩중......</h1>
    return (
        <Row className='my-5 justify-content-center'>
            <Col lg={5} xs={8}>
                <h1 className='text-center mb-5'>회원가입</h1>
                <Card className='p-3'>
                    <Form>
                        <InputGroup className='my-2'>
                            <InputGroup.Text>아 이 디</InputGroup.Text>
                            <Form.Control name="email" onChange={onChange}
                                value={email}/>
                        </InputGroup>
                        <InputGroup className='my-2'>
                            <InputGroup.Text>비밀번호</InputGroup.Text>
                            <Form.Control name="password" onChange={onChange}
                                value={password} type="password"/>
                        </InputGroup>
                        <div className='text-center my-3'>
                            <Button onClick={onJoin}
                                className='w-100'>회원가입</Button>
                        </div>
                    </Form>
                    <div className='text-end'>
                        <Link to="/login">로그인</Link>
                    </div>
                </Card>
            </Col>
        </Row>
    )
}

export default JoinPage