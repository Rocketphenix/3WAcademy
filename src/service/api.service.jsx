import axios from "axios";

const api = axios.create({
	baseURL: "https://jsonplaceholder.typicode.com/",
});

const useApi = () => {
	const fetchPosts = async (limit = 10) => {
		return await api.get(`/posts?_limit=${limit}`);
	};

	const addPost = async ({ title, body }) => {
		return await api.post("/posts", { title, body, userId: 1 });
	};

	const fetchComments = async (postId, limit = 5) => {
		return await api.get(`/posts/${postId}/comments?_limit=${limit}`);
	};

	return {
		fetchPosts,
		fetchComments,
		addPost,
	};
};

export default useApi;
