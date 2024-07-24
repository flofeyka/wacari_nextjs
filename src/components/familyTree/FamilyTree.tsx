'use client'
import "./FamilyTree.css"

const FamilyTreeComponent = () => {
    return (
        <div className="tree">
            <ul>
                <li>
                    <a href="#">Родитель</a>
                    <ul>
                        <li>
                            <a href="#">Ребенок 1 уровня</a>
                            <ul>
                                <li>
                                    <a href="#">Ребенок 2 уровня</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">Ребенок 1 уровня</a>
                            <ul>
                                <li><a href="#">Ребенок 2 уровня</a></li>
                                <li>
                                    <a href="#">Ребенок 2 уровня</a>
                                    <ul>
                                        <li>
                                            <a href="#">Ребенок  3 уровня</a>
                                        </li>
                                        <li>
                                            <a href="#">Ребенок 3 уровня</a>
                                        </li>
                                        <li>
                                            <a href="#">Ребенок 3 уровня</a>
                                        </li>
                                    </ul>
                                </li>
                                <li><a href="#">Ребенок 2 уровня</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default FamilyTreeComponent;