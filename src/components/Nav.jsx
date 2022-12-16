import React from "react";
import { NavLink } from "react-router-dom";
import { Footer } from "./Footer";

const navigation = [
    { name: "home", href: "/" },
    { name: "search", href: "/search" },
    { name: "about", href: "/about" },
];

export function Nav(props) {
    return (
        <> 
            <div className="font-sans bg-gradient-to-br from-blue-900 via-gray-900 to-deepBlue-900 min-h-screen text-white relative overflow-x-hidden">
                <header className="flex justify-between items-center py-6 max-w-7xl mx-auto">
                    <div className="ml-20">
                        <NavLink 
                            to={"/"}
                            className="text-3xl font-bold"
                        >
                            <span className="text-teal-400">Hype</span>Stock
                        </NavLink>
                    </div>
                    <nav className="mr-20">
                        <div className="flex items-center space-x-8 uppercase text-sm">
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
                <div className="max-w-7xl mx-auto min-h-screen">
                    {props.children}
                </div>
                <div className="max-w-7xl mx-auto">
                    <Footer />
                </div>
            </div>
        </>
    )
}