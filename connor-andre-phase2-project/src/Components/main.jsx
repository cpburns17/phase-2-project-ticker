import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"

import App from "./App"
import Layout from "./Layout"
import SavedStocks from "./SavedStocks";
import SearchBar from "./SearchBar";
import StockCard from "./StockCard";
import Metrics from "./Metrics"

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <h1>Somthing went wrong!</h1>,
      children: [
        {
          path: "/",
          element: <App />,
        },
        {
          path: "/savedstocks",
          element: <SavedStocks />,
        },
  
        {
          path: "/search",
          element: <SearchBar/>,
        },

        {
          path:"/stockdetails",
          element: <StockCard />
        },
        {
          path: "/stockmetrics",
          element: <Metrics/>
        }
      ]
    }]);

    ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <RouterProvider router={routes} />
      </React.StrictMode>
    );

