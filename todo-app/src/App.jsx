import "./App.css";
import { Routes, Route } from "react-router-dom";
import Nav from "./component/Nav/index.jsx";
import HomePage from "./page/Home/index.page.jsx";
import LoginPage from "./page/Login/index.page.jsx";
import JouerPage from "./page/Jouer/index.page.jsx";

function App() {
	return (
		<>
			<Nav />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/jouer" element={<JouerPage />} />

				<Route path="*" element={<HomePage />} />
			</Routes>
		</>
	);
}

export default App;
