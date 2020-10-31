import {useState, useEffect} from 'react';
import Form from "../../components/Form/Form"
import API from "../../utils/API"
import {useHistory} from "react-router-dom";

const Home = () => {

    const [latitude, setLatitude] = useState(33.87);
    const [longitude, setLongitude] = useState(-84.34);
    const [location, setLocation] = useState("northatlanta");
    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log(location)
        API.getWeather(latitude, longitude).then(({data})=> {
            history.push(`/location/${location}`, data)
        })
    }

    const handleInputChange = (e) => {

        const latAndLong = e.target.value.split(" ")
        setLatitude(latAndLong[0]);
        setLongitude(latAndLong[1]);
        setLocation(latAndLong[2]);
    }

    return (
        <div className="container">
            <h1>Home</h1>
            <Form handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>
        </div>
    );
};

export default Home;