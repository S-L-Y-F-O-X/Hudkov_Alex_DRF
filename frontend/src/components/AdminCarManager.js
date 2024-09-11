import React, {useEffect, useState} from 'react';

import {carService} from "../services/carService";

const AdminCarManager = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
            const response = await carService.getAll();
            setCars(response.data);
        };
        fetchCars();
    }, []);

    const deleteCar = async (carId) => {
        await carService.deleteCar(carId);
        setCars(cars.filter(car => car.id !== carId));
    };

    return (
        <div>
            <h2>Admin - Car Management</h2>
            <ul>
                {cars.map(car => (
                    <li key={car.id}>
          <pre>id:{car.id} {car.brand} {car.model} - {car.price}{car.currency} seller_ID:{car.owner} ->
            <button onClick={() => deleteCar(car.id)}>Delete</button></pre>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export {AdminCarManager};