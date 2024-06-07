export interface Test {
    "id": number,
    "dt_stamp": string,
    "a": number,
    "b": number,
    "c": number,
    "X1": number,
    "X2": number,
    "X1r": number,
    "X2r": number,
    "res": "true" | "false",
}

export interface TestResult {
    X1: number
    X1r: number
    X2: number
    X2r: number
    a: number
    b: number
    c: number
    res: string
}

export interface SolveResult {
    "roots": [
        number,
        number
    ]
}