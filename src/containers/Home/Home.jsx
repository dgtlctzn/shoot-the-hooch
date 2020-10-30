import {useState, useEffect} from 'react';
import Form from "../../components/Form/Form"
import API from "../../utils/API"

const Home = () => {

    const [location, setLocation] = useState("");

    const handleSubmit = (e, city) => {
        e.preventDefault();

        console.log(city)
        API.getWeather(city).then(({data})=> {
            console.log(data);
        })
    }

    const handleInputChange = (e) => {
        setLocation(e.target.value);
    }


    return (
        <div className="container">
            <h1>Home</h1>
            <Form location={location} handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>
        </div>
    );
};

export default Home;