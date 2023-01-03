// your code here:
class DataSource {
    // Initialise with data endpoint
    constructor() {
        this.url = "https://static.ngnrs.io/test/prices";
    }

    /**
     * Provides a Promise which provides fulfilment handler with an array of prices retrieved from the 
     * data endpoint.
     * Each element in the array is an object with the following:
     * mid: Function with no arguments that returns the mid-point value between price.buy and price.sell
     * quote: Function with no arguments that returns the quote currency of the trade pair
     * @returns {Array} The array of objects with the mid and quote functions. 
     */
    async getPrices() {
        try {
            let arr = [];
            const response = await fetch(this.url);
            const { data } = await response.json();
            data.prices.forEach((price) => {
                arr.push({
                    mid: function () {
                        return (price.buy + price.sell) / 2;
                    },
                    quote: function () {
                        return price.pair.slice(-3);
                    },
                });
            });
            return arr;
        } catch (error) {
            console.log(error);
        }
    }
}

// Test
const ds = new DataSource();

ds.getPrices()
    .then((prices) => {
        prices.forEach((price) => {
            console.log(
                `Mid price for ${
                    price.pair
                } is ${price.mid()} ${price.quote()}.`
            );
        });
    })
    .catch((error) => {
        console.error(error);
    });
