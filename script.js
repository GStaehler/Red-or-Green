let db = new PouchDB("redorgreen");

db.get('bestScore').then(function (doc) {
	console.log(doc);
}).catch(function (err) {
	db.put({
		_id: 'bestScore',
		bestScore: 0
	}).then(function (response) {
		window.location.reload();
	}).catch(function (err) {
		console.log(err);
	});
});

let myArray = [
  "pink",
  "lightgreen"
];

function gameOver() {
	let lastScore = document.getElementById("points").textContent;
	console.log(lastScore);
	db.get('bestScore').then(function(doc) {
		if (lastScore > doc.bestScore && lastScore !== "Retry? Press Enter") {
		return db.put({
			_id: doc._id,
			_rev: doc._rev,
			bestScore: lastScore
		})}
	}).then(function(response) {
		db.get('bestScore').then(function (doc) {
			document.getElementById("best").textContent = "Best Score : " + doc.bestScore;
		}).catch(function (err) {
			console.log(err);
		});
	}).catch(function (err) {
		console.log(err);
	});
	document.body.style.backgroundColor = "lightblue";
	document.getElementById("points").textContent = "Retry? Press Enter";
	game();
}

function game() {
	db.get('bestScore').then(function (doc) {
		document.getElementById("best").textContent = "Best Score : " + doc.bestScore;
	}).catch(function (err) {
		console.log(err);
	});
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
