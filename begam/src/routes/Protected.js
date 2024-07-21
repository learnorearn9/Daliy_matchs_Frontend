import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Protected = ({ component: Component }) => {
    const authToken = useSelector(state => state.token);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authToken) {
            navigate('/login');
        }
    }, [authToken, navigate]);

    return authToken ? <Component /> : null;
};

export default Protected;
