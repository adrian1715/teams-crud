import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Teams from "./pages/Teams";
import NewTeam from "./pages/NewTeam";
import ShowTeam from "./pages/ShowTeam";
import EditTeam from "./pages/EditTeam";
import NotFound from "./pages/NotFound";
import RootElement from "./components/RootElement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootElement />,
    children: [
      {
        // index: true,
        path: "/",
        element: <Teams />,
        errorElement: <NotFound />,
        children: [{ path: "new", element: <NewTeam /> }],
      },
      { path: ":id", element: <ShowTeam /> },
      { path: ":id/edit", element: <EditTeam /> },
    ],
  },
]);

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
