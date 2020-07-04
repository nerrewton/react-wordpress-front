import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { Spinner } from "react-bootstrap";
import { getComponent } from "./routes/routeComponentMap";
import portalMenus from "./routes/routesDefinition.json";

const Post = lazy(()=> import("./pages/Post"));
const Page = lazy(()=> import("./pages/Page"));
const Tool = lazy(()=> import("./pages/Tool"));

const Loading = () => <Spinner animation="border" variant="warning" className="spinnerCustom"/>;

const App = () => {
    let menus = portalMenus;

    return (
        <BrowserRouter>
            <Switch>
                {menus.map((menu, key) => {
                    const Componente = getComponent(menu.component);
                    return (
                        <Route exact path={menu.ruta} key={key}>
                            <Suspense fallback={Loading()}>
                                <Componente />
                            </Suspense>
                        </Route>
                    );
                })}
                <Route exact path="/post/:post_url">
                    <Suspense fallback={Loading()}>
                        <Post />
                    </Suspense>
                </Route>
                <Route exact path="/tool/:tool_url?">
                    <Suspense fallback={Loading()}>
                        <Tool />
                    </Suspense>
                </Route>
                <Route exact path="/page/:page_url">
                    <Suspense fallback={Loading()}>
                        <Page />
                    </Suspense>
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
