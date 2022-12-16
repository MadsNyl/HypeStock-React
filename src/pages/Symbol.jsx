import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import arrow from "../img/arrow-up.png";
import gross from "../img/gross-profit.png";
import dollar from "../img/dollar.png";
import rating from "../img/rating.png";
import { StockInfo } from "../components/StockInfo";
import { LineChart } from "../components/LineChart";
import { BarChart } from "../components/BarChart";
import { Comment } from "../components/Comment";
import { Animated } from "./Animated";
import { API_KEY, API_URL } from "../shared";

export function Symbol() {
    const { symbol } = useParams();
    const [stock, setStock] = useState();
    const [tradeInfo, setTradeInfo] = useState();
    const [lineChartData, setLineChartData] = useState();
    const [barChartData, setBarChartData] = useState();

    useEffect(() => {
        loadStock();
    }, []);

    const loadStock = async () => {
        let res = await fetch(API_URL +  `stock?symbol=${symbol}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "x-api-key": API_KEY
            },
        });

        const result = await res.json();

        setStock({
            symbol: result[0].symbol,
            name: result[0].name,
            freq: result[0].reference_count,
            score: Math.round(parseFloat(result[0].average_sentiment_score) * 1000) / 1000,
            sentiments: result[0].sentiments,
            trades: result[0].trades
        });

        // get traded volume for today
        setTradeInfo({
            volume: result[0].trades[result[0].trades.length - 1].volume,
            price: result[0].trades[result[0].trades.length - 1].last_price
        });

        // set chart data
        const trades = convertTradeDates(result[0].trades);
        loadLineChartData(trades, result[0].symbol);
        loadBarChartData(trades);
    }

    const convertTradeDates = (trades) => {
        for (let t of trades) {
            t.timing = `${new Date(t.timing).getUTCDate() + 1}/${new Date(t.timing).getUTCMonth() + 1}`;
        }
        return trades;
    }

    const loadLineChartData = async (trades, symbol) => {
        setLineChartData({
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

    const loadBarChartData = async (trades) => {
        setBarChartData({
            labels: trades.map((data) => data.timing), 
            datasets: [
              {
                fill: false,
                data: trades.map((data) => data.volume),
                backgroundColor: "#f87171",
                borderColor: "#f87171",
                borderWidth: 2
              }
            ]
        });
    }   

    
    return (
        <>
            {stock 
                ? (
                    <>
                    <div className="flex justify-between items-center px-24 mt-20 pb-24">
                        <div>
                            <div className="pb-24">
                                <h1 className="text-teal-400 text-6xl font-semibold pb-6">
                                    {stock.symbol}
                                </h1>
                                <h1 className="text-2xl font-semibold ml-6 text-white">
                                    {stock.name}
                                </h1>
                            </div>

                            <div className="ml-6 space-y-8">
                                <div className="flex items-center space-x-12">
                                    <StockInfo icon={rating} text={stock.score} />
                                    <StockInfo icon={arrow} text={stock.freq}  />
                                </div>
                                <div className="flex items-center space-x-12">
                                    <StockInfo icon={dollar} text={tradeInfo.price}  />
                                    <StockInfo icon={gross} text={tradeInfo.volume}  />
                                </div>
                            </div>
                        </div>

                        <LineChart chartData={lineChartData} color="white" />
                    </div>

                    <div className="px-24 py-12">
                        <h1 className="text-4xl font-semibold pb-16 text-teal-400">
                            Stats
                        </h1>

                        <BarChart chartData={barChartData} color="white" />
                    </div>

                    <div className="px-24 py-12">
                        <h1 className="text-4xl font-semibold pb-16 text-teal-400">
                            The voice of the people
                        </h1>
                        <div className="grid grid-cols-2 gap-6">
                            {stock.sentiments.map(item => {
                                return(
                                    <Comment key={item.created_date} sentiment={item} />
                                );
                            })}
                        </div>
                    </div>
                    </>
                )
                : (
                    <div className="flex justify-center mt-44">
                        <div role="status">
                            <svg aria-hidden="true" className="mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-teal-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                )
            }
        </>
    );
}