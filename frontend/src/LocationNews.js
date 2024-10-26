import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LocationNewsFetcher = ({ userLatLng }) => {
    const [newsData, setNewsData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchNews = async () => {
            console.log('User LatLng:', userLatLng);

            if (userLatLng && userLatLng.lat !== null && userLatLng.lng !== null) {
                setLoading(true); // Start loading

                try {
                    const response = await axios.get(`http://localhost:5500/api/user/district`, {
                        params: {
                            latitude: userLatLng.lat,
                            longitude: userLatLng.lng
                        }
                    });

                    console.log('API Response:', response.data);

                    // Format news data
                    const formattedNews = Object.entries(response.data.news).map(([date, items]) => ({
                        date,
                        items
                    }));

                    setNewsData(formattedNews); // Store formatted news
                    setError(null); // Clear any previous errors
                } catch (err) {
                    console.error('Error fetching news:', err);
                    setError(err.response?.data?.error?.message || err.message);
                } finally {
                    setLoading(false); // End loading
                }
            } else {
                setError('Invalid location data'); // Handle case where lat/lng is invalid
            }
        };

        fetchNews();
    }, [userLatLng]);

    return (
        <div className="news-fetcher">
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {loading && <p>Loading news...</p>}

            {newsData.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Local News:</h2>
                    {newsData.map(({ date, items }) => (
                        <div key={date} className="mt-4">
                            <h3 className="font-bold">{new Date(date).toLocaleDateString()}</h3>
                            <div className="pl-5">
                                {items.map((item, index) => (
                                    <div key={index} className="mt-2 border-b pb-2">
                                        <strong>{item.title}</strong>
                                        <p>{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LocationNewsFetcher;
