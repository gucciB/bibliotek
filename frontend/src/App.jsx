import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

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
    <AnimatePresence mode="wait">
      <RouterProvider router={routes} />
    </AnimatePresence>
  );
}

export default App;