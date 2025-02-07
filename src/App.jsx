import "./App.css";
// import Messages from "./component/Exo/Messages.jsx";
// import Students from "./component/Exo/Students.jsx";
// import TestState from "./component/Exo/TestState.jsx";
// import TestStateFunc from "./component/Exo/TestStateFunc.jsx";
// import Counter from "./component/Exo/Counter.jsx";
// import CounterBtn from "./component/Exo/CounterBtn.jsx";
// import CounterStoppable from "./component/Exo/CounterStoppable.jsx";
// import AlertBtn from "./component/Exo/AlertBtn";
// import Calculatrice from "./component/Calculatrice/Calculatrice";
// import Quizz from "./component/Quizz/Quizz";
// import Shop from "./component/CompShop/Shop";
import Morpion from "./component/Morpion/Morpion.jsx";

function App() {
	// const MESSAGES = [
	// 	{ message: "React JS" },
	// 	{ message: "React Native" },
	// 	{ message: "Angular" },
	// 	{ message: "Symfony" },
	// 	{ message: "MongoDB" },
	// ];
	// const students = [
	// 	{ notes: [12, 11, 10], name: "Alan" },
	// 	{ notes: [18, 10, 19], name: "Alice" },
	// 	{ notes: [10, 9, 11], name: "Bernard" },
	// 	{ notes: [11, 17, 19], name: "Sophie" },
	// ];
	// return (
	// 	<>
	// 		<Messages messages={MESSAGES} />
	// 		<Students students={students} />
	// 		<TestState />
	// 		<TestStateFunc />
	// 		<Counter time={10} />
	// 		<CounterBtn />
	// 		<CounterStoppable />
	//		<AlertBtn />
	//		<Calculatrice />
	//		<Quizz />
	//		<Shop />
	// 	</>
	// );

	return (
		<>
			<Morpion />
		</>
	);
}

export default App;
