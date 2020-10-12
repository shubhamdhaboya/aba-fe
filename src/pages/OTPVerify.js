import React from "react";
import TopView from "../components/TopView";
import LogoBox from "../components/LogoBox";
import OTPVerifyForm from "../components/OTPVerifyForm";
import { ToastProvider } from "react-toast-notifications";

function OTPVerify(props) {
	return(
		<div>
			<TopView />
			<LogoBox />
			<ToastProvider>
				<OTPVerifyForm mobile={props.match.params.phone} />
			</ToastProvider>
		</div>
	);
}

export default OTPVerify;
