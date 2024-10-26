import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import { useNavigate } from 'react-router-dom';

const NeutralityForm = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // Initialize the map
        const map = L.map('map').setView([20.5937, 78.9629], 5); // Centered on India

        // Add tile layer
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Sample data points for the heatmap (latitude, longitude, intensity)
        const addressPoints = [
            [28.6139, 77.2090, 0.9], // Delhi
            [19.0760, 72.8777, 0.8], // Mumbai
            [12.9716, 77.5946, 0.7], // Bangalore
            [22.5726, 88.3639, 0.6], // Kolkata
            [13.0827, 80.2707, 0.5], // Chennai
            [17.3850, 78.4867, 0.4]  // Hyderabad
        ];

        // Initialize the heat layer with custom options
        const heat = L.heatLayer(addressPoints, {
            radius: 25,
            blur: 15,
            gradient: {
                0.0: 'blue',
                0.4: 'cyan',
                0.6: 'lime',
                0.8: 'yellow',
                1.0: 'red'
            }
        }).addTo(map);

        console.log('Heat layer added successfully.');

        // Clean up the map on component unmount
        return () => {
            map.remove();
        };
    }, []);

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#372f55] text-white p-8">
            <div id="map" className="w-full max-w-[90vw] h-[600px] rounded-lg shadow-lg border border-[#66C5CC]"></div>
            <div className="mt-6 flex justify-around w-full max-w-[90vw]">
                <button 
                onClick={() => {
                    navigate("/region");
                   
                  }}
                  className="py-5 px-32 bg-[#66C5CC] text-white text-2xl font-semibold rounded-lg hover:bg-[#5AB6BF] transition duration-200 ease-in-out">
                    Region Info
                </button>
                <button 
                onClick={() => {
                    navigate("/assbot");   
                  }}
                  className="py-10 px-32 bg-[#66C5CC] text-white text-2xl font-semibold rounded-lg hover:bg-[#5AB6BF] transition duration-200 ease-in-out">
                    Assistant Bot
                </button>
            </div>
        </div>
    );
};

export default NeutralityForm;
