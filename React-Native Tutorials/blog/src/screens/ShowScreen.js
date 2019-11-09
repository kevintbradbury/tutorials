import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Context } from "../context/BlogContext";
import {
  TouchableHighlight,
  TouchableOpacity
} from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

const ShowScreen = ({ navigation }) => {
  const { state } = useContext(Context);
  const blogPost = state.find(post => post.id == navigation.getParam("id"));

  return (
    <View>
      <Text style={styles.title}>{blogPost.title}</Text>
      <Text style={styles.content}>{blogPost.content}</Text>
    </View>
  );
};

ShowScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Edit", { id: navigation.getParam("id") })
        }
      >
        <Feather name="edit" style={styles.icon} />
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    flex: 1,
    padding: 20,
    borderWidth: 1,
    borderColor: "gray",
    justifyContent: "center"
  },
  content: {
    margin: 20
  },
  icon: {
    marginRight: 20,
    fontSize: 20
  }
});

export default ShowScreen;
