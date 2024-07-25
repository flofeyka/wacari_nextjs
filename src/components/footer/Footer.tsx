'use client'
import "./Footer.css"
import CONSTANTS from "@/constants.json"
import Link from "next/link";
import {useRouter} from "next/navigation";
import { FC } from "react";


const Footer:FC = () => {
    const router = useRouter()


    return(
        <div id="footer-component">
            <img id="footer-logo" src="/logo2.png" alt="" onClick={() => router.push('/')}/>
            <div id="footer-wrapper">
                <Link className="footer-menu-item" href="/about" >
                    О нас
                </Link>
                <Link className="footer-menu-item" href="/rules">
                    Правило и руководство
                </Link>
                <Link className="footer-menu-item" href="/help">
                    Помогите нам стать лучше
                </Link>
                <a className="footer-menu-item" href="https://www.youtube.com/watch?v=3NhjzPMC9lE">
                    Как добавить биографию
                </a>
            </div>
        </div>
    )
}

export default Footer;