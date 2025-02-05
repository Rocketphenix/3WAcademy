import "./App.css";
// import Messages from "./component/Messages.jsx";
// import Students from "./component/Students.jsx";
// import TestState from "./component/TestState.jsx";
// import TestStateFunc from "./component/TestStateFunc.jsx";
// import Counter from "./component/Counter.jsx";
// import CounterBtn from "./component/CounterBtn.jsx";
// import CounterStoppable from "./component/CounterStoppable.jsx";
// import AlertBtn from "./component/AlertBtn";
import Calculatrice from "./component/Calculatrice/Calculatrice";

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
	// 	</>
	// );

	return (
		<>
			<Calculatrice />
		</>
	);
}

export default App;
