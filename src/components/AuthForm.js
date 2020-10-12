import React, { useState } from "react";
import "react-phone-input-2/lib/material.css";
import PhoneInput from "react-phone-input-2";
import { Button } from "react-bootstrap";
import { Check } from 'react-bootstrap-icons';
import instance from "../axios";
import { Redirect } from "react-router-dom";

function AuthForm() {
	const [mobile, setMobile] = useState("");
	const [validateMethod, setValidateMethod] = useState("sms");
	const [isValidPhone, setIsValidPhone] = useState(true);
	const [goToOTP, setGoToOTP] = useState(false);
	const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);

	const handleSubmit = () => {
		setIsValidPhone(true);
		setSubmitBtnDisabled(true);
		instance
			.post("/auth", { mobile, validateMethod })
			.then(res => {
				if (res.data.success) {
					setGoToOTP(true);
					return;
				}
			})
			.catch(err => {
				setSubmitBtnDisabled(false);
				if (err.response.data.length) {
					setIsValidPhone(false);
				}
			})
	}

	if (goToOTP) {
		return <Redirect to={'/verify/otp/'+mobile}  />
	}

	return(
		<div className="authForm">
			<div>
				<PhoneInput
					country={'in'}
					value={mobile}
					onChange={(inputNumber) => { inputNumber = "+"+inputNumber; setMobile(inputNumber)}}
					onEnterKeyPress={handleSubmit}
					enableSearch={true}
					isValid={isValidPhone}
					searchNotFound="Country not found"
					inputProps={{
						autoFocus: true
					}}
				/>
			</div>
			<div className="row m-3">
				<div className="col-6 text-center">
					<input
						value="sms"
						id="sms"
						name="validateMethod"
						type="radio"
						className="d-none validateMethod"
						checked={validateMethod === "sms"}
						onChange={(e) => setValidateMethod(e.target.value)}
					/>
					<label htmlFor="sms" className="card-body p-3">
						SMS
						<Check className="radio-check text-success" size={20} />
					</label>
				</div>
				<div className="col-6 text-center">
					<input
						value="phone"
						id="phone"
						name="validateMethod"
						type="radio"
						className="d-none validateMethod"
						onChange={(e) => setValidateMethod(e.target.value)}
						checked={validateMethod === "phone"}
					/>
					<label htmlFor="phone" className="card-body p-3">
						Call
						<Check className="radio-check text-success" size={20} />
					</label>
				</div>
			</div>
			<Button
				variant="primary-gradient"
				className="w-75 ml-auto mr-auto d-block mt-3 btn"
				onClick={handleSubmit}
				disabled={submitBtnDisabled}
			>
				Submit
			</Button>
		</div>
	);
}

export default AuthForm;
