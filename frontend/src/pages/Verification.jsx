import React, { useState } from "react";

const Verification = ({ theme }) => {
const [step, setStep] = useState(1);
const [otp, setOtp] = useState("");
const [input, setInput] = useState("");
const [email, setEmail] = useState("");


const sendOTP =async  () => {
 try {
      const res = await fetch("http://127.0.0.1:5000/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      console.log(data);

      alert("OTP sent to email ✅");
      setStep(2);   // move after success

    } catch (err) {
      console.error(err);
      alert("Failed to send OTP ❌");
    }
  };

return (
<div style={{
padding: "20px",
width: "100%",
background: theme === "dark" ? "#0f172a" : "#f8fafc",
minHeight: "100vh",
color: theme === "dark" ? "white" : "black"
}}>

```
  <h1>🔐 Verification Center</h1>

  {/* STEP UI */}
  <div style={{ ...card(theme), marginTop: "20px" }}>

    {step === 1 && (
      <>
        <h3>Enter Email / Phone</h3>

        <input
          placeholder="Enter email or phone"
          value={input}
          onChange={(e)=> setInput(e.target.value)}
          style={inputStyle}
        />

        <button style={btn} onClick={sendOTP}>
  Send OTP
</button>
      </>
    )}

    {step === 2 && (
      <>
        <h3>Enter OTP</h3>

        <input
          placeholder="Enter OTP (1234)"
          value={email}
onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <button
          style={btn}
          onClick={() => {
            if (otp === "1234") setStep(3);
            else alert("Invalid OTP");
          }}
        >
          Verify
        </button>
      </>
    )}

    {step === 3 && (
      <>
        <h2 style={{ color: "#22c55e" }}>✅ Verified Successfully</h2>
      </>
    )}

  </div>

  {/* RISK CHECK */}
  <div style={{ ...card(theme), marginTop: "20px" }}>
    <h3>Risk Validation</h3>
    <p>IP Reputation: Safe</p>
    <p>Device Match: ✔️</p>
    <p>Location Match: ✔️</p>
  </div>

  {/* ACTIONS */}
  <div style={{ ...card(theme), marginTop: "20px" }}>
    <h3>Security Actions</h3>

    <div style={{ display: "flex", gap: "10px" }}>
      <button style={btn}>Block Access</button>
      <button style={btn}>Force Logout</button>
      <button style={btn}>Mark Safe</button>
    </div>
  </div>

</div>


);
};

/* ---------- STYLES ---------- */

const card = (theme) => ({
background: theme === "dark" ? "#1e293b" : "white",
padding: "20px",
borderRadius: "10px",
boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
});

const btn = {
marginTop: "10px",
padding: "10px",
border: "none",
borderRadius: "6px",
background: "#2563eb",
color: "white",
cursor: "pointer"
};

const inputStyle = {
padding: "10px",
width: "100%",
marginTop: "10px",
borderRadius: "6px",
border: "none",
outline: "none"
};

export default Verification;
