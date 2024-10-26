import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-heatmap'; // Ensure this path is correct
import 'leaflet/dist/leaflet.css'; // Ensure Leaflet CSS is imported
import HeatmapOverlay from 'leaflet-heatmap';

const HeatmapLayer = ({ latlngs, userLocation, dangerLevel }) => {
    const mapRef = useRef(null);
    const heatmapLayerRef = useRef(null);

    useEffect(() => {
        // Initialize the map only once
        if (!mapRef.current) {
            mapRef.current = L.map('map-canvas', {
                center: [20.5937, 78.9629], // Center on India by default
                zoom: 5,
                layers: [
                    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                        maxZoom: 21
                    })
                ]
            });

            // Heatmap configuration
            const cfg = {
                radius: 0.1, // Smaller radius
                maxOpacity: 0.8,
                scaleRadius: true,
                useLocalExtrema: true,
                latField: 'lat',
                lngField: 'lng',
                valueField: 'count'
            };

            // Create and add the heatmap layer
            heatmapLayerRef.current = new HeatmapOverlay(cfg).addTo(mapRef.current);
        }

        // Prepare heatmap data
        const heatmapData = latlngs.map(latlng => ({
            lat: latlng[0], // latitude
            lng: latlng[1], // longitude
            count: latlng[2] // danger level (count)
        }));

        // Add user's location to heatmap data if available
        if (userLocation && dangerLevel !== undefined) {
            const normalizedDangerLevel = Math.min(Math.max(dangerLevel, 0), 10); // Normalize danger level
            heatmapData.push({
                lat: userLocation[0],
                lng: userLocation[1],
                count: normalizedDangerLevel
            });
        }

        // Dynamically set max value based on data
        const maxCount = Math.max(...heatmapData.map(point => point.count));
        heatmapLayerRef.current.setData({ max: maxCount, data: heatmapData });

    }, [latlngs, userLocation, dangerLevel]);

    return <div id="map-canvas" style={{ width: '100%', height: '300px' }}></div>;
};

export default HeatmapLayer;
