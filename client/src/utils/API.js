import axios from "axios";

export default {
    // Get all posts
    getPosts: function () {
        return axios.get("/api/posts");
    },
    // Get a post with specific id
    getPost: function (id) {
        return axios.get("/api/posts/" + id);
    },
    // Delete post with the given id
    deletePost: function (id) {
        return axios.delete("/api/posts/" + id);
    },
    // Saves a post to the database
    savePost: function (postData) {
        return axios.post("/api/posts", postData);
    },
};