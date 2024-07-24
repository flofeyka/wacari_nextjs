'use client'
import "./InstructionPage.css"
import LeftMenu from "@/components/leftMenu/LeftMenu";


const InstructionPage = () => {
    return (
        <div id="instruction-page">
            <div id="component-left-menu">
                <LeftMenu/>
            </div>
            <div id="instruction-page-wrapper">
                <h3>Как добавить биографию</h3>
            </div>
        </div>
    )
}

export default InstructionPage;