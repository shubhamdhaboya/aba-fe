import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";

function PrivateRoute({ component: Component, ...rest }) {
	const { user } = useAuth();

	return (
		<Route
			{...rest}
			render={props =>
				user ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: "/auth" }} />
				)
			}
		/>
	);
}

export default PrivateRoute;
