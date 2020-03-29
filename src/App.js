import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import menus from "./testParameters/menuParams.json";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import { getComponent } from "./routes/routeComponentMap";
import { getAllMenus } from "./services/menu/menuServices";

const App = () => {
    let [ menus, setMenus ] = useState([]);
    let [ count ] = useState(0);
    const getMenusPortal = async () => {
        const allMenus = getAllMenus();
        await allMenus.then( response => {
            setMenus(  response );
        }).catch( error => {
            console.error("App -> error", error)        
        });
    }

    useEffect( () => { getMenusPortal(); }, [count]);

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
