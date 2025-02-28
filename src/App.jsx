import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { fetchPost } from "./store/slice/postsSlice";
import { useDispatch } from "react-redux";
import "./app.css";
import HomePage from "./page/Home/index.page.jsx";
import PostDetailPage from "./page/PostDetail/index.page.jsx";
import AddPostPage from "./page/AddPost/index.page.jsx";
import Nav from "./component/Nav";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPost());
	}, [dispatch]);

	return (
		<>
			<h1>Plateforme de Publication de Posts et Commentaires</h1>
			<Nav />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/post/:id" element={<PostDetailPage />} />
				<Route path="/add-post" element={<AddPostPage />} />
			</Routes>
		</>
	);
}

export default App;
