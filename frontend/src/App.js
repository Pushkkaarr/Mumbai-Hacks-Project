import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeatmapDemo from './HeatmapDemo'; // Adjust the path as necessary
import LocationNewsFetcher from './LocationNews'; // Adjust the path as necessary

function App() {
    const [dangerLevel, setDangerLevel] = useState('');
    const [userLatLng, setUserLatLng] = useState({ lat: null, lng: null });
    const [error, setError] = useState(null);

    const handleLocationFetch = async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log('Fetching data for:', { latitude: lat, longitude: lng });

        try {
            const response = await axios.post('http://localhost:5500/api/user/predict', {
                latitude: lat,
                longitude: lng    
            });
            setDangerLevel(response.data.danger_level);
            setUserLatLng({ lat, lng });
        } catch (error) {
            console.error('Error fetching danger level:', error);
            setError('Failed to fetch danger level');
        }
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(handleLocationFetch, (error) => {
                console.error('Error occurred while fetching location:', error);
                setError('Unable to retrieve your location');
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-6">Crime Danger Level Predictor</h1>
            <button 
                onClick={getLocation}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition mb-4"
            >
                Find My Location
            </button>

            <div className="max-w-screen-sm p-4 bg-gray-200 rounded-lg shadow-lg mb-6">
                <div className="h-64">
                    {dangerLevel && (
                        <h2 className="text-xl font-semibold mb-4">Current Predicted Danger Level: {dangerLevel}</h2>
                    )}
                    <HeatmapDemo userLatLng={userLatLng} dangerLevel={dangerLevel} />
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>

            {/* Separate container for LocationNewsFetcher */}
            <div className="max-w-screen-sm w-full p-4 bg-gray-200 rounded-lg shadow-lg">
                <LocationNewsFetcher userLatLng={userLatLng} />
            </div>
        </div>
    );
}

export default App;
