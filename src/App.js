import React, { useState } from 'react';
import Auth from "./pages/Auth"
import OTPVerify from "./pages/OTPVerify"
import UserType from "./pages/UserType"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthContext } from "./context/auth";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    var existingUser = localStorage.getItem("user");
    try {
        existingUser = JSON.parse(existingUser);
    } catch(err) {
        existingUser = undefined;
    }

    const setAuth = (user) => {
        try {
            let now = new Date();
            user.time = now.getTime();
            localStorage.setItem("user", JSON.stringify(user));
        } catch(e) {
            localStorage.removeItem("user");
        }
        setUser(user);
    }

    const getToken = () => {
        if (typeof user === "object") {
            return user.token;
        }

        return undefined;
    }

    const removeUser = () => {
        localStorage.removeItem("user");
        setUser(undefined);
    }

    const [user, setUser] = useState(existingUser);

    return (
        <div className="App">
            <AuthContext.Provider value={{user, setUser: setAuth, removeUser, getToken }}>
                <Router>
                    <Switch>
                        <Route path="/auth" component={Auth} />
                        <Route path="/verify/otp/:phone" component={OTPVerify} />
                        <Route path="/verify/otp/:phone" component={OTPVerify} />
                        <PrivateRoute path="/user/type/:phone" component={UserType} />
                        <PrivateRoute path="/:type/profile/:phone" component={UserType} />
                    </Switch>
                </Router>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
