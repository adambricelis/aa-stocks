'use strict';

// The element that will be rendered
const element = React.createElement;

// Renders and returns a "list" (not a real <ul> or <ol>) of 
class QuoteList extends React.Component {
    constructor(props) {
        // No clue what this does, seesm unnecessary
        super(props);
        this.state = {
            // Holds the HTML elements that will be generated from SimpleQuote
            quotes: []
        };
    }

    render() {
        // Loops through every ticker symbol provided in the parameters
        for (var i = 0; i < this.props.symbols.length; i++) {

            // Note: we add a key prop here to allow react to uniquely identify each
            // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
            this.state.quotes.push(<SimpleQuote key={i} symbol={this.props.symbols[i]}/>);
        }

        // Returns the rendered quotes inside a div
        return this.state.quotes;
    }
}

class SimpleQuote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            quoteData: [],
            textClass: ""
        };
    }

    componentDidMount() {
        fetch("https://api.iextrading.com/1.0/stock/" + this.props.symbol + "/quote?filter=symbol,companyName,latestPrice,changePercent,primaryExchange,sector,open,close,marketCap,week52High,week52Low&displayPercent=true")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        quoteData: result
                    });
                    if (quoteData.changePercent >= 0) {
                        textClass = "card-text up";
                    } else {
                        textClass = "card-text down";
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, quoteData } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            if (quoteData.changePercent >= 0) {
                this.state.textClass = "card-text up";
            } else {
                this.state.textClass = "card-text down";
            }
            return (
                <div className="simple-quote">
                <div class="card text-center">
                    <div class="card-body">
                        <h5 class="card-title">{quoteData.symbol} ({quoteData.companyName})</h5>
                        <div class={this.state.textClass}>
                            <div class="row">
                                <div class="col-6">
                                    {quoteData.latestPrice}
                                </div>
                                </div>
                            </div>
                            <a href="#" class="btn btn-outline-success mt-3">View Full Quote</a>
                        </div>
                        <a href="#" class="btn btn-outline-primary mt-3">View Full Quote</a>
                    </div>
                </div>
            );
        }
    }
}

// Grabs the root element at which the React elements defined here will be rendered
const rootElement = document.getElementById("root");

// Defines the ticker symbols of the stocks to be quoted
var tickerSymbols = ["TSLA", "AMZN", "GOOG", "MSFT"]; 

// Renders the chosen components at the root element in the HTML
ReactDOM.render(<QuoteList symbols={tickerSymbols} />, rootElement);
