import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import indexRoutes from "./index";

export default function App() {
  const router = () => {
    let routes: any = indexRoutes;
    return routes;
  };

  const isExact = (value: any) => {
    let returnValue = true;
    if (value === true) {
      returnValue = true;
    } else {
      returnValue = false;
    }
    return returnValue;
  };
  return (
    <Router>
      <Switch>
        {router().map((prop: any, key: any) => {
          return (
            <Route
              path={prop.path}
              key={key.id}
              component={(props: any) => <prop.component {...props} />}
              exact={isExact(prop.exact)}
            />
          );
        })}
      </Switch>
    </Router>
  );
}
