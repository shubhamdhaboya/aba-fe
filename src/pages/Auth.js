import React from "react";
import TopView from "../components/TopView";
import LogoBox from "../components/LogoBox";
import AuthForm from "../components/AuthForm";

function Auth() {
	return(
		<div>
			<TopView />
			<LogoBox />
			<AuthForm />
		</div>
	);
}

export default Auth;
