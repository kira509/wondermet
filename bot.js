// ----- IMPORT DERIV API -----
import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic';

// ----- YOUR API TOKEN -----
const token = "PASTE_YOUR_TOKEN_HERE"; // Replace with your Deriv API token
const api = new DerivAPIBasic({ apiToken: token });

// ----- UTILITY FUNCTIONS -----
function isEven(num) {
    return num % 2 === 0;
}

let lastTick = null; // to track previous tick for Rise/Fall

// ----- MAIN FUNCTION -----
async function run() {
    console.log("Connecting to Deriv...");

    // Get your balance
    const balance = await api.account("balance");
    console.log("Balance:", balance);

    // Subscribe to ticks (VOLATILITY 10 as example)
    const ticks = await api.subscribe({ ticks: "R_10" });

    ticks.onmessage = message => {
        const tick = message.data.tick.quote;

        // --- RISE/FALL LOGIC ---
        if (lastTick !== null) {
            if (tick > lastTick) {
                console.log("Rise ✅", tick);
            } else if (tick < lastTick) {
                console.log("Fall ⬇️", tick);
            } else {
                console.log("No Change", tick);
            }
        }
        lastTick = tick;

        // --- EVEN/ODD LOGIC ---
        const lastDigit = Math.floor(tick) % 10;
        if (isEven(lastDigit)) {
            console.log("Even 🔵", lastDigit);
        } else {
            console.log("Odd 🔴", lastDigit);
        }
    };
}

// Run the bot
run();
