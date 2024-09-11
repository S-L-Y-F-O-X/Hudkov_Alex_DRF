import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {authService} from '../services/authService';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('buyer');
    const [isSellerPremium, setIsSellerPremium] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        surname: '',
        age: '',
        phone_number: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const userData = {
            ...formData,
            is_buyer: role === 'buyer',
            is_seller: role === 'seller',
            is_seller_premium: isSellerPremium
        };

        try {
            await authService.registr(userData);
            navigate('/login');
        } catch (error) {
            console.error('Error registering user:', error);
            setErrors(error.response.data || {});
        }
    };
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <div style={{color: 'red'}}>{errors.email}</div>}
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <div style={{color: 'red'}}>{errors.password}</div>}
                </div>

                <div>
                    <label>name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    {errors.name && <div style={{color: 'red'}}>{errors.name}</div>}
                </div>
                <div>
                    <label>surname:</label>
                    <input
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        required
                    />
                    {errors.surname && <div style={{color: 'red'}}>{errors.surname}</div>}
                </div>
                <div>
                    <label>Phone_number:</label>
                    <input
                        type="tel"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        required
                    />
                    {errors.phone_number && <div style={{color: 'red'}}>{errors.phone_number}</div>}
                </div>
                <div>
                    <label>age:</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                    {errors.age && <div style={{color: 'red'}}>{errors.age}</div>}
                </div>
                <hr/>
                <div>
                    <label>Register as:</label>
                    <div>
                        <input
                            type="radio"
                            id="buyer"
                            name="role"
                            value="buyer"
                            checked={role === 'buyer'}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        <label htmlFor="buyer">Buyer</label>
                    </div>
                    <br/>
                    <div>
                        <input
                            type="radio"
                            id="seller"
                            name="role"
                            value="seller"
                            checked={role === 'seller'}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        <label htmlFor="seller">Seller</label>
                    </div>
                </div>
                {role === 'seller' && (
                    <div>
                        <input
                            type="checkbox"
                            id="sellerPremium"
                            checked={isSellerPremium}
                            onChange={(e) => setIsSellerPremium(e.target.checked)}
                        />
                        <label htmlFor="sellerPremium">$$$Buy premium$$$</label>
                    </div>
                )}
                <button type="submit">Registor</button>
            </form>
        </div>
    );
};

export {
    RegisterPage
};