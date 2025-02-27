// path : redux-exemple/src/page/Home/index.page.jsx
import "./style.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTodo } from "../../store/slice/todoSlice.jsx";
// import { Outlet } from "react-router-dom";
import NewTodoPage from "../NewTodo/index.page.jsx";
import { Routes, Route } from "react-router";
import TodoList from "../../component/TodoList/index.jsx";
import Nav from "../../component/Nav/index.jsx";
import TodoDetail from "../../component/TodoDetail/index.jsx";

const HomePage = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTodo());
	}, []);

	return (
		<div className="page" id="Home">
			<h1>Todo List</h1>
			<Nav />
			<Routes>
				<Route path={"/"} element={<TodoList />}></Route>
				<Route path={"/NewTodo"} element={<NewTodoPage />} />
				<Route path={"/TodoDetail"} element={<TodoDetail />} />
			</Routes>
			{/* <Outlet context={game} /> */}
		</div>
	);
};

export default HomePage;
