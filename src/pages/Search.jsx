import React from "react";
import { useState } from "react";
import { StockListing } from "../components/StockListing";
import dunno from "../img/i-dont-know.png";
import { API_KEY, API_URL } from "../shared";
import { Animated } from "./Animated";

export function Search() {

    const [data, setData] = useState();
    const [search, setSearch] = useState("");
    const [error, setError] = useState({
        invalidInput: false,
        notFound: false
    });
    const [isLoading, setLoading] = useState(false);

    const loadData = async (e) => {
        e.preventDefault();
        e.target.reset();
        setLoading(true);
        setError({
            invalidInput: false,
            notFound: false
        });
        setData();

        console.log(search)

        if (search.length < 2) {
            setError({
                invalidInput: true,
                notFound: false
            });
            setLoading(false);
            return;
        } 

        let res = await fetch(API_URL + `stock/search?search=${search}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "x-api-key": API_KEY
            },
        });

        const result = await res.json();

        if (result.length === 0) {
            setError({
                invalidInput: false,
                notFound: true
            });
            setLoading(false);
            return;
        }

        const stocks = [];
        for (let s of result) {
            let obj = {};
            obj.symbol = s.symbol;
            obj.name = s.name;
            obj.count = s.reference_count;
            stocks.push(s);
        }

        setData(stocks);

        setLoading(false);
    }

    return (
        <Animated>
            <div className="px-4 lg:px-24 py-12">
                <div className="flex justify-center items-center pb-8">
                    <form
                        onSubmit={loadData}
                        className={"bg-white px-5 py-3 rounded-lg flex items-center max-w-xl w-full mx-auto text-gray-900 border-2 " + (error.invalidInput ? "border-red-800" : "border-white")}
                    >
                        <input
                            className={"focus:outline-none w-full text-lg font-semibold placeholder:text-sm lg:placeholder:text-md " + (error.invalidInput ? "placeholder:text-red-700" : "")}
                            placeholder={error.invalidInput ? "Search must be atleast 2 characters..." : "Search for a company..."} 
                            onChange={(e) => {
                                setSearch(e.target.value)
                            }}
                            type="text" 
                        />
                        <button
                            className="flex justify-center items-center border-l border-gray-300 pl-2 transition duration-150 ease-in-out hover:text-teal-400"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </button>
                    </form>
                </div>

                {
                    !isLoading && data
                    ? (
                        <div className="bg-white py-5 max-w-xl w-full mx-auto rounded-lg">
                            {
                                data.map(stock => {
                                    return <StockListing key={stock.symbol} stock={stock} />
                                })
                            }
                        </div>
                    )
                    : (
                        error.notFound 
                        ? <div className="max-w-xl w-full mx-auto mt-8">
                            <div className="flex justify-center pb-8">
                                <img 
                                    className="w-36 h-36"
                                    src={dunno} 
                                    alt="Not found" 
                                />
                            </div>
                            <div className="flex justify-center">
                                <h1 className="font-semibold text-3xl text-center">
                                    Seems like we couldn't find your search... Try something else
                                </h1>
                            </div>
                        </div>
                        : <div></div>
                    )
                }
            </div>
        </Animated>
    );
}