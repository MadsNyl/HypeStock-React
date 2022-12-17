import React from "react";
import { NavLink } from "react-router-dom";

export function Footer() {
    return(
        <div className="border-t border-t-gray-200 px-12 py-20 text-gray-200">
            <div className="flex items-center justify-center">
                <div className="text-center">
                    <NavLink 
                        to={"/"}
                        className="text-2xl md:text-4xl font-bold"
                    >
                        <span className="text-teal-400">Hype</span>Stock
                    </NavLink>
                    <h1 className="mt-4 text-sm md:text-md text-gray-300">
                        Created by Mads Nylund
                    </h1>
                </div>
            </div>
        </div>
    );
}