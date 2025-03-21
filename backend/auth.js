const axios = require('axios');

const BASE_URL = 'http://20.244.56.144/test';
const AUTH_URL = `${BASE_URL}/auth`;

let accessToken = '';

// Function to Fetch a New Token
async function getNewToken() {
    try {
        console.log("Fetching new authentication token...");
        
        const response = await axios.post(AUTH_URL, {
            companyName: "IIIT Bhagalpur",
            clientID: "045648ca-0f26-4ef5-b75d-d595d980ce70",
            clientSecret: "vtcMfwXWKeStPHHr",
            ownerName: "Utkash Goyal",
            ownerEmail: "utkarsh.2201076ec@iiitbh.ac.in",
            rollNo: "2201076ec"
        });

        accessToken = response.data.access_token;
        console.log("New Access Token Acquired:", accessToken);
    } catch (error) {
        console.error("❌ Error fetching authentication token:", error.response?.data || error.message);
    }
}

// Middleware to Attach Token
async function authMiddleware(req, res, next) {
    if (!accessToken) {
        await getNewToken();
    }
    req.token = accessToken;
    next();
}

module.exports = { getNewToken, authMiddleware };
