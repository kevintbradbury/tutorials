import React, { useState } from "React";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const BlogPostForm = ({ onSubmit, initialValues }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);

  return (
    <View>
      <Text style={styles.label}>Enter Title</Text>
      <TextInput
        value={title}
        onChangeText={text => setTitle(text)}
        style={styles.input}
      />
      <Text style={styles.label}>Enter Content:</Text>
      <TextInput
        value={content}
        onChangeText={text => setContent(text)}
        style={styles.input}
      />
      <Button
        title="Save blog post"
        onPress={() => {
          onSubmit(title, content);
        }}
      />
    </View>
  );
};

BlogPostForm.defaultProps = {
  initialValues: {
    title: "",
    content: ""
  }
};

const styles = StyleSheet.create({
  input: {
    borderColor: "grey",
    borderWidth: 1,
    fontSize: 18,
    marginBottom: 15,
    padding: 5,
    marginLeft: 5
  },
  label: {
    fontSize: 20,
    marginBottom: 5
  }
});

export default BlogPostForm;
