import React from "react";
import "./Header.css";
import { FaEthereum } from "react-icons/fa";

function Header() {
    return (
        <div className="headerContainer">
            <h1 className="headerText">
                <FaEthereum size="30" color="#d1b464" />
                {" ETH Transaction"}
            </h1>
            <p className="headerDesc">
                Send ETH Tokens to a recipient address.
            </p>
            <p className="headerDesc">
                Verify your transaction with the OTP sent to your account.
            </p>
        </div>
    );
}

export default Header;
