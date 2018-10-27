// Grabs the root element at which the React elements defined here will be rendered
const rootElement = document.getElementById("root"); 

// Defines an element
const element = <h1>Hello, world</h1>;

// Renders the chosen components at the root element in the HTML
ReactDOM.render(element, rootElement);