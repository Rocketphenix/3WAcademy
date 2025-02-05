import { useState, useRef, useEffect } from "react";

const CounterStoppable = () => {
	const [count, setCount] = useState(0);
	const [secondCount, setSecondCount] = useState(0);
	const [thirdCount, setThirdCount] = useState(0);
	const [chrono, activateChrono] = useState(false);
	const [secondChrono, activateSecondChrono] = useState(false);
	const [thirdChrono, activateThirdChrono] = useState(false);

	const timer1 = useRef(null); // 🔹 Stocker l'intervalle du premier compteur
	const timer2 = useRef(null); // 🔹 Stocker l'intervalle du deuxième compteur
	const timer3 = useRef(null); // 🔹 Stocker l'intervalle du deuxième compteur

	const [btnStartDisabled, disablingStart] = useState(false);
	const [firstStopDisabled, disablingFirstStop] = useState(true);
	const [secondStopDisabled, disablingSecondStop] = useState(true);
	const [thirdStopDisabled, disablingThirdStop] = useState(true);

	const startChrono = () => {
		activateChrono(true);
		activateSecondChrono(true);
		disablingStart(true);
		disablingFirstStop(false);
		disablingSecondStop(false);
		disablingThirdStop(false);

		// 🔹 Démarrer le premier compteur
		timer1.current = setInterval(() => {
			setCount((prev) => {
				if (prev >= 20) {
					clearInterval(timer1.current);
					activateChrono(false);
					disablingFirstStop(true);
					if (secondStopDisabled) disablingStart(false);
					return prev; // Ne pas dépasser 20
				}
				return prev + 1;
			});
		}, 1000);

		// ✅ Démarrer le deuxième compteur avec une condition à l'intérieur
		timer2.current = setInterval(() => {
			setSecondCount((prev) => {
				if (prev >= 20) {
					return 0;
				}
				return prev + 2;
			});
		}, 1000);

		// ✅ Démarrer le deuxième compteur avec une condition à l'intérieur
		timer3.current = setInterval(() => {
			setThirdCount((prev) => {
				if (prev >= 32) {
					return 0;
				}
				return prev + 1;
			});
		}, 1000);
	};

	const stopChrono = () => {
		clearInterval(timer1.current); // 🔹 Arrêter le premier intervalle
		activateChrono(false);
		disablingFirstStop(true);

		if (secondStopDisabled && thirdStopDisabled) {
			disablingStart(false);
		}
	};

	const stopSecondChrono = () => {
		clearInterval(timer2.current); // 🔹 Arrêter le deuxième intervalle
		activateSecondChrono(false);
		disablingSecondStop(true);

		if (firstStopDisabled && thirdStopDisabled) {
			disablingStart(false);
		}
	};

	const stopThirdChrono = () => {
		clearInterval(timer3.current); // 🔹 Arrêter le deuxième intervalle
		activateThirdChrono(false);
		disablingThirdStop(true);

		if (firstStopDisabled && secondStopDisabled) {
			disablingStart(false);
		}
	};

	return (
		<>
			<button onClick={startChrono} disabled={btnStartDisabled}>
				Start
			</button>
			<button onClick={stopChrono} disabled={firstStopDisabled}>
				Stop Premier compteur
			</button>
			<button onClick={stopSecondChrono} disabled={secondStopDisabled}>
				Stop Deuxième compteur
			</button>
			<button onClick={stopThirdChrono} disabled={thirdStopDisabled}>
				Stop Troisième compteur
			</button>
			<p>Premier compteur: {count}</p>
			<p>Deuxième compteur: {secondCount}</p>
			<p>Troisième compteur: {thirdCount.toString(2)}</p>
		</>
	);
};

export default CounterStoppable;
