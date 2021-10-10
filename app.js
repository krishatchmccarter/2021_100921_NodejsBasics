// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

//Require https
const https = require("https");

//Function to print message to console
function printMessage(username, badgeCount, points) {
	const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
	console.log(message);
}

function getProfile(username) {
	try {
		// Connect to the API URL (https://teamtreehouse.com/username.json)
		const request = https.get(
			`https://teamtreehouse.com/${username}.json`,
			(response) => {
				let body = "";
				//console.dir(response);
				//console.log(response.statusCode);
				// Read the data
				response.on("data", (data) => {
					body += data.toString();
				});
				response.on("end", () => {
					try {
						// Parse the data
						const profile = JSON.parse(body);
						//console.log(body);
						//console.log(typeof body);
						//console.dir(profile);
						printMessage(
							username,
							profile.badges.length,
							profile.points.JavaScript
						);
					} catch (error) {
						console.error(error.message);
					}
				});
				// Print the data
			}
		);
		request.on("error", (e) =>
			console.error(`Problem with request: ${e.message}`)
		);
	} catch (error) {
		console.error(error.message);
	}
}
//console.dir(process);
const users = process.argv.slice(2);
//const users = ["krishatchmccarter", "chalkers"];

//type in terminal node app.js chalkers
users.forEach(getProfile);
