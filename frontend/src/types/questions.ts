
export interface Question {
    id: number;
    country: string;
    correctAnswer: string;
    choices: string[];
}

export interface Questions {
    questions: Question[]
}
