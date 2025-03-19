import "./App.css";
import { Routes, Route } from "react-router-dom";
import Nav from "./component/Nav/index.jsx";
import HomePage from "./page/Home/index.page.jsx";
import LoginPage from "./page/Login/index.page.jsx";
import JouerPage from "./page/Jouer/index.page.jsx";
import AdminPage from "./page/Admin/index.page.jsx";
import NewPastriePage from "./page/newPastrie/index.page.jsx";
import Footer from "./component/Footer/index.jsx";

function App() {
	return (
		<>
			<header>
				<Nav />
			</header>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/jouer" element={<JouerPage />} />
				<Route path="/admin" element={<AdminPage />} />
				<Route path="/newPastrie" element={<NewPastriePage />} />

				<Route path="*" element={<HomePage />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
