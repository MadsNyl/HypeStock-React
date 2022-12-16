import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { About } from "../pages/About";
import { Home } from "../pages/Home";
import { Search } from "../pages/Search";
import { Symbol } from "../pages/Symbol";
import { AnimatePresence } from 'framer-motion';


export function AnimatedRoutes() {
    const location = useLocation();

    return(
        <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/search' element={<Search />} />
                <Route path='/:symbol' element={<Symbol />} />
            </Routes>
        </AnimatePresence>
    );
}