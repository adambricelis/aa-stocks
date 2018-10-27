class SimpleQuote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            quoteData: [],
            textClass: null
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
        const { error, isLoaded, quoteData, textClass } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="simple-quote">
                <div class="card text-center">
                    <div class="card-body">
                        <h5 class="card-title">{quoteData.symbol} {quoteData.companyName}</h5>
                        <div class="card-text">
                            <div class="row">
                                <div class="col-6">
                                    {quoteData.latestPrice}
                                </div>
                                <div class="col-6">
                                    {quoteData.changePercent}%
                                </div>
                            </div>
                        </div>
                        <a href="#" class="btn btn-outline-success mt-3">View Full Quote</a>
                    </div>
                </div>
            </div>
            );
        }
    }
}

// Grabs the root element at which the React elements defined here will be rendered
const rootElement = document.getElementById("root");

// Renders the chosen components at the root element in the HTML
ReactDOM.render(<SimpleQuote symbol="tsla" />, rootElement);