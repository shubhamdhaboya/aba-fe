import React, { useState, useEffect } from "react";
import TopView from "../components/TopView";
import LogoBox from "../components/LogoBox";
import { Button } from "react-bootstrap";
import { Building, Person } from "react-bootstrap-icons";
import instance from "../axios";
import { Redirect } from "react-router-dom";

function UserType(props) {
	const [btnDisabled, setBtnDisabled] = useState(false);
	const [registrationType, setRegistrationType] = useState(undefined);
	const [goToAuthPage, setGoToAuthPage] = useState(false);

	useEffect(() => {
		if (registrationType === undefined) {
			return;
		}
		setBtnDisabled(true);

		instance
			.post("/register", { mobile: props.match.params.phone, registrationType })
			.then(res => {

			})
			.catch(err => {});

	}, [registrationType]);

	if (goToAuthPage) {
		return <Redirect to={'/auth'}  />
	}

	return(
		<div>
			<TopView />
			<LogoBox />
			<h3 className="text-center">
				Select registration type
			</h3>
			<div className="mb-3">
				<Button
					disabled={btnDisabled}
					variant="primary-gradient"
					className="d-block m-0 mr-auto ml-auto"
					onClick={() => setRegistrationType("service-provider")}
				>
					<Building />
					<span> Register as Service Provider</span>
				</Button>
			</div>
			<div className="separator">OR</div>
			<div className="mt-3">
				<Button
					disabled={btnDisabled}
					variant="primary-gradient"
					className="d-block m-0 mr-auto ml-auto"
					onClick={() => setRegistrationType("customer")}
				>
					<Person />
					<span> Register as Customer</span>
				</Button>
			</div>
		</div>
	);
}

export default UserType;
