import React from "react";
import { Switch, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { getComponent } from "./routes/routeComponentMap";
import portalMenus from "./routes/routesDefinition.json";

import Post from "./pages/Post";
import Page from "./pages/Page";
import Tool from "./pages/Tool";

const App = () => {
    let menus = portalMenus;

    return (
        <Switch>
            {menus.map((menu, key) => {
                const Componente = getComponent(menu.component);
                return (
                    <Route exact path={menu.ruta} key={key}>
                        <Componente />
                    </Route>
                );
            })}
            <Route exact path="/post/:post_url">
                <Post />
            </Route>
            <Route exact path="/tool/:tool_url?">
                <Tool />
            </Route>
            <Route exact path="/page/:page_url">
                <Page />
            </Route>
            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
    );
};

export default App;
