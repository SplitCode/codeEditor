export interface Task {
    id: number;
    title: string;
    description: string;
    solutions: {
        [language: string]: Solution;
    };
}

export interface Solution {
    code: string;
    expectedOutput: string;
    successResponse: {
        status: string;
        output: string;
    };
    errorResponse: {
        status: string;
        error: string;
    };
}
