import { useState } from "react";
import { useForm } from "react-hook-form";
import "./Forms.css";
import { ethers } from "ethers";

function Form() {
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");
    const [ethAddress, setEthAddress] = useState("");
    const [sendAmount, setSendAmount] = useState("");
    const [otp, setOtp] = useState(new Array(6).fill(""));

    function handleAddress(e) {
        setEthAddress(e.target.value);
    }

    function handleAmount(e) {
        setSendAmount(e.target.value);
    }

    function handleOtp(element, index) {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    }

    function isValidAddress(address) {
        return ethers.utils.isAddress(address);
    }

    function isOtpFilled(arr) {
        for (const i of arr) {
            if (i === "") {
                return false;
            }
        }
        return true;
    }

    function printResult(data, arr) {
        if (!data || isOtpFilled(arr)) {
            return "";
        }
        const obj = JSON.parse(data);
        let arrayString = "";
        for (const s of arr) {
            arrayString += s;
        }
        return `ETH Address: ${obj.ethAddress}\nAmount: ${obj.sendAmount}, OTP: ${arrayString}`;
    }

    return (
        <form
            autoComplete="off"
            spellCheck="false"
            onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}
        >
            <div className="input-container">
                <label
                    className={
                        ethAddress
                            ? isValidAddress(ethAddress)
                                ? "filled"
                                : "wrongLabel"
                            : ""
                    }
                >
                    ETH Address
                </label>
                <input
                    className={
                        ethAddress
                            ? isValidAddress(ethAddress)
                                ? "filledInput"
                                : "wrongInput"
                            : ""
                    }
                    {...register("ethAddress")}
                    value={ethAddress}
                    onChange={handleAddress}
                    required
                    autoComplete="off"
                />
                <p className="invalidMessage">
                    {ethAddress && !isValidAddress(ethAddress)
                        ? "Address is invalid."
                        : ""}
                </p>
            </div>
            <div className="input-container">
                <label className={sendAmount && "filled"}>Amount to send</label>
                <input
                    required
                    type="number"
                    className={sendAmount !== "" && "filledInput"}
                    {...register("sendAmount")}
                    value={sendAmount}
                    onChange={handleAmount}
                    min="0"
                    max="999999999"
                    step="none"
                />
                <p className="ethCurrency">ETH</p>
            </div>
            <p className="otp-label">OTP Authentication</p>
            <div className="otp-container">
                {otp.map((data, index) => {
                    return (
                        <input
                            autoComplete="off"
                            className="otp-cell"
                            type="text"
                            maxLength="1"
                            key={index}
                            value={data}
                            onChange={(e) => handleOtp(e.target, index)}
                            onFocus={(e) => e.target.select()}
                        />
                    );
                })}
            </div>
            <input
                type="submit"
                disabled={!isValidAddress(ethAddress) || !isOtpFilled(otp)}
            />
            <p id="printResult">{printResult(data, otp)}</p>
        </form>
    );
}

export default Form;
