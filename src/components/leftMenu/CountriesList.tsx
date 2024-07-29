'use client'

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function CountriesList({ continent }: { continent: any }) {
    const [activeCountryIndex, setActiveCountryIndex] = useState<string>("");

    return <div className='countryItem'>
            {continent.children.map((children: any) => <motion.div
                initial={{ opacity: 0, height: 0 }} exit={{ opacity: 0, height: 0 }} // Начальное состояние
                animate={{ opacity: 1, height: 'auto' }}
                className="country-item" key={children.key}>
                <div style={{ fontSize: "18px" }} onClick={() => setActiveCountryIndex(activeCountryIndex === children.key ? "" : children.key)}
                    id={activeCountryIndex == children.key ? 'menu-item' + "-active" : "menu-item"}>
                    {children.label} <span style={{ marginLeft: "12px", display: "flex" }}> {activeCountryIndex === children.key ? <span>-</span> : <span>+</span>} </span>
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <AnimatePresence>
                        {activeCountryIndex == children.key && <div style={{ marginLeft: "15px" }}>
                            {children.children.map((child: any) => <motion.div style={{ fontSize: "14px", marginBottom: "5px" }}
                                initial={{ opacity: 0, height: 0 }} exit={{ opacity: 0, height: 0 }} // Начальное состояние
                                animate={{ opacity: 1, height: 'auto' }}
                                id="menu-item" key={child.key}>{child.label}</motion.div>
                            )}
                        </div>}
                    </AnimatePresence>

                </div>
            </motion.div>
            )}
    </div>
}