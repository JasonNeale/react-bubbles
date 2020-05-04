import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../axiosWithAuth/axiosWithAuth' 
import {Spinner, Row, Col} from 'reactstrap'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
    // let token = localStorage.getItem('token')
    const [colorList, setColorList] = useState([]);
    let isLoading = false;
  
    useEffect(() => {
        isLoading = true

        setTimeout(() => {
			isLoading = false
        }, 3000)

        axiosWithAuth()
            .get('http://localhost:5000/api/colors')
            .then(res => {
                console.log('[LOG] Axios response (BubblePage->useEffect): ', res.data)
                setColorList(res.data)
                isLoading = false
            })
            .catch(err => {
                isLoading = false
                console.log('[LOG] Axios error (BubblePage->useEffect): ', err)
            })
    }, [])
    
    if (isLoading) {
        return (
            <Spinner color="primary" style={{ width: '48px', height: '48px' }} />
        )
    }

    return (
        <Row>
            <Col><ColorList colors={colorList} updateColors={setColorList} /></Col>
            <Col><Bubbles colors={colorList} /></Col>
        </Row>
    );
};

export default BubblePage;
