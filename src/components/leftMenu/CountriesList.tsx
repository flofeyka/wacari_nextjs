'use client'

import { useState } from "react";

export default function CountriesList({ continent }: { continent: any }) {
    const [activeCountryIndex, setActiveCountryIndex] = useState<string>("");

    return <div className='countryItem'>
        {continent.children.map((children: any) => <div key={children.key}>
            <div onClick={() => setActiveCountryIndex(activeCountryIndex === children.key ? "" : children.key)}
                id={activeCountryIndex == children.key ? 'menu-item' + "-active" : "menu-item"}>
                {children.label} <span style={{ marginLeft: "12px", display: "flex" }}> {activeCountryIndex === children.key ? <span>-</span> : <span>+</span>} </span>
            </div>
            <div>
                {activeCountryIndex == children.key && <div style={{marginLeft: "15px"}}>
                    {children.children.map((child: any) => <div id="menu-item" key={child.key}>{child.label}</div>)}
                </div>}
            </div>
        </div>)}
    </div>
}