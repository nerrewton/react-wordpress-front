import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import menus from "./testParameters/menuParams.json";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import { getComponent } from "./routes/routeComponentMap";

const App = () => {
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
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
