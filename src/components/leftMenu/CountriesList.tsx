'use client'

import { useState } from "react";
import { motion } from "framer-motion";

export default function CountriesList({ continent }: { continent: any }) {
    const [activeCountryIndex, setActiveCountryIndex] = useState<string>("");

    return <div className='countryItem'>
        {continent.children.map((children: any) => <motion.div initial={{ opacity: 0, y: -10 }} // Начальное состояние
            animate={{ opacity: 1, x: 0, y: 0 }}    // Конечное состояние
            transition={{ duration: 0.25 }} key={children.key}>
            <div onClick={() => setActiveCountryIndex(activeCountryIndex === children.key ? "" : children.key)}
                id={activeCountryIndex == children.key ? 'menu-item' + "-active" : "menu-item"}>
                {children.label} <span style={{ marginLeft: "12px", display: "flex" }}> {activeCountryIndex === children.key ? <span>-</span> : <span>+</span>} </span>
            </div>
            <div>
                {activeCountryIndex == children.key && <div style={{ marginLeft: "15px" }}>
                    {children.children.map((child: any) => <motion.div initial={{ opacity: 0, y: -10 }} // Начальное состояние
                        animate={{ opacity: 1, x: 0, y: 0 }}    // Конечное состояние
                        transition={{ duration: 0.25 }} id="menu-item" key={child.key}>{child.label}</motion.div>)}
                </div>}
            </div>
        </motion.div>)}
    </div>
}