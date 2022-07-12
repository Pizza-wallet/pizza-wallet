import { Route } from "../../../types";

const isSupported = () => {
  try {
    const itemBackup = localStorage.getItem("");
    localStorage.removeItem("");
    if (itemBackup === null) localStorage.removeItem("");
    else localStorage.setItem("", itemBackup);
    return true;
  } catch (e) {
    return false;
  }
};

const storeRoute = (route: Route) => {
  if (!isSupported()) return;
  const storedRoutes = readAllRoutes();
  let updatedRoutes: Route[];
  if (!storedRoutes.length) {
    updatedRoutes = [route];
  } else {
    let replaced = false;
    updatedRoutes = storedRoutes.map((storedRoute) => {
      if (storedRoute.id === route.id) {
        storedRoute = route;
        replaced = true;
      }
      return storedRoute;
    });
    if (!replaced) {
      updatedRoutes.push(route);
    }
  }

  localStorage.setItem("routes", JSON.stringify(updatedRoutes));
};

const readAllRoutes = (): Array<Route> => {
  if (!isSupported()) {
    return [] as Array<Route>;
  }
  const routeString = localStorage.getItem("routes");

  if (routeString) {
    try {
      const routes = JSON.parse(routeString) as Array<Route>;
      return routes as Array<Route>;
    } catch (e) {
      return [] as Array<Route>;
    }
  } else {
    return [] as Array<Route>;
  }
};

export { storeRoute };
