import { Switch, Route } from "react-router-dom";
import PrivateLayout from "./layouts/PrivateLayout";
import NotFound from "./pages/NotFound";
import {  PRIVATE_ROUTER } from "router";

function App() {
  return (
    <Switch>
      <Route exact={true} path={PRIVATE_ROUTER.map((route) => route.path)}>
        <PrivateLayout>
          <Switch>
            {PRIVATE_ROUTER.map((item, id) => {
              return (
                <Route
                  key={item.key}
                  path={item.path}
                  exact={item.exact}
                  component={item.component}
                ></Route>
              );
            })}
          </Switch>
        </PrivateLayout>
      </Route>
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

export default App;
