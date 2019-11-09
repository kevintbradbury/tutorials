import createDataContext from "../context/createDataContext";
import jsonServer from "../api/jsonServer";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "get_blogpost":
      return action.payload;

    case "delete_blogpost":
      return state.filter(blogPost => blogPost.id !== action.payload); // payload should be an id

    case "edit_blogpost":
      return state.map(post => {
        return post.id == action.payload.id ? action.payload : post;
      });

    // case "add_blogpost":
    //   return [
    //     ...state,
    //     {id: Math.floor(Math.random() * 99999),title: action.payload.title,content: action.payload.content}
    //   ];

    default:
      return state;
  }
};

const getBlogPosts = dispatch => {
  return async () => {
    const response = await jsonServer.get("/blogposts");
    dispatch({ type: "get_blogpost", payload: response.data });
  };
};

const addBlogPost = dispatch => {
  return async (title, content, callback) => {
    await jsonServer.post("/blogposts", { title, content });
    if (callback) {
      callback();
    }
  };
};

const editBlogPost = dispatch => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogposts/${id}`, { title, content });

    dispatch({ type: "edit_blogpost", payload: { id, title, content } });
    if (callback) {
      callback();
    }
  };
};

const deleteBlogPost = dispatch => {
  return async id => {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({ type: "delete_blogpost", payload: id });
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);

// {title: "Test Post",content: "All the content\n another line here \nAnd one more",id: Math.floor(Math.random() * 99999)}
