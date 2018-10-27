class SimpleQuote extends React.Component {
    render() {
        return (
            <div className="simple-quote">
                <div class="card text-center">
                    <div class="card-body">
                        <h5 class="card-title">TSLA (Tesla Inc.)</h5>
                        <div class="card-text up">
                            <div class="row">
                                <div class="col-6">
                                    $250.00
                                </div>
                                <div class="col-6">
                                    10.00%
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

// Grabs the root element at which the React elements defined here will be rendered
const rootElement = document.getElementById("root");

// Renders the chosen components at the root element in the HTML
ReactDOM.render(<SimpleQuote />, rootElement);