import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthProvider";
import { CachedAuthProvider } from "./context/CachedAuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

ReactDOM.createRoot(document.getElementById("react-app")).render(
    <React.StrictMode>
        <BrowserRouter>
            <CachedAuthProvider>
                <AuthProvider>
                    <Routes>
                        <Route path="/*" element={<App />} />
                    </Routes>
                </AuthProvider>
            </CachedAuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
