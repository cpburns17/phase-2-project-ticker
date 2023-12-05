import App from "./App"
import StockCard from "./StockCard";
import SavedStocks from "./SavedStocks";
import SearchResults from "./SearchResults";




const routes = [
    {
      path: "/",
      element: <App />,
      errorElement: <h1>Somthing went wrong!</h1>,
      children: [
        {
          path: "/stock",
          element: <StockCard />,
        },
        {
          path: "/savedstocks",
          element: <SavedStocks />,
        },
  
        {
          path: "/search-results",
          element: <SearchResults />,
        }
      ]
    }];

  export default routes;