interface ScoreCardProps {
    questionsAsked: number;
    totalScore: number;
  }

const ScoreCard = ({ questionsAsked, totalScore}: ScoreCardProps ) => {

  const percentage = (): number => {
    if (questionsAsked <= 0) {
        return 0
    }
    const result = (totalScore / questionsAsked) * 100;
    return Math.ceil(result * 10) / 10
  }  
  
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 border-none text-white rounded-lg p-6 max-w-md w-full">
      <h1 className="text-2xl font-bold mb-4">Score Card</h1>
      <div className="border-t border-gray-200 mt-4 pt-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-400">Questions:</span>
          <span className="font-semibold"> {questionsAsked}</span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-400">Total Score:</span>
          <span className="font-semibold"> {totalScore}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Percentage:</span>
          <span className="font-semibold"> {percentage()}%</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;