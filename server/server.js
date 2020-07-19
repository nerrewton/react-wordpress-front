import path from "path";
import fs from "fs";

import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";

import { store } from "../src/redux/store";
import App from "../src/App";

const PORT = 80;
const app = express();

const router = express.Router();

const serverRenderer = (req, res, next) => {
    fs.readFile(path.resolve("./build/index.html"), "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("An error occurred");
        }

        const html = ReactDOMServer.renderToString(
            <Provider store={store}>
                <StaticRouter>
                    <App />
                </StaticRouter>
            </Provider>
        );

        // Grab the initial state from our Redux store
        const preloadedState = store.getState()
        
        const fullHtml = data.replace(
            '<div id="root"></div>',
            `<div id="root">${html}</div>
            <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // https://redux.js.org/recipes/server-rendering/#security-considerations
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
                /</g,
                '\\u003c'
            )}
            </script>
            `
        );
        
        return res.send( fullHtml );
    });
};
router.use("^/$", serverRenderer);

router.use(
    express.static(path.resolve(__dirname, "..", "build"), { maxAge: "30d" })
);

// tell the app to use the above rules
app.use(router);

// app.use(express.static('./build'))
app.listen(PORT, () => {
    console.log(`SSR running on port ${PORT}`);
});
