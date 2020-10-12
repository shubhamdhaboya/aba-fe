import React from "react";
import { Image } from "react-bootstrap";
import Logo from "../assets/logo.png";

function LogoBox() {
	return(
		<div className="logoBox">
			<Image src={Logo} />
		</div>
	);
}

export default LogoBox;
