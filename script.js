var myArray = [
  "pink",
  "lightgreen"
];

function gameOver() {
	document.body.style.backgroundColor = "lightblue";
	document.getElementById("points").textContent = "Retry? Press Enter";
	game();
}

function game() {
	let points = 1;
	document.onkeydown = function (e) {
		let keyCode = e.keyCode;
		if (keyCode === 13) {
			let randomItem = myArray[Math.floor(Math.random() * myArray.length)];
			document.body.style.backgroundColor = randomItem;
			document.getElementById("points").textContent = 0;
			document.onkeydown = function (e) {
				let keyCode = e.keyCode;
				if (keyCode === 37) {
					document.getElementById("left").focus();
				}
				if (keyCode === 39) {
					document.getElementById("right").focus();
				}
			};
			document.onkeyup = function (e) {
				let keyCode = e.keyCode;
				if (keyCode === 37) {
					document.getElementById("left").blur();
					if (document.body.style.backgroundColor === "pink") {
						document.getElementById("points").textContent = points++;
						let randomItem = myArray[Math.floor(Math.random() * myArray.length)];
						document.body.style.backgroundColor = randomItem;
					} else {
						gameOver();
					}
				}
				if (keyCode === 39) {
					document.getElementById("right").blur();
					if (document.body.style.backgroundColor === "lightgreen") {
						document.getElementById("points").textContent = points++;
						let randomItem = myArray[Math.floor(Math.random() * myArray.length)];
						document.body.style.backgroundColor = randomItem;
					} else {
						gameOver();
					}
				}
			};
		}
	};
}

game();
