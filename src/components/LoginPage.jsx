import React, { useState } from 'react'
import { Row, Col, Form, InputGroup, Card, Button } from 'react-bootstrap'
import { app } from '../firebaseinit';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Link } from 'react-router-dom'

const LoginPage = ({history}) => {
    const [loading, setLoading] = useState(false)

    const auth = getAuth(app);

    const [form, setForm] = useState({
        email: '12204165@inha.edu',
        password: '123456789'
    })

    const { email, password } = form

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onLogin = () => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then(success => {
                sessionStorage.setItem('email',email)
                alert('Success')
                setLoading(false)
                history.push('/');
            })
            .catch(error => {
                alert('Error' + error.message);
                setLoading(false)
            });
    }

    if (loading) return <h1 className='text-center'>Loading</h1>

    return (
        <Row className='justify-content-center my-5'>
            <Col md={5}>
                <h1 className='text-center'>Login</h1>
                <Card className='p-3'>
                    <Form>
                        <InputGroup className='my-3'>
                            <InputGroup.Text>e-mail</InputGroup.Text>
                            <Form.Control name="email" onChange={onChange} value={email} />
                        </InputGroup>
                        <InputGroup className='my-3'>
                            <InputGroup.Text>password</InputGroup.Text>
                            <Form.Control name="password" onChange={onChange} value={password} type='password' />
                        </InputGroup>
                        <Button onClick={onLogin} className='w-100'>Login</Button>
                    </Form>
                    <div className='text-end'>
                        <Link to="/join">회원가입</Link>
                    </div>
                </Card>
            </Col>
        </Row>
    )
}

export default LoginPage