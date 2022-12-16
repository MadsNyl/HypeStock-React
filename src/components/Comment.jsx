import React from "react";
import reddit from "../img/reddit.png";

const getCreatedDate = (date) => {
    const today = new Date();
    const diff = Math.abs(today.getTime() - new Date(date).getTime());
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff / 1000) / 60);
    console.log(date, today)
    if (hours === 0) {
        return `${minutes}m ago`;
    }

    if (hours >= 24) {
        const days = Math.ceil(hours / 24);
        const remainingHours = hours % 24;
        return `${days}d ${remainingHours}h ago`;
    }

    return `${hours}h ago`;
}

const getDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}`;
}

const sliceText = (text) => {
    const size = 200;
    if (text.length <= size) return text;

    return `${text.slice(0, size)}...`
}

export function Comment(props) {
    return(
        <div className="relative px-4 py-3 max-w-md w-full h-48 rounded-md bg-white">
            <div className="flex space-x-3 pb-2">
                <img
                    className="w-7 h-7" 
                    src={reddit}
                    alt="logo" 
                />
                <p className="text-gray-900 font-semibold">
                    {props.sentiment.author}
                </p>
                <p className="text-gray-400">
                    {getDate(props.sentiment.created_date)}
                </p>
            </div>

            <div>
                <p className="text-gray-700 text-sm">
                    {sliceText(props.sentiment.comment_body)}
                </p>
            </div>

            <div className="absolute w-full bottom-3 flex justify-between items-center">
                <div className="text-gray-900 font-medium flex justify-center w-16 py-1 text-sm bg-white border border-gray-100 shadow-md rounded-lg">
                    {Math.round(parseFloat(props.sentiment.score) * 1000) / 1000}
                </div>

                <div className="flex items-center space-x-4 mr-12">
                    <a  
                        rel="noopener noreferrer"
                        target="_blank"
                        className="w-20 py-1 text-sm font-medium bg-orange-300 text-orange-700 rounded-lg text-center border border-orange-400" 
                        href={`https://reddit.com${props.sentiment.post_url}`}
                    >
                        Post
                    </a>
                    <a
                        rel="noopener noreferrer"
                        target="_blank"
                        className="w-20 py-1 text-sm font-medium bg-blue-300 text-blue-700 rounded-lg text-center border border-blue-400" 
                        href={`https://reddit.com${props.sentiment.permalink}`}
                    >
                        Comment
                    </a>
                </div>
            </div>
        </div>
    );
}