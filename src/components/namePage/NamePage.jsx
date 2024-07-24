import "./name-page.scss";

import { Typography } from "@mui/material";

export default function NamePage({ name, desc }) {
    let description = '';

    if (desc) {
        description = <div className="name-page__info">
            <Typography>{desc}</Typography>
        </div>
    }
    return (
        <>
            <div className="name-page">
                <Typography variant="h1">{name}</Typography>
                {description}
            </div>
        </>
    )
}