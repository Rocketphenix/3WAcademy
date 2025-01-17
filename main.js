var zoneQuote = document.getElementById("quote");
var rond1 = document.getElementById("rond1");
var rond2 = document.getElementById("rond2");

rond1.addEventListener("click", function () {
	zoneQuote.innerHTML = "";

	let quote = document.createElement("p");
	quote.innerText =
		"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, magni? Incidunt, cum perspiciatis,	sed dicta deserunt a blanditiis ut possimus eius quas repellat obcaecati placeat magni iure vero, quidem iste nostrum officiis! Vero voluptatum voluptas mollitia modi eos.";

	let icone = document.createElement("img");
	icone.src = "./img/icone.png";
	icone.alt = "icone1";

	let autor = document.createElement("p");
	autor.innerHTML = "Jacky Daniels, <span>Starred-Chef</span>";

	zoneQuote.appendChild(quote);
	zoneQuote.appendChild(icone);
	zoneQuote.appendChild(autor);
});

rond2.addEventListener("click", function () {
	zoneQuote.innerHTML = "";

	let quote = document.createElement("p");
	quote.innerText =
		"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, magni? Incidunt, cum perspiciatis, quidem iste nostrum officiis! Vero voluptatum voluptas mollitia modi eos.";

	let icone = document.createElement("img");
	icone.src = "./img/icone.png";
	icone.alt = "icone2";

	let autor = document.createElement("p");
	autor.innerHTML = "Henry Parent, <span>Bad-Chef</span>";

	zoneQuote.appendChild(quote);
	zoneQuote.appendChild(icone);
	zoneQuote.appendChild(autor);
});
