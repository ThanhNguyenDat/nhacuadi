import React, { useMemo } from "react";
import ReactDOM from "react-dom/client";
import { Router, BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { MultiProvider } from "../providers/MultiProvider";
import ErrorBoundary from "./ErrorBoundary";
import { Pages } from "../pages";
import { createBrowserHistory } from "history";
import { LibraryProvider } from "../providers/LibraryProvider";

const browserHistory = createBrowserHistory({
    basename: "/",
});

window.ZAILH = browserHistory;

function App() {
    const getRouterPath = (pages) => {
        return pages.map((component) => {
            var Component;
            var path;
            if (typeof component === "object") {
                Component = component.component;
                path = component.path;
            } else {
                Component = component;
                path = component.path;
            }

            return (
                <Route key={path} path={path} element={<Component />}>
                    {/* {Component.pages && getRouterPath(Component.pages)} */}
                </Route>
            );
        });
    };
    const libraries = useMemo(() => ({}), []);
    return (
        <div className={"App"}>
            <ErrorBoundary>
                <MultiProvider
                    providers={[<LibraryProvider libraries={libraries} />]}
                >
                    <BrowserRouter>
                        <Routes>{getRouterPath(Pages)}</Routes>
                    </BrowserRouter>
                </MultiProvider>
            </ErrorBoundary>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("zailab"));
root.render(<App />);
