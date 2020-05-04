import React, {useState} from "react";
import { Spinner, Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import {axiosWithAuth} from '../axiosWithAuth/axiosWithAuth' 
import { useHistory } from "react-router-dom"



const Login = ( props ) => {
    // make a post request to retrieve a token from the api
    // when you have handled the token, navigate to the BubblePage route
    const history = useHistory()
    let isLoading = false
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })
    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
        console.log('[LOG] credentials" ', credentials)
    }

    localStorage.setItem('user', credentials.username)

    const handleSubmit = (e) => {
        e.preventDefault()
        isLoading = true

        axiosWithAuth()
            .post('login', credentials)
            .then(res => {
                console.log('[LOG] Axios response (handleSubmit): ', res.data.payload)
                localStorage.setItem('token', res.data.payload)
                setCredentials(credentials)
                history.push("/bubbles")
                isLoading = false
            })
            .catch(err => {
                localStorage.removeItem("token")
                console.log("[LOG] Axios Error (handleSubmit): ", err)
                isLoading = false
            }, [])
    }

    if (isLoading) {
        return (
            <Spinner color="primary" style={{ width: '48px', height: '48px' }} />
        )
    }



    return (
        <Row className="m-t-60">
            <Col md="4"></Col>
            <Col md="4">
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="username">Username:</Label>
                        <Input
                            type="text"
                            name="username"
                            id="username"
                            value={credentials.username}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Password:</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            value={credentials.password}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <Button color="success">Login</Button>
                </Form>
            </Col>
            <Col md="4"></Col>
        </Row>
    );
};

export default Login;
