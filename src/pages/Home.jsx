import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { StockCard } from "../components/StockCard";
import { Pie } from "react-chartjs-2";
import { LineChart } from "../components/LineChart";
import { Animated } from "./Animated";
import { API_KEY, API_URL } from "../shared";

export function Home() {
    const [apiStatus, setApiStatus] = useState(
        {
            trending: true,
            score: false,
            random: false,
            freq: false
        }
    );

    const [stock, setStock] = useState();
    const [chartData, setChartData] = useState();
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(true);
    const [isData, setDataComplete] = useState(false);
        
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const res = await fetch(API_URL + "stock/trending", {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "x-api-key": API_KEY
                },
            }); 
        
        const result = await res.json();

        setData({
            symbol: result[0].symbol,
            score: Math.round(parseFloat(result[0].average_sentiment_score) * 1000) / 1000,
            name: result[0].name,
            freq: result[0].reference_count
        });

        setStock({
            symbol: result[0].symbol,
            score: Math.round(parseFloat(result[0].average_sentiment_score) * 1000) / 1000,
            name: result[0].name,
            freq: result[0].reference_count
        });

        // create trading data
        const trades = convertTradeDates(result[0].trades);
        loadChartData(trades, result[0].symbol);

        setDataComplete(true);
        setLoading(false);
    }

    const getStock = async (status) => {
        setLoading(true);

        let res;

        switch (status) {
            case "trending":
                setApiStatus({
                    trending: true,
                    score: false,
                    random: false,
                    freq: false 
                });
                res = await fetch(API_URL + "stock/trending", {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        "x-api-key": API_KEY
                    },
                });
                break;
            
            case "score":
                setApiStatus({
                    trending: false,
                    score: true,
                    random: false,
                    freq: false 
                });
                res = await fetch(API_URL + "stock/score", {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        "x-api-key": API_KEY
                    },
                }); 
                break;
            
            case "random":
                setApiStatus({
                    trending: false,
                    score: false,
                    random: true,
                    freq: false 
                });
                res = await fetch(API_URL + "stock/random", {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        "x-api-key": API_KEY
                    },
                }); 
                break;

            case "freq":
                setApiStatus({
                    trending: false,
                    score: false,
                    random: false,
                    freq: true 
                });
                res = await fetch(API_URL + "stock/mentions", {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        "x-api-key": API_KEY
                    },
                }); 
                break;
        
            default:
                break;
        }

        // get result from response
        const result = await res.json();

        // create stock data
        setStock({
            symbol: result[0].symbol,
            score: Math.round(parseFloat(result[0].average_sentiment_score) * 1000) / 1000,
            name: result[0].name,
            freq: result[0].reference_count
        });

        // create trading data
        const trades = convertTradeDates(result[0].trades);

        loadChartData(trades, result[0].symbol);

        setLoading(false);
    }

    const loadChartData = async (trades, symbol) => {
        setChartData({
            labels: trades.map((data) => data.timing), 
            datasets: [
              {
                label: symbol,
                fill: false,
                data: trades.map((data) => data.last_price),
                backgroundColor: "#2dd4bf",
                borderColor: "#2dd4bf",
                borderWidth: 2
              }
            ]
        });
    }

    const convertTradeDates = (trades) => {
        for (let t of trades) {
            t.timing = `${new Date(t.timing).getUTCDate() + 1}/${new Date(t.timing).getUTCMonth() + 1}`;
        }
        return trades;
    }

    const toggles = [
        { status: apiStatus.trending, type: "trending", name: "Trending" },
        { status: apiStatus.score, type: "score", name: "Score" },
        { status: apiStatus.freq, type: "freq", name: "Frequency" },
        { status: apiStatus.random, type: "random", name: "Random" },
    ];


    return (
        <Animated>
            <div className="flex justify-center mt-16 pb-24">
                <div className="max-w-xs md:max-w-xl lg:max-w-5xl text-center">
                    <h1 className="font-semibold text-3xl md:text-4xl lg:text-6xl leading-tight pb-8">
                        Easily gain insight into the hottest stocks from social media
                    </h1>
                    <div className="flex justify-center pb-12">
                        <p className="text-sm md:text-md lg:text-lg md:max-w-lg lg:max-w-xl text-center text-gray-400">
                            Get all the predictions of the community of Reddit and Twitter, formated into organized and well-informative data 
                        </p>
                    </div>
                    <div className="flex justify-center items-center space-x-6 lg:space-x-12 font-medium">
                        <NavLink
                            to={"/about"} 
                            className="w-28 md:w-32 lg:w-36 py-3 text-sm lg:text-lg cursor-pointer rounded-2xl bg-white text-black transition duration-150 ease-in-out hover:opacity-75"
                        >
                            <p>
                                How it works
                            </p>
                        </NavLink>
                        <NavLink
                            to={"/search"} 
                            className="w-28 lg:w-36 py-3 text-sm lg:text-lg cursor-pointer rounded-2xl bg-gradient-to-br from-teal-400 via-teal-600 to-emerald-600 text-white transition duration-150 ease-in-out hover:opacity-75">
                            <p>
                                Explore
                            </p>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="pb-16">
                <div className=" bg-gray-100 rounded-3xl px-6 md:px-12 lg:px-16 pt-16 pb-32">
                    <div className="flex justify-center md:justify-start lg:justify-start pb-16 md:pb-24 lg:pb-24">
                        <div className="flex items-center text-deepBlue-900">
                            <ul className="flex items-center font-semibold shadow-md rounded-md">
                                {
                                    toggles.map((item, index) => {
                                        return <li
                                            key={item.name}
                                            onClick={() => { if (!item.status) getStock(item.type); }}
                                            className={(item.status ? "text-white bg-gradient-to-br border-deepBlue-900 bg-deepBlue-900 " :"border-gray-200 bg-white ") + "border w-20 md:w-24 lg:w-28 py-3 block text-sm md:text-md lg:text-md text-center cursor-pointer transition duration-150 ease-in-out hover:bg-gradient-to-br hover:bg-deepBlue-900 hover:border-deepBlue-900 hover:text-white " + (index === 0 ? "rounded-l-md" : "") + (index === 3 ? " rounded-r-md": "")}
                                        >
                                            { item.name }
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <>
                    <div className="h-80 lg:h-52 md:h-52">
                        { !isLoading ?
                            (<div className="lg:flex md:flex justify-between items-center lg:space-x-6">
                                <div className="w-full">
                                {
                                    apiStatus.random
                                        ? 
                                        <div
                                            onClick={() => { getStock("random") }}  
                                            className=" w-24 flex items-center space-x-2 h-4 text-black pb-5 font-semibold cursor-pointer transition duration-150 ease-in-out hover:text-gray-300"
                                        >
                                            <h1>
                                                Refresh
                                            </h1>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                            </svg>
                                        </div>
                                        : 
                                        <div className="h-4 pb-5"></div>
                                        
                                }
                                <StockCard stock={stock} />
                                </div>
                                
                                <div className="lg:w-full">
                                    <LineChart chartData={chartData} />
                                </div>

                            </div>) : (
                                null
                            )
                        }
                    </div>
                    </>
                </div>  
            </div>
        </Animated>
    );
}
