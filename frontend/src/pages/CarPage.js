import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

import {CarForm} from "../components/CarForm";
import {Cars} from "../components/Cars";
import {Chat} from "../components/Chat";
import {authService} from "../services/authService";

const CarPage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            const data = await authService.getUserDetails();
            if (data.is_superuser || data.is_staff) {
                navigate('/admin_page');
            } else {
                setUser(data);
            }
        };
        fetchUserDetails();
    }, [navigate]);

    if (!user) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h1>Welcome, {user.name}</h1>

            {(user.is_seller || user.is_seller_premium || user.is_superuser || user.is_staff) && (
                <CarForm/>
            )}
            <hr/>
            <Cars/>
            <hr/>
            {(user.is_seller || user.is_seller_premium || user.is_superuser || user.is_staff) && (
                <Chat/>
            )}
        </div>
    );
};

export {
    CarPage
};
