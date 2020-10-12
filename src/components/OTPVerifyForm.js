import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { Spinner } from "react-bootstrap";
import instance from "../axios";
import { Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useToasts } from 'react-toast-notifications'

function OTPVerifyForm(props) {
	const timeToWait = 50;
	const [otp, setOtp] = useState(undefined);
	const [otpDisabled, setOtpDisabled] = useState(false);
	const [otpHasError, setOtpHasError] = useState(false);
	const [otpMsg, setOtpMsg] = useState("Please enter OTP");
	const [goToAuthPage, setGoToAuthPage] = useState(false);
	const [goToSelectUserType, setGoToSelectUserType] = useState(false);

	const [allowToReset, setAllowToReset] = useState(false);
	const [lastResetOn, setLastResetOn] = useState(parseInt(Date.now() / 1000));
	const [remainingTime, setRemainingTime] = useState(timeToWait);

	const { addToast } = useToasts();

	useEffect(() => {
		instance.post("/verify/phone", { mobile: props.mobile })
		.then(res => {
			setGoToAuthPage(false);
		})
		.catch(err => {
			setGoToAuthPage(true);
		});

		startCountdown(false);
	}, []);

	useEffect(() => {
		setAllowToReset(false);
		setRemainingTime(timeToWait);
    	// start countdown
		var timer = setInterval(function () {
			let now = parseInt(Date.now() / 1000);
			setRemainingTime(timeToWait - (now - lastResetOn))
			if ((now - lastResetOn) >= timeToWait) {
				setAllowToReset(true);
				clearInterval(timer);
			}
		}, 1000);
	}, [lastResetOn]);


	const startCountdown = async (restarted) => {
		setLastResetOn(parseInt(Date.now() / 1000));
	}
	

	const handleChange = (otp) => {
		setOtp(otp);
		setOtpHasError(false);

		if (otp.length === 6) {
			setOtpDisabled(true);
			setOtpMsg(<Spinner animation="border" />);
			// otp verify call
			instance.post("/verify/otp", { mobile: props.mobile, otp })
			.then(res => {
				if (res.data.type === "NewUser") {
					// redirect to select user type
					setGoToSelectUserType(true);
				}
			})
			.catch(err => {
				setOtpHasError(true);
				setOtpDisabled(false);
				setOtpMsg("Please enter OTP");
			});
		}
	}

	const reSendOTP = (mobile, validateMethod) => {
		instance
			.post("/auth", { mobile, validateMethod })
			.then(res => {
				// restart countdown
				startCountdown(true);
				// tost message of success
				addToast("You will receive new OTP via " + validateMethod , { appearance: 'success' })
			})
			.catch(err => {
				// tost message of error
				addToast("Something went wrong please try again !" , { appearance: 'error' })
			})
	}

	if (goToAuthPage) {
		return <Redirect to={'/auth'}  />
	}

	if (goToSelectUserType) {
		return <Redirect to={'/user/type/'+props.mobile}  />
	}

	return(
		<div className="otpForm">
			<h3 className="otpMsg">
				{otpMsg}
			</h3>
			<div className="text-center text-muted mt-1 mb-1">
				{props.mobile}
			</div>
			<OtpInput
				value={otp}
				onChange={(otp) => { handleChange(otp) }}
				numInputs={6}
				separator={<span>-</span>}
				className="otpInput"
				isInputNum={true}
				isDisabled={otpDisabled}
				shouldAutoFocus={true}
				hasErrored={otpHasError}
				errorStyle="otpError"
			/>
			{ remainingTime !== 0 &&
				<section className="d-flex justify-content-center mt-2 text-muted">
					Wait for { remainingTime } seconds resend
				</section>
			}
			<section className="d-flex justify-content-around mt-2">
				<Button disabled={!allowToReset} variant="primary-gradient" onClick={() => reSendOTP(props.mobile, "sms")}>
					Resend using SMS
				</Button>
				<Button disabled={!allowToReset} variant="primary-gradient" onClick={() => reSendOTP(props.mobile, "phone")}>
					Resend using Phone
				</Button>
			</section>
		</div>
	);
}

export default OTPVerifyForm;
