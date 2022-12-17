import React from "react";

export function StockInfo(props) {
    return (
        <div className="text-start">
            <h1 className="text-red-300 text-lg md:text-2xl lg:text-lg font-semibold pb-1">
                {props.info}
            </h1>
            <p className="ml-2 font-medium md:text-lg lg:text-md text-gray-200">
                - {props.text}
            </p>
        </div>
        // <div className={`flex justify-center items-center space-x-3 w-40 px-4 py-2 rounded-md bg-indigo-600`}>
        //     <img
        //         className="w-8 h-8" 
        //         src={props.icon} 
        //         alt="icon" 
        //     />

        //     <p className={`text-indigo-200`}>
        //         {props.text}
        //     </p>
        // </div>
    );
}