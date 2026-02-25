// Import the client library
const {NetworkServiceClient} = require('@google-ads/admanager').v1;

// Your Ad Manager network code
const networkCode = '23210067641';

// Resource name for the network
const name = `networks/${networkCode}`;

// Instantiates a client
const admanagerClient = new NetworkServiceClient();

// Async function to call the API
async function getNetworkDetails() {
  try {
    // Construct the request
    const request = { name };

    // Run the request and wait for the response
    const [response] = await admanagerClient.getNetwork(request);

    // Log the network details
    console.log('Successfully retrieved network information:');
    console.log('Network Display Name:', response.displayName);
    console.log('Network Code:', response.networkCode);
    console.log('Timezone:', response.timezone);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

// Call the function
getNetworkDetails();
