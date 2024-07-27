'use client'
import dynamic from 'next/dynamic';
import { GlobeMethods } from 'react-globe.gl';
// import Globe, {GlobeMethods} from 'react-globe.gl';
import { autoImplementMethods } from "next/dist/server/future/route-modules/app-route/helpers/auto-implement-methods";
import React, { useEffect, useState } from "react";
// const Globe = dynamic(import('react-globe.gl'), { ssr: false });
const Globe = dynamic(() => import('react-globe.gl'), {
    ssr: false,
})


const GlobeComponent = () => {
    const [width, setWidth] = useState<number>(1650)

    const globeEl = React.useRef<GlobeMethods>() as React.MutableRefObject<GlobeMethods>;

    const markerSvg = `<svg viewBox="-4 0 36 36">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="black" cx="14" cy="14" r="7"></circle>
  </svg>`;

    useEffect(() => {
        // Auto-rotate
        const controll = globeEl.current
        if (controll === undefined) return
        // noinspection TypeScriptUnresolvedVariable
        controll.controls().autoRotate = true;
        // noinspection TypeScriptUnresolvedVariable
        controll.controls().autoRotateSpeed = 0.2;
    }, [globeEl]);

    useEffect(() => {
        setWidth(window.innerWidth > 1400 ? window.innerWidth - 325 : window.innerWidth - 50)
    }, [width]);


    // Gen random data, marks
    const N = 110;
    const gData = []
    for (let i = 0; i < N; i++) {
        gData.push(
            {
                lat: (Math.random() - 0.5) * 180,
                lng: (Math.random() - 0.5) * 360,
                size: 30,
                color: ['red']
                // size: 7 + Math.random() * 30,
                // color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
            }
        )
    }
    // const gData = [...Array(N).keys()].map(() => ({
    //     lat: (Math.random() - 0.5) * 180,
    //     lng: (Math.random() - 0.5) * 360,
    //     size: 30,
    //     color: ['red']
    //     // size: 7 + Math.random() * 30,
    //     // color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
    // }));

    // if (globeEl.current === undefined) return null

    return (
        <Globe
            ref={globeEl}
            // width={window.innerWidth > 1200? window.innerWidth - 315: window.innerWidth - 50}
            width={width}
            height={600}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            htmlElementsData={gData}
            htmlElement={d => {
                const el = document.createElement('div');
                el.innerHTML = markerSvg;
                // el.style.color = d.color;
                el.style.color = "red";
                // el.style.width = `${d.size}px`;
                el.style.width = `20px`;

                // el.style['pointer-events'] = 'auto';
                el.style.cursor = 'pointer';
                el.onclick = () => console.info(d);
                return el;
            }}
        />
    );
}

export default GlobeComponent;
