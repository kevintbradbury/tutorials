import axios from "axios";

export default axios.create({
  baseURL: "https://api.yelp.com/v3/businesses/",
  headers: {
    Authorization:
      "Bearer K01Ick0zq2vPoPv52QF2DIMpHNU8WZKkPE081KI1s8b2pVbngVYwrXNDiUAHuqUPkV6bl5ujxl5lFXxyapwuE4mnaQXhr2C3gGxz6UktG9m1kbFpjJg9JJFtbVYfWnYx"
  }
});
