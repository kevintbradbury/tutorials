import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SearchScreen from "./src/screens/SearchScreen";
import ResultsScreenShow from "./src/screens/ResultsScreenShow";

const navigator = createStackNavigator(
  {
    Search: SearchScreen,
    ResultsShow: ResultsScreenShow
  },
  {
    initialRouteName: "Search",
    defaultNavigationOptions: {
      title: "Business Search"
    }
  }
);

export default createAppContainer(navigator);

//

// Yelp
// Client ID
// ih_D0tv9FsD5dR1Gx6K17Q
// API Key
// K01Ick0zq2vPoPv52QF2DIMpHNU8WZKkPE081KI1s8b2pVbngVYwrXNDiUAHuqUPkV6bl5ujxl5lFXxyapwuE4mnaQXhr2C3gGxz6UktG9m1kbFpjJg9JJFtbVYfWnYx
