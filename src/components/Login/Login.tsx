import "./Login.css"

export function Login() {

    return (
        <>
            <div id={"login"}>
                <form className={"login-form"} action="">
                    <div className={"input-group"}>
                        <label>Email</label>
                        <input className={"login-input"} type="email" required/>
                    </div>
                    <div className={"input-group"}>
                        <label>Password</label>
                        <input className={"login-input"} type="password" required/>
                    </div>
                        <button type="submit" className="btn-primary">
                            LOGIN
                        </button>

                    <a href="/forgot" className="forgot-link">
                        Nie pamiętasz hasła?
                    </a>
                </form>
            </div>
        </>
    );
}
