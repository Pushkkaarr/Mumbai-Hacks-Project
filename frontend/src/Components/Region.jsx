import React from 'react';

const Region = ({ regionData }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#f0e3f7] p-4">
            <div className="max-w-md w-full bg-[#d1c4e9] rounded-lg shadow-xl p-4 border border-[#ffccff]">
                <h2 className="text-2xl font-semibold text-center text-[#6a1b9a] mb-4">{regionData.name}</h2>
                <p className="text-gray-700 mb-4">{regionData.description}</p>
                
                <div className="bg-[#ffffff] rounded-lg p-4 shadow-inner">
                    <h3 className="text-lg font-semibold text-[#4a148c]">Crime Statistics</h3>
                    <ul className="list-disc list-inside text-gray-600">
                        <li>Rape: {regionData.crimeStats.rape}</li>
                        <li>Murder: {regionData.crimeStats.murder}</li>
                        <li>Assault: {regionData.crimeStats.assault}</li>
                        <li>Theft: {regionData.crimeStats.theft}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Region;
