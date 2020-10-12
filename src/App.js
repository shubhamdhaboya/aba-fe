import React from 'react';
import Auth from "./pages/Auth"
import OTPVerify from "./pages/OTPVerify"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/auth">
                        <Auth />
                    </Route>
                    <Route path="/verify/otp/:phone" component={OTPVerify} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
