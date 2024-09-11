import React from 'react';
import {useNavigate} from 'react-router-dom';


const RegLog = ({children}) => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login');
    };
    const goToRegistration = () => {
        navigate('/registration');
    };

    const button = {
        fontSize: "30px",
        marginLeft: " 10px",
        padding: " 10px"
    }

    return (
        <header style={{marginTop: "50px", display: "flex", justifyContent: "center",}}>
            <div style={{display: "flex", flexDirection: "column"}}>
                <div>
                    <button style={button} onClick={goToRegistration}>Registration</button>
                    <button style={button} onClick={goToLogin}>Login</button>
                </div>
                <p style={{fontSize: "90px", marginTop: "60%"}}>AutoRia</p>
            </div>
        </header>
    );
};

export {RegLog};
