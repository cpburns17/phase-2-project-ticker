import App from "./App"
import HomePage from "./StockContainer"
import StockCard from "./StockCard";
import SavedStocks from "./SavedStocks";
import SearchResults from "./SearchResults";


const routes = [
    {
      path: "/",
      element: <App />,
    }, 
    // {
    //   path: "/searchbar",
    //   element: <Profile />,
    // },
    {
      path: "/stock",
      element: <StockCard />,
    },
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