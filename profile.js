//Require https module
const https = require("https");

//Require http module for status codes
const http = require("http");

//Print Error Messages
function printError(error) {
	console.error(error.message);
}

//Function to print message to console
function printMessage(username, badgeCount, points) {
	const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
	console.log(message);
}

function get(username) {
	try {
		// Connect to the API URL (https://teamtreehouse.com/username.json)
		const request = https.get(
			`https://teamtreehouse.com/${username}.json`,
			(response) => {
				if (response.statusCode === 200) {
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
							printError(error);
						}
					});
					// Print the data
				} else {
					const message = `There was an error getting the profile for ${username} (${
						http.STATUS_CODES[response.statusCode]
					})`;
					const statusCodeError = new Error(message);
					printError(statusCodeError);
				}
			}
		);
		request.on("error", printError);
	} catch (error) {
		printError(error);
	}
}

module.exports.get = get;
