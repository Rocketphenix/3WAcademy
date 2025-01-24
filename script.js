let elInput = document.querySelector(".post");
let elSubmit = document.querySelector(".submitPost");
let message = document.querySelector(".message");
let error = document.getElementById("error");

// 1.
let value = "";

function eventInput(event) {
	if (!isNaN(elInput.value) && elInput.value >= 0) {
		value = elInput.value;
		error.classList.add("hidden");
	} else {
		elInput.value = elInput.value.slice(0, -1);
		error.classList.remove("hidden");
	}
}

elInput.addEventListener("input", eventInput);

posts = [];
// 2.
async function onClick(event) {
	if (value != "" || value > 0) {
		let promises = [];

		for (let i = 0; i < value; i++) {
			const promise = fetch("https://jsonplaceholder.typicode.com/todos/1")
				.then((response) => response.json())
				.then((json) => addMsg(json.title));

			promises.push(promise);
		}
		await Promise.all(promises);
		calcul_e();
	}
}
function addMsg(msg) {
	posts.push(msg);
}
function calcul_e() {
	message.innerHTML = "";
	let nbr_e = 0;
	let totalPhrases = posts.length; // Nombre total de phrases
	let listPosts = document.createElement("ul");

	posts.forEach((post) => {
		let count_e_in_post = 0; // Compteur de 'e' pour cette phrase

		// Compter les 'e' dans chaque phrase
		for (let i = 0; i < post.length; i++) {
			if (post[i] == "e") {
				nbr_e++;
				count_e_in_post++;
			}
		}

		let newPost = document.createElement("li");
		newPost.innerText = post;
		listPosts.appendChild(newPost);
	});

	message.appendChild(listPosts);

	// Calculer la moyenne de 'e' par phrase
	let average_e = totalPhrases > 0 ? nbr_e / totalPhrases : 0; // Eviter la division par zéro

	let messageNbr_e = document.createElement("h2");
	messageNbr_e.innerText = `Il y a ${nbr_e} 'e' au total, avec une moyenne de ${average_e.toFixed(
		2
	)} 'e' par phrase.`;
	messageNbr_e.classList.add("result");
	message.appendChild(messageNbr_e);
}

elSubmit.addEventListener("click", onClick);
