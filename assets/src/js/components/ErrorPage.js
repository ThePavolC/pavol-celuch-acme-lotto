import React from "react";

import image404 from "../images/404.webp";

export default function ErrorPage() {
    return (
        <div id="error-page">
            <h1>Congrats!</h1>
            <p>You found a non existing page.</p>
            <img src={image404} alt="404cat" />
        </div>
    );
}
