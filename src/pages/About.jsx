import React from "react";
import Typewriter from "typewriter-effect";
import twitterLogo from "../img/twitter.png";
import redditLogo from "../img/reddit.png";
import stockIcon from "../img/stock.png";
import pythonIcon from "../img/python.png";
import nodeIcon from "../img/nodejs.png";
import react from "../img/structure.png";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Animated } from "./Animated";
import { API_URL, API_KEY } from "../shared";

export function About() {

    const [count, setCount] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        let res = await fetch(API_URL + "stock/count", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "x-api-key": API_KEY
            },
        });

        const result = await res.json();

        setCount(result[0].stock_count);

        setLoading(false);
    }


    return (
        <Animated>
            {
                !isLoading
                ? <>
                    <div className="flex justify-center mt-20 pb-64">
                        <div className="max-w-5xl text-center">
                            <h1 className="font-semibold text-6xl leading-tight">
                                <Typewriter 
                                    onInit={(typewriter) => {
                                        typewriter
                                            .changeDelay(75)
                                            .typeString("Ehm.. so what really is this?")
                                            .start();
                                    }}  
                                />
                            </h1>
                        </div>
                    </div>
        
                    <div className="pb-16">
                        <div className="bg-gray-100 px-16 pt-16 pb-32">
                            <div className="max-w-5xl mx-auto  -mt-44 bg-white shadow-md px-8 py-12 rounded-xl">
                                <div className="flex justify-center space-x-24 pb-16 border-b border-b-gray-300">
                                    <img 
                                        className="w-24 h-24"
                                        src={redditLogo} 
                                        alt="Reddit logo" 
                                    />
                                    <img 
                                        className="w-24 h-24"
                                        src={stockIcon} 
                                        alt="Stock icon" 
                                    />
                                    <img 
                                        className="w-24 h-24"
                                        src={twitterLogo} 
                                        alt="Twitter logo" 
                                    />
                                </div>
                                <div className="px-20 mt-6">
                                    <h1 className="text-gray-900 text-4xl font-semibold pb-6">
                                        In short
                                    </h1>
                                    <h1 className="text-gray-400 text-xl font-medium pb-6">
                                        Posts and comments are continuously collected from <span className="text-orange-600">Reddit</span> and <span className="text-blue-400">Twitter</span>, which is then filtered and analyzed. In this way, you get presented to live comments and opinions from the people of social media. 
                                    </h1>
                                    <h1 className="text-gray-400 text-xl font-medium">
                                        Explore the currently <span className="text-deepBlue-900">{count ? count : 0}</span> available stock tickers, and get insight in day-to-day prices, trade activity and latest comments and predictions from social media. 
                                    </h1>
                                </div>
                            </div>
        
                            <div className="flex justify-center items-center space-x-12 pt-16 pb-20 border-b border-b-gray-300">
                                <NavLink
                                    to={"/search"} 
                                    className="w-44 py-3 cursor-pointer rounded-2xl bg-blue-700 text-white transition duration-150 ease-in-out hover:opacity-75 text-center font-medium text-lg">
                                    <p>
                                        Explore
                                    </p>
                                </NavLink>
                                <NavLink
                                    to={"/"} 
                                    className="w-44 py-3 cursor-pointer rounded-2xl bg-deepBlue-900 text-white transition duration-150 ease-in-out hover:opacity-75 text-center font-medium text-lg">
                                    <p>
                                        Trending
                                    </p>
                                </NavLink>
                            </div>
        
                            <div className="flex justify-between items-center text-deepBlue-900 py-16">
                                <div className="max-w-xl">
                                <h1 className="text-4xl font-semibold pb-8">
                                    Scrape data with Python
                                    </h1> 
                                    <p className="leading-relaxed text-lg">
                                        With help from Python I am able to collect data from Reddit and Twitter via the APIs they are offering for the public. This allow me to easily collect all posts and comments. After that my program is filtering all this text-data to keep posts and comments where a stock ticker is occuring. Finally the relevant text-data is passed into a sentiment analyzis that returns the sentiment score, which gives an indication of whether the stock ticker is mentioned in a positive or negative setting.
                                    </p>
                                </div>
                                <img
                                    className="w-44 h-44 mr-24" 
                                    src={pythonIcon} 
                                    alt="Python Icon" 
                                />
                            </div>
        
                            <div className="flex justify-between items-center text-deepBlue-900 py-16">
                                <img
                                    className="w-44 h-44 ml-24" 
                                    src={nodeIcon} 
                                    alt="Python Icon" 
                                />
                                <div className="max-w-xl">
                                <h1 className="text-4xl font-semibold pb-8">
                                    Structuring data into an API
                                    </h1> 
                                    <p className="leading-relaxed text-lg">
                                        The data available for you is fetched from my Express.js API that connects my collected data and frontend. There the data is organized into informative information that is easy to read and understand.
                                    </p>
                                </div>
                            </div>
        
                            <div className="flex justify-between items-center text-deepBlue-900 py-16">
                                <div className="max-w-xl">
                                <h1 className="text-4xl font-semibold pb-8">
                                    Visualization with React and Flutter
                                    </h1> 
                                    <p className="leading-relaxed text-lg">
                                        The frontend and vizualization of the collected to data is created with React.js for this website. An app, which can be downloaded from both App Store and Google Play, is in the making. 
                                    </p>
                                </div>
                                <img
                                    className="w-44 h-44 mr-24" 
                                    src={react} 
                                    alt="Python Icon" 
                                />
                            </div>
                        </div>
                    </div>
                </>
                : <div></div>
            }
        </Animated>
    );
}