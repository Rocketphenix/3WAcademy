import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
//import { CalculateProvider } from "./context/CalculateContext";
//import { QuizzProvider } from "./context/QuizzContext";
//import { CartProvider } from "./context/CartContext";
import { MorpionProvider } from "./context/MorpionContext";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		{/* <CalculateProvider>
			<App />
		</CalculateProvider> */}
		{/* <QuizzProvider>
			<App />
		</QuizzProvider> */}
		{/* <CartProvider>
			<App />
		</CartProvider> */}
		<MorpionProvider>
			<App />
		</MorpionProvider>
	</StrictMode>
);
