import React from "react";

export function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieValue = decodeURIComponent(
                    cookie.substring(name.length + 1)
                );
                break;
            }
        }
    }
    return cookieValue;
}

export function parseErrorMessage(responseData) {
    const FIELD_NAME_MAP = {
        username: "Username",
        email: "Email",
        password1: "New password",
        password2: "Repeat password",
    };
    return (
        <>
            {Object.entries(JSON.parse(responseData)).map(
                ([field, messages]) => {
                    const message = messages.map((e) => e.message);
                    return (
                        <>
                            <span key={field}>
                                {FIELD_NAME_MAP[field]} - {message}
                            </span>
                            <br />
                        </>
                    );
                }
            )}
        </>
    );
}

export function prettyDate(dateString) {
    return Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
        Date.parse(dateString)
    );
}
