import React from "react";
import { NavLink } from "react-router-dom";

export function StockListing(props) {
    return (
        <div className="w-full px-6 py-4 flex items-center justify-between space-x-3 text-white">
            <div className="flex items-center space-x-3">
                <div className="bg-deepBlue-900 w-20 px-2 py-1 rounded-md flex justify-center">
                    <p className="text-sm font-medium">
                        {props.stock.symbol}
                    </p>
                </div>
                <h1 className="text-xs text-gray-500 w-36 md:w-72">
                    - {props.stock.name}
                </h1>
            </div>
            <NavLink
                to={`/${props.stock.symbol}`} 
                className="font-semibold text-xs md:text-sm w-16 py-2 rounded-md cursor-pointer bg-teal-200 text-teal-800 flex justify-center border border-teal-200 transition duration-150 ease-in-out hover:bg-teal-800 hover:border-teal-800 hover:text-white"
            >
                Show
            </NavLink>
        </div>
    );
} 