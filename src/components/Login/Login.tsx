import "./Login.css"
import {useState} from "react";
import LoginResponse from "./LoginResponse.ts";
import axios, {AxiosError} from "axios";
import { useNavigate } from 'react-router-dom';


export function Login() {
    const navigate = useNavigate();

    const url = 'http://localhost:5000/users-module/User/signin';
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginResult, setLoginResult] = useState<LoginResponse| null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const response = await axios.post<LoginResponse>(url, { email, password });
            console.log('Login success:', response.data);
            setLoginResult(response.data);
            setErrorMessage(null);
            localStorage.setItem('token', response.data.value.token)
            navigate('/', {replace: true})
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
            <div id={"login"}>
                <form className={"login-form"} onSubmit={handleSubmit}>
                    <div className={"input-group"}>
                        <label>Email</label>
                        <input
                            className={"login-input"}
                            type="email" value={email}
                            onChange={event =>
                                setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div className={"input-group"}>
                        <label>Password</label>
                        <input
                            className={"login-input"}
                            type="password"
                            value={password}
                            onChange={event =>
                                setPassword(event.target.value)}
                            required
                        />
                    </div>
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                    <button type="submit" className="btn-primary">LOGIN</button>
                    <a href="/forgot" className="forgot-link">Nie pamiętasz hasła?</a>
                </form>
            </div>
        </>
    );
}
