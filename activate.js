// const { google } = require("googleapis");
// const path = require("path");

// const KEYFILE_PATH = path.join(__dirname, "corisio-8e73b38bcb5d.json");

// async function activateServiceAccount() {
//     const auth = new google.auth.GoogleAuth({
//         keyFile: KEYFILE_PATH,
//         scopes: ["https://www.googleapis.com/auth/admanager"], // new REST scope
//     });

//     const client = await auth.getClient();

//     // Example REST call to GAM API to list networks
//     const url = "https://admanager.googleapis.com/v1/networks"; // REST endpoint

//     const res = await client.request({ url });

//     console.log("✅ Service account is active!");
//     console.log(res.data);
// }

// activateServiceAccount().catch(console.error);
const { google } = require("googleapis");
const { GoogleAuth } = require("google-auth-library");
const axios = require("axios");

async function main() {
    const auth = new GoogleAuth({
        keyFile: "key.json",
        scopes: ["https://www.googleapis.com/auth/admanager"],
    });

    const client = await auth.getClient();
    const token = await client.getAccessToken();

    const res = await axios.get(
        "https://admanager.googleapis.com/v1/networks",
        { headers: { Authorization: `Bearer ${token.token}` } }
    )

    console.log(res.data);
}

main().catch(console.error);
