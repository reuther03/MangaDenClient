import "./Login.css";
import {useState} from "react";
import axios, {AxiosError} from 'axios';
import LoginRespones from "./LoginRespones.ts";


export function Login() {
    const url = 'http://localhost:5000/users-module/User/signin';
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginResult, setLoginResult] = useState<LoginRespones | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const response = await axios.post<LoginRespones>(url, { email, password });
            console.log('Login success:', response.data);
            setLoginResult(response.data);
            setErrorMessage(null);
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                console.error('Login error:', err.response?.data || err.message);
                setErrorMessage(err.response?.data.message || 'An error occurred during login.');
            } else {
                console.error('Unexpected error:', err);
                setErrorMessage('An unexpected error occurred.');
            }
            setLoginResult(null);
        }
    }


    return (
        <>
            <div className="main">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <br/>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <br/>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>

                {/* 7. Show results or errors */}
                {loginResult && (
                    <div style={{ marginTop: '16px', color: 'green' }}>
                        <p>Login successful!</p>
                        <p>Email: {loginResult.value.email}</p>
                    </div>
                )}
                {errorMessage && (
                    <div style={{ marginTop: '16px', color: 'red' }}>{errorMessage}</div>
                )}
            </div>
        </>
    );
}
