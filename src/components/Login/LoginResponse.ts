interface LoginResponse {
    value: {
        token: string;
        userId: string;
        email: string;
        username: string;
        role: string;
    }
    isSuccess: boolean;
    status: number;
    message: string;
}

export default LoginResponse;
