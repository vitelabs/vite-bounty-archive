import about from "./about/about.component";
import Home from "./Home/Home.component";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <about />,
  }
];
