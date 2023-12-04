import App from "./App";
import HomePage from "./HomePage"
import SearchBar from "./SearchBar";
import StockCard from "./StockCard";
import SavedStocks from "./SavedStocks";


const routes = [
    {
      path: "/",
      element: <HomePage />,
    }, 
    {
      path: "/searchbar",
      element: <Profile />,
    },
    // {
    //   path: "/stock",
    //   element: <StockCard />,
    // },
    {
      path: "/savedstocks",
      element: <SavedStocks />,
    },
    {
        path: "/searchresults",
        element: <SearchResults />
    }
  ];

  export default routes;