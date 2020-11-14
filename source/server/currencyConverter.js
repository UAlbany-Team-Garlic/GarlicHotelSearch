import CC from 'currency-converter-lt';


class currencyConverter{

    /*Takes twos strings as variables. setPrice should be passed from Scrape and is the price in USD.misty
        currencyTo should be a string set from the display. It will be 3 char code for the currency to be converted to.
    */
    constructor(setPrice, currencyTo) {
        this.setPrice = setPrice;
        this.currencyTo = currencyTo;
        currencyConverter = new CC();
    }
    
    //Removes dollar sign from set price
    setPrice = price.slice(1, price.length);

    //Converts the setPrice from USD to desired currency. Set to show in console log for now.
    convertCurr(){
        currencyConverter.from("USD").to(this.currencyTo).amount(this.setPrice).convert().then((response) => {
            console.log(response);
        })
    }

}

