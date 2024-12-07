// Get first 10 buyers of a token

const solanaTrackerApiKey = process.env.SOLANA_TRACKER_API_KEY;

if (!solanaTrackerApiKey) {
    console.error('SOLANA_TRACKER_API_KEY is not set');
    process.exit(1);
}

const baseUrl = 'https://data.solanatracker.io';

enum Endpoints {
    FIRST_TOKEN_BUYERS = '/first-buyers', // Get first 100 buyers of a token
}

// Create auth header x-api-key
const authHeader = {
    'x-api-key': solanaTrackerApiKey
}

// Make request to get first 100 buyers
const getFirstTokenBuyers = async (tokenAddress: string) => {
    const response = await fetch(`${baseUrl}${Endpoints.FIRST_TOKEN_BUYERS}/${tokenAddress}`, {
        headers: authHeader
    });
    const data = await response.json();
    return data;
}

// Filter out buyer to only get PNL > 10000
const filterBuyersByPnl = (buyers: any[]) => {
    return buyers.filter((buyer: any) => buyer.total > 10000);
}

// Read token address from stdin
const tokenAddress = process.argv[2];

if (!tokenAddress) {
    console.error('No token address provided');
    process.exit(1);
}

const filteredBuyers = getFirstTokenBuyers(tokenAddress).then(filterBuyersByPnl);

// Clear the console
console.clear();

// Create a nice list layout to display result
console.log(`🌟 Top first buyers of ${tokenAddress} 🌟`);
filteredBuyers.then((buyers: any[]) => {
    buyers.forEach((buyer: any) => {
        const pnl = Math.round(buyer.total);
        const pnlColor = pnl >= 0 ? "\x1b[42m" : "\x1b[41m"; // Green for profit, red for loss
        const reset = "\x1b[0m";

        console.log(
            `💼 Wallet: \x1b[4mhttps://gmgn.ai/sol/address/${buyer.wallet}\x1b[0m - 💰 Total PNL: ${pnlColor}${pnl} USD${reset}`
        );
    });
});