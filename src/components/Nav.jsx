import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Footer } from "./Footer";

export function Nav(props) {
    const [isActive, setActive] = useState(false);

    const navigation = [
        { name: "home", href: "/" },
        { name: "search", href: "/search" },
        { name: "about", href: "/about" },
    ];

    return (
        <> 
            <div className="font-sans bg-gradient-to-br from-blue-900 via-gray-900 to-deepBlue-900 min-h-screen text-white relative overflow-x-hidden">
                <header className="flex justify-between items-center py-6 max-w-7xl mx-auto">
                    <div className="ml-6 md:ml-16 lg:ml-20">
                        <NavLink 
                            onClick={() => { setActive(false); }}
                            to={"/"}
                            className="text-xl md:text-2xl lg:text-3xl font-bold"
                        >
                            <span className="text-teal-400">Hype</span>Stock
                        </NavLink>
                    </div>
                    <nav className="mr-6 md:mr-16 lg:mr-20">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth="1.5" 
                            stroke="currentColor" 
                            className="md:hidden lg:hidden text-teal-400 w-8 h-8"
                            onClick={() => { setActive(!isActive); }}
                        >
                            { !isActive
                                ? <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                : <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />}
                        </svg>

                        <div className="hidden md:flex lg:flex items-center space-x-8 uppercase text-sm">
                            {navigation.map(item => (
                                <NavLink
                                    key={item.name}
                                    to={item.href}
                                    className={({
                                        isActive, 
                                    }) => {
                                        return (
                                            "uppercase text-sm font-medium no-underline " +
                                            (!isActive
                                                ? "text-white hover:text-teal-400"
                                                : "text-teal-400"
                                            )
                                        );
                                    }}
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                    </nav>
                </header>
                { isActive
                    ? <div className="h-screen w-full bg-deepBlue-900 flex justify-center text-center">
                        <ul className="mt-20 space-y-8">
                            {navigation.map(item => (
                                <li
                                    key={item.name}
                                >
                                    <NavLink
                                        onClick={() => { setActive(false); }}
                                        to={item.href}
                                        className={({
                                            isActive, 
                                        }) => {
                                            return (
                                                "uppercase text-lg font-medium no-underline " +
                                                (!isActive
                                                    ? "text-white"
                                                    : "text-teal-400"
                                                )
                                            );
                                        }}
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    : 
                    <>
                        <div className="max-w-7xl mx-auto min-h-screen">
                            {props.children}
                        </div>
                        <div className="max-w-7xl mx-auto">
                            <Footer />
                        </div>
                    </>
                }   
            </div>
        </>
    )
}