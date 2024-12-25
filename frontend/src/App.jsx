import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

const routes = createBrowserRouter([
  {
    path:'/',
    element:<Home />,
    errorElement:<NotFoundPage />,
  },{
    path:'/signup',
    element:<SignUp />,
  },{
    path:'/login',
    element:<LogIn />,
  },
]);

const App = () => {
  return (
    <RouterProvider router={routes} />
  );
}

export default App;