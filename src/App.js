import { Routes, Route } from "react-router-dom";
import Lien from "./component/Lien";
import Header from "./page/Header/index.page.jsx";
import SettingsPage from "./page/SettingsPage/index.page.jsx";

function App() {
	return (
		<div>
			<Lien />
			<Routes>
				<Route path="/" element={<Header />} />
				<Route path="/settings" element={<SettingsPage />} />
			</Routes>
		</div>
	);
}

export default App;
