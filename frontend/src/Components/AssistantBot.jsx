import React, { useState } from 'react';
import Header from './Header'; // Adjust the path if needed
import Enavbar from './Enavbar';
import Footer from './Footer';

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = () => {
        if (inputValue.trim() === '') return;

        // Add user message
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'user', text: inputValue },
        ]);

        // Simulate bot response (you can replace this with actual bot logic)
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'bot', text: 'This is a response from AssistantBot!' },
        ]);

        // Clear input
        setInputValue('');
    };

    return (
        <div className="h-screen flex flex-col bg-[#f0e3f7]"> {/* Outer div color */}
        <Enavbar />
        <div className="flex flex-col items-center justify-center h-screen bg-[#c07baf]"> {/* Outer div for full screen height and background color */}
    <div className="flex flex-col w-full max-w-[60%] mx-auto bg-[#d1c4e9] rounded-lg shadow-xl p-4 border border-[#ffccff]"> {/* Outer container */}
        <div className="flex-grow overflow-y-auto mb-4 h-[400px] p-2 bg-[#ffffff] rounded-lg shadow-inner"> {/* Inner texting area */}
            {messages.map((message, index) => (
                <div key={index} className={`mb-2 p-2 rounded-md ${message.sender === 'bot' ? 'bg-[#e3f2fd] text-blue-700' : 'bg-[#e1bee7] text-purple-700'}`}>
                    <span className="font-semibold">{message.sender === 'bot' ? 'AssistantBot' : 'You'}: </span>
                    {message.text}
                </div>
            ))}
        </div>
        <div className="flex">
            <input
                type="text"
                className="border rounded-lg p-2 flex-grow mr-2 bg-white border-[#ffccff] focus:outline-none focus:ring-2 focus:ring-[#ff69b4] focus:border-transparent"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
            />
            <button
                onClick={handleSendMessage}
                className="bg-[#ff69b4] text-white rounded-lg px-4 hover:bg-[#ff1493] transition duration-200 ease-in-out"
            >
                Send
            </button>
        </div>
    </div>
</div>



    </div>
    

    );
};

export default ChatInterface;
