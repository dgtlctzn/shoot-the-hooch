import React from 'react';

const RiverLocContext = React.createContext({
    riverLoc: {},
    weather: {},
    waterLevel: {},
    setRiverLoc: () => {},
    setWeather: () => {},
    setWaterLevel: () => {},
})

export default RiverLocContext;