import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeatmapDemo from './HeatmapDemo'; // Adjust the path as necessary
import HeatmapLayer from './HeatLayer'; // Adjust the path as necessary
import LocationNewsFetcher from './LocationNews'; // Adjust the path as necessary

function App() {
    const [dangerLevel, setDangerLevel] = useState('');
    const [userLatLng, setUserLatLng] = useState({ lat: null, lng: null });
    const [heatData, setHeatData] = useState([]);
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

    useEffect(() => {
        const fetchHeatmapData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/heatmap');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Heatmap data fetched:', data); // Debug log
                setHeatData(data.map(item => [item.lat, item.lon, item.intensity]));
            } catch (error) {
                console.error('Error fetching heatmap data:', error);
            }
        };

        fetchHeatmapData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-12">
            {/* Page Title */}
            <h1 className="text-5xl font-extrabold text-gray-700 mb-10">Crime Danger Level Predictor</h1>
            
            {/* Location Button */}
            <button 
                onClick={getLocation}
                className="bg-blue-600 text-white text-xl px-10 py-4 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200 ease-in-out mb-8"
            >
                Find My Location
            </button>

            {/* Danger Level and Heatmap Section */}
            <div className="h-fit max-h-screen max-w-screen w-full p-8 bg-white rounded-xl shadow-xl mb-10">
                {dangerLevel && (
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                        Current Predicted Danger Level: <span className="text-red-600">{dangerLevel}</span>
                    </h2>
                )}

                {/* Heatmap and HeatmapLayer side by side */}
                <div className="flex">
                    <div className="h-96 w-1/2 rounded-lg overflow-hidden border border-gray-300 mb-6">
                        <HeatmapDemo userLatLng={userLatLng} dangerLevel={dangerLevel} />
                    </div>
                    <div className="h-96 w-1/2 rounded-lg overflow-hidden border border-gray-300 mb-6">
                        <HeatmapLayer 
                            latlngs={heatData} 
                            userLocation={[userLatLng.lat, userLatLng.lng]} 
                            dangerLevel={dangerLevel} 
                        />
                    </div>
                </div>
                
                {/* Error Message */}
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>

            {/* Location News Section */}
            <div className="max-w-screen-lg w-full p-8 bg-white rounded-xl shadow-xl">
                <LocationNewsFetcher userLatLng={userLatLng} />
            </div>
        </div>
    );
}

export default App;
