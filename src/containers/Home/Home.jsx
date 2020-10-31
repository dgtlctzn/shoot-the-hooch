import {useState, useEffect} from 'react';
import Form from "../../components/Form/Form"
import API from "../../utils/API"
import {useHistory} from "react-router-dom";

const Home = () => {

    const [location, setLocation] = useState("North Atlanta");
    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(location)
        API.getWeather(location).then(({data})=> {
            history.push(`/location/${data.city.id}`, data)
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