import React from "react";

export function StockInfo(props) {
    return (
        <div className={`flex justify-center items-center space-x-3 w-40 px-4 py-2 rounded-md bg-indigo-600`}>
            <img
                className="w-8 h-8" 
                src={props.icon} 
                alt="icon" 
            />

            <p className={`text-indigo-200`}>
                {props.text}
            </p>
        </div>
    );
}