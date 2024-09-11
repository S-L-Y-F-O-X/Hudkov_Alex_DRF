import {useEffect, useState} from "react";

import {carService} from "../services/carService";
import {authService} from "../services/authService";
import {socketService} from "../services/socketService";
import {Car} from "./Car";

const Cars = () => {
    const [cars, setCars] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCars = async () => {
            const {data} = await carService.getAll();
            setCars(data);
        };
        fetchCars();
    }, [trigger]);

    useEffect(() => {
        const socketInit = async () => {
            const {car} = await socketService();
            const client = await car();

            client.onopen = () => {
                client.send(
                    JSON.stringify({
                        action: "subscribe_to_car_activity",
                        request_id: new Date().getTime(),
                    })
                );
            };

            client.onmessage = () => {
                setTrigger(prev => !prev);
            };

            return () => {
                client.close();
            };
        };

        socketInit();
    }, []);


    useEffect(() => {
        const fetchUserDetails = async () => {
                const userData = await authService.getUserDetails();
                setUser(userData);
        };

        fetchUserDetails();
    }, []);

    const handleDelete = async (id) => {

            await carService.deleteCar(id);
            setTrigger(prev => !prev);
    };

    if (!user) {
        return <div>{error ? error : "Loading user details..."}</div>;
    }

    return (
        <div>
            {cars.map(car => (
                <Car key={car.id} car={car} onDelete={handleDelete} user={user}/>
            ))}
        </div>
    );
};

export {Cars};