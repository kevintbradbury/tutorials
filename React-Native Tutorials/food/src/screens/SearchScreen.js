import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults";
import ResultsList from "../components/ResultsList";
// import yelp from "../api/yelp";

const SearchScreen = () => {
  // console.log(props.navigation);

  const [term, setTerm] = useState("");
  const [searchAPI, results, errorMsg] = useResults();

  // console.log(results);

  const filterResultsByPrice = price => {
    return results.filter(result => {
      return result.price === price;
    });
  };

  return (
    <>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchAPI(term)}
      />
      {errorMsg ? <Text>{errorMsg}</Text> : null}
      {/* <Text>We have found {results.length} </Text> */}

      <ScrollView>
        <ResultsList
          // navigation={navigation}
          results={filterResultsByPrice("$")}
          title="Cost Effective"
        />
        <ResultsList
          // navigation={navigation}
          results={filterResultsByPrice("$$")}
          title="Bit pricier"
        />
        <ResultsList
          // navigation={navigation}
          results={filterResultsByPrice("$$$")}
          title="Big spender"
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
