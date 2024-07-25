'use client'
import "./FamilyTree.css"

const FamilyTreeComponent = ({ parentName, childrens }: { parentName: { firstName: string; middleName: string; lastName: string } | undefined, childrens: any[] | undefined }) => {
    return (
        <div className="tree">
            <ul>
                <li>
                    <a href="#">{parentName?.firstName} {parentName?.lastName} {parentName?.middleName}</a>
                    <ul>
                        {childrens?.map((child: any) => {
                            return <li>
                                <a href="#">{child.fullName.firstName} {child.fullName.lastName} {child.fullName.middleName}</a>
                            </li>
                        })}
                    </ul>
                    {/* <ul>
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
                    </ul> */}
                </li>
            </ul>
        </div>
    )
}

export default FamilyTreeComponent;