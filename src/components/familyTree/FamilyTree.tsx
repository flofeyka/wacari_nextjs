'use client'
import { IBiographyDetail } from "@/modals/BiographyDetail";
import "./FamilyTree.css";
import { FC } from "react";

type TreeComponentType = {
    guid: string;
    fullName: {
        firstName: string | null;
        lastName: string | null;
        middleName: string | null;
    };
    relationShip: string
}

const TreeComponent: FC<TreeComponentType> = ({ guid, fullName, relationShip }) => {
    return <a href={`/profile/${guid}`}>
        <div>
            <div style={{ display: "flex" }}>
                <div><img className="treeImg" src="" alt="" /></div>
                <div className="profileData">
                    <div style={{ fontWeight: "bold" }}>{fullName.firstName} {fullName.lastName} {fullName.middleName} </div>
                    <div style={{ marginTop: "10px" }}>{relationShip}</div>
                </div>
            </div>
        </div>
    </a>
}

const FamilyTreeComponent = ({ profileData }: { profileData: any }) => {
    return (
        <div className="tree">
            <ul>
                <li>
                    {profileData.father &&
                        <TreeComponent fullName={profileData.father.fullName} guid={profileData.father.guid} relationShip="Папа" />
                    }
                    <ul>
                        <li>
                            <div className="me"><TreeComponent fullName={profileData.fullName} guid={profileData.guid} relationShip="Я" /></div>
                            <ul>
                                {profileData.childrens.map((child: any) => <li>
                                    <TreeComponent fullName={child.fullName} guid={child.guid} relationShip="Ребёнок" />
                                </li>
                                )}
                            </ul>
                        </li>

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
                {profileData.mother &&
                    <li>

                        <TreeComponent fullName={profileData.mother.fullName} guid={profileData.mother.guid} relationShip="Мама" />
                    </li>
                }
            </ul>
        </div >
    )
}

export default FamilyTreeComponent;