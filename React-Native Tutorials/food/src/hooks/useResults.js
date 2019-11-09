import { useEffect, useState } from "react";
import yelp from "../api/yelp";

export default () => {
  const [results, setResults] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const searchAPI = async searchTerm => {
    console.log("Hi there");

    try {
      const response = await yelp.get("/search", {
        params: {
          limit: 50,
          term: searchTerm,
          location: "Long Beach"
        }
      });
      setResults(response.data.businesses);
    } catch (err) {
      setErrorMsg("SMth went wrong");
    }
  };

  // Called when component 1st rendered
  // BAD code
  // searchAPI("pasta");

  useEffect(() => {
    searchAPI("pasta");
  }, []);

  return [searchAPI, results, errorMsg];
};
