export interface ApiResponse<T> {
    value: T;
    isSuccess: boolean;
    statusCode: number;
    message: string;
}
