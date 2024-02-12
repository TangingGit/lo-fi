export interface CommonResponse<T> {
    status: ResponseStatus
    data: T | null
}
export interface ResponseStatus {
    code: string
}

