import { useEffect, useState } from "react";
// import { quiz } from "../../data/countries.ts";
import ScoreCard from "./ui/ScoreCard.tsx";

function Quiz({ quiz }: any){
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(false)    
    const [completeQuiz, setCompleteQuiz] = useState(false)
    const [disableNextBtn, setDisableNextBtn] = useState(true)
    const [result, setResult] = useState({
        score: 0,
        answered: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    })
    
    let { questions } = quiz

    const { country, choices, correctAnswer } = questions[activeQuestion]    

    const [answerQuestion, setAnswerQuestion] = useState({
        answer: '',
        index: questions.length +1
    })

    const onClickNext = () => {
        
        setAnswerQuestion({
            answer: '',
            index: questions.length +1
        })

        setResult((prev) =>
            selectedAnswer
                ? {
                    ...prev,
                    score: prev.score + 1,
                    answered: prev.answered + 1,
                    correctAnswers: prev.correctAnswers + 1,
                }
                : {
                    ...prev, 
                    answered: prev.answered + 1,
                    wrongAnswers: prev.wrongAnswers + 1
                }
        )

        if(questions[activeQuestion + 1]) {
            setActiveQuestion((prev) => prev + 1)
        }
        else {
            setCompleteQuiz(true)
        }
        
    }

    const onAnswerSelected = (answer: string, index: number) => {
        setDisableNextBtn(false)
        if (answer === correctAnswer) {
            setSelectedAnswer(true)
        } else {
            setSelectedAnswer(false)
        }

        setAnswerQuestion({
            answer,
            index
        })
        
    }
    
    const repeatQuiz = () => {

        const randomIndex = Math.floor(Math.random() * questions.length);
        
        setActiveQuestion(randomIndex)
            
    }
    
    useEffect(() => {
        if (!disableNextBtn) {
            setDisableNextBtn(true);
        }
       
    }, [activeQuestion]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="rounded-xl bg-gradient-to-b from-gray-900 to-gray-800 border-none text-white">
            { !completeQuiz ?
                <>
               
                <div className="flex flex-col space-y-1.5 p-6">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-sm">{`Question ${result.answered}/${questions.length}`}</p>
                        <p className="text-sm">{`Score: ${result.correctAnswers}`}</p>
                    </div>
                </div>
                
                    <div className="flex flex-col space-y-1.5 p-6">

                    <h3 className="font-semibold tracking-tight text-2xl text-center mb-2">What is the capital of this country?</h3>
                    <p className="text-center text-gray-300 text-2xl">{`${country}`}</p>
                    
                    
                    <div className="p-6 pt-0">
                        <div className="grid grid-cols-1 gap-3">
                        {
                            choices.map((answer: any, index: any) => (                                 
                                <button 
                                    onClick={() => onAnswerSelected(answer, index)} 
                                    key={answer} 
                                    className={"inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium h-9 px-4 w-full text-lg py-6 border-solid border-2 "  + ( answer === correctAnswer && answerQuestion.index !== questions.length + 1 ? "border-green-500" : answerQuestion.answer !== correctAnswer  && index === answerQuestion.index ? "border-red-500": '')}>
                                        {answer}
                                </button>
                            ))
                        }
                            <div className="flex mt-4 flex-col space-y-2 sm:flex-row justify-between sm:space-y-0">
                                <button 
                                    onClick={repeatQuiz}
                                    className="w-full sm:w-1/3 inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium disabled:opacity-50 bg-gray-700 text-white shadow hover:bg-gray-600 h-9 px-6"
                                >
                                    Repeat
                                </button>
                                <button 
                                    className="w-full sm:w-1/3 inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium disabled:opacity-50 bg-blue-600 text-white shadow hover:bg-blue-500 h-9 px-6"
                                    onClick={onClickNext} disabled={disableNextBtn}
                                >
                                    {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                                </button>
                            </div>                    
                        </div>
                    </div>
                    </div>
                </> : 
                <ScoreCard questionsAsked={questions.length} totalScore={2} />
                }
            </div>
        </div>        
    )
}

export default Quiz