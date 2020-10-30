import {useState, useEffect} from 'react';
import Form from "../../components/Form/Form"
import API from "../../utils/API"

const Home = () => {

    const [location, setLocation] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(location)
        API.getWeather(location).then(({data})=> {
            console.log(data);

        })
    }

    const handleInputChange = (e) => {
        setLocation(e.target.value);
    }

    return (
        <div className="container">
            <h1>Home</h1>
            <Form handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>
        </div>
    );
};

export default Home;