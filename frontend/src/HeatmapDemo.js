import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import HeatmapLayer from '../src/HeatLayer'; // Adjust import path
import 'leaflet/dist/leaflet.css'; // Ensure Leaflet CSS is imported

const HeatmapDemo = ({ userLatLng, dangerLevel }) => {
    const [heatData, setHeatData] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const mapRef = useRef(null);

    useEffect(() => {
        // Initialize the map
        mapRef.current = L.map('map').setView([20.5937, 78.9629], 5); // Default view to India

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapRef.current);

        // Fetch heatmap data
        fetchHeatmapData();

        // Cleanup on unmount
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };
    }, []);

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

    useEffect(() => {
        if (userLatLng.lat && userLatLng.lng) {
            setUserLocation([userLatLng.lat, userLatLng.lng]);
            mapRef.current.setView([userLatLng.lat, userLatLng.lng], 13); // Center the map on user location

            // Add marker for user location
            L.marker([userLatLng.lat, userLatLng.lng]).addTo(mapRef.current)
                .bindPopup("You are here!")
                .openPopup();

            // Update heatData to reflect user's current location with danger level
            if (dangerLevel) {
                setHeatData(prevData => [
                    ...prevData,
                    [userLatLng.lat, userLatLng.lng, dangerLevel] // Add user's location with danger level
                ]);
            }
        }
    }, [userLatLng, dangerLevel]);

    return (
        <div className="flex">
            <div className="w-1/4 p-4 bg-gray-200 rounded-lg shadow-lg mr-4">
                <p className="mb-4">Heatmap demo using coordinates from major Indian cities.</p>
                <div className="mb-2 text-lg font-semibold">Current Zone</div>
                <div id="map" style={{ width: '100%', height: '300px', position: 'relative' }}></div>
                <HeatmapLayer 
                    latlngs={heatData} 
                    userLocation={userLocation} 
                    dangerLevel={dangerLevel} 
                    options={{ radius: 10, blur: 15, minOpacity: 0.05 }} // Smaller radius for heat points
                />
                {userLocation && (
                    <div>Your location: {userLocation[0]}, {userLocation[1]}</div>
                )}
            </div>
            <div className="flex-grow p-4">
                {/* Other content can go here */}
            </div>
        </div>
    );
};

export default HeatmapDemo;
