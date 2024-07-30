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
        <div className={`card ${relationShip === 'Я' ? 'me' : ''}`}>
            <div className="card_content">
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
                <div className="parent-nodes">
                    {profileData.father && (
                        <TreeComponent fullName={profileData.father.fullName} guid={profileData.father.guid} relationShip="Папа" />
                    )}
                    {profileData.mother && (
                        <TreeComponent fullName={profileData.mother.fullName} guid={profileData.mother.guid} relationShip="Мама" />
                    )}
                </div>
                <ul>
                    <li>
                        <TreeComponent fullName={profileData.fullName} guid={profileData.guid} relationShip="Я" />
                        {profileData.childrens.length > 0 && (
                            <ul>
                                {profileData.childrens.map((child: any) => (
                                    <li key={child.guid}>
                                        <TreeComponent fullName={child.fullName} guid={child.guid} relationShip="Ребёнок" />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    )
}

export default FamilyTreeComponent;