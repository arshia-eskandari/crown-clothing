//***********React Basics***********

// How React works

// We have component that functions that help us display the
// changes in out state

// React has its own virtual DOM (which is a JS object IMP)

// Concepts IMP
// 1. Dont touch the DOM
// 2. Build websites like lego blocks (components)
// 3. Unidirectional data flow
// 4. UI, the rest is up to you

// Commands IMP
// npm install == yarn
// npm install package --save == yarn add package
// npm install package --save-dev == yarn add package --dev
// npm uninstall package --save == yarn remove package
// npm update --save == yarn upgrade
// npm install package -g == yarn global add package

// IMP IMP IMP Classes vs Hooks IMP IMP IMP

// IMP IMP IMP IMP IMP IMP IMP IMP IMP
// Whenever variables change in the state React will rerender the component
// IMP IMP IMP IMP IMP IMP IMP IMP IMP

// setState({obj}) works similarly to Object.assign and is a shallow copy where the
// specified key values found in the old state are changed to specified values
// It seems you can add more keys to the old state!

// setState(updaterFunction, callbackFunction)
// updaterFunction(state, props) must return
// callbackFunction is optional

// Example
class App extends Component {
    constructor() {
        super();

        this.state = {
            name: 'Arshia',
        };
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>Hi {this.state.name}</p>
                    <button
                        onClick={() =>
                            this.setState(
                                () => {
                                    return { name: 'Kratos' };
                                },
                                () => {
                                    console.log(this.state);
                                }
                            )
                        }
                    >
                        Change Name
                    </button>
                </header>
            </div>
        );
    }
}

// componentDidMount() -> runs whenever the page is mounted (loaded)

// IMP IMP IMP IMP IMP IMP IMP IMP IMP
// Use arrow functions to define methods in order to avoid using bind.this
// This happens since arrow functions bind the this keyword to the value of
// this in the lexical content in which they are defined
// This simply mean in classes the arrow functions point to the class itself
// IMP IMP IMP IMP IMP IMP IMP IMP IMP

// IMP make sure you return one parental component in react

// no matter where we import the css file, it will be applicable to every single page

// in functional components we rerender when the useState changes its value

// Unmounting is when you are removing stuff from the DOM

// add css properties in react using the style attribute
// e.g.
<div
    className="background-image"
    style={{ backgroundImage: `url(${imageUrl})` }}
/>;

// IMP IMP IMP IMP IMP IMP IMP IMP IMP
// You need a Parental element in order to use <Outlet />
// <Outlet /> allows us to dynamically change portions
// of our code based on the routes and nested routes
// IMP IMP IMP IMP IMP IMP IMP IMP IMP

// IMP use the Link tag from react to navigate through the webpages
// e.g.
<Link className="nav-link" to="/shop"></Link>;

// IMP turn the keys into quationless text
setFormFields({ ...formFields, [nameOfField]: value });

// IMP IMP IMP IMP IMP IMP
// what useContext does is to tell any component to render once a
// value in the useContext changes

// the components that are listening to a useContext rerender when
// the value in the useContext changes even if they do not use the
// the value.

// reducers have types and payloads which are our actions
// IMP reducers eliminate the use of state in conjuction with createContext
// reducers work well when the value of a couple of variables depend on another

// selectors update whenever the state object changes
