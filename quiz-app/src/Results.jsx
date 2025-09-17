function Results({ name, result, question, userAnswer, resetQuiz }) {
  return (
    <div>
      <h2>☑️ Results</h2>
      {result === "correct" ? (
        <p>🎉 Great job {name}, you answered correctly!</p>
      ) : (
        <p>
          ❌ Sorry {name}, you chose <b>{userAnswer}</b>. <br />
          The correct answer was:{" "}
          <b dangerouslySetInnerHTML={{ __html: question.correct_answer }} />
        </p>
      )}
      <button onClick={resetQuiz}>Try Another Question</button>
    </div>
  );
}

export default Results;
