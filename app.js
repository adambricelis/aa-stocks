'use strict';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '', };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value.toUpperCase() });
    }

    handleSubmit(event) {
                
        // Grabs the root element at which the React elements defined here will be rendered
        const rootElement = document.getElementById("root");

        // Renders the chosen components at the root element in the HTML
        ReactDOM.render(<App symbols={[this.state.value]} />, rootElement);

        event.preventDefault();
    }

    render() {
        return (
            <div className="Navbar">
                <nav class="navbar navbar-dark bg-dark">
                    <a class="navbar-brand" href="#">AA Stocks</a>

                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">

                            <li class="nav-item active">
                                <a class="nav-link" href="#">Home</a>
                            </li>

                            <li class="nav-item active">
                                <a class="nav-link" href="#">Watchlist</a>
                            </li>
                        </ul>

                        <form onSubmit={this.handleSubmit} class="form-inline input-group my-2">
                            <input type="search" 
                                    class="form-control remove-right-curves"
                                    value={this.state.value} 
                                    onChange={this.handleChange} 
                                    placeholder="Enter ticker symbol" />
                            <input type="submit"
                                   class="btn btn-primary remove-left-curves"
                                   value="View Quote" />
                        </form>

                    </div>

                </nav>

                <br />
            </div>
        );
    }
}


// Stock quote with current price, percent change, and option to view full quote
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
                                        ${quoteData.latestPrice.toFixed(2)}
                                    </div>
                                    <div class="col-6">
                                        {quoteData.changePercent.toFixed(2)}%
                                    </div>
                                </div>
                            </div>
                            <a href="#" class="btn btn-outline-primary mt-3">View Full Quote</a>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

// Renders and returns a "list" (not a real <ul> or <ol>) of SimpleQuotes
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
            this.state.quotes.push(<SimpleQuote key={i} symbol={this.props.symbols[i]} />);

            // Adds break tag for spacing between SimpleQuotes
            this.state.quotes.push(<br key={i + this.props.symbols.length} />);
        }

        // Returns the rendered quotes inside a div
        return this.state.quotes;
    }
}

// Initializes the navbar and the stocks list
class App extends React.Component {
    constructor(props) {
        // No clue what this does, seesm unnecessary
        super(props);
        this.state = {};
    }

    render() {
        var pagePieces = [
            <Navbar key={1} />,
            // TODO: Make container part of QuoteList
            <div key={2} id="quote_list" class="container"> <QuoteList symbols={this.props.symbols} /> </div>
        ];

        return pagePieces;
    }
}

// Grabs the root element at which the React elements defined here will be rendered
const rootElement = document.getElementById("root");

// Defines the ticker symbols of the stocks to be quoted
var tickerSymbols = ["TSLA", "AMZN", "GOOG", "MSFT"];

// Renders the chosen components at the root element in the HTML
ReactDOM.render(<App symbols={tickerSymbols} />, rootElement);
