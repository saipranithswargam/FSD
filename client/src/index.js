import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route
                    path="/*"
                    element={
                        <React.Suspense fallback={<p>Loading...</p>}>
                            <App />
                        </React.Suspense>
                    }
                />
            </Routes>
        </BrowserRouter>
    </Provider>
);
