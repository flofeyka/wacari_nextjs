'use client'
import "./Footer.css"
import CONSTANTS from "@/constants.json"
import Link from "next/link";
import {useRouter} from "next/navigation";


const Footer = () => {
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
                <Link className="footer-menu-item" href="/instruction">
                    Как добавить биографию
                </Link>
            </div>
        </div>
    )
}

export default Footer;