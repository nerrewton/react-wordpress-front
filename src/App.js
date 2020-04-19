import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Post from "./pages/Post";
import { getComponent } from "./routes/routeComponentMap";
import portalMenus from "./routes/routesDefinition.json";

const App = () => {
    let menus = portalMenus;

    return (
        <Router>
            <Header menus={menus}/>
            <Switch>
                {menus.map((menu, key) => {
                    const Componente = getComponent(menu.component);
                    return (
                        <Route exact path={menu.ruta} key={key}>
                            <Componente />
                        </Route>
                    );
                })}
                <Route exact path="post/:post_url">
                    <Post />
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
