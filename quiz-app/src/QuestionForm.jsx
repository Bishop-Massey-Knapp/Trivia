import { useEffect, useState } from "react";

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function QuestionForm({ formData, setQuestion, question, userAnswer, setUserAnswer, setResult, setRateLimitError }) {
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const fetchQuestion = async (retryCount = 0) => {
      try {
        setApiError("");
        setUserAnswer("");
        const url = `https://opentdb.com/api.php?amount=1&category=${formData.category}&difficulty=${formData.difficulty}&type=multiple`;
        const res = await fetch(url);
        if (res.status === 429) {
          if (retryCount < 3) {
            const delay = Math.pow(2, retryCount) * 1000;
            setTimeout(() => fetchQuestion(retryCount + 1), delay);
            return;
          } else {
            if (setRateLimitError) setRateLimitError(true);
            return;
          }
        }
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        if (data.response_code !== 0) {
          const errorMessages = {
            1: "No Results - Could not return results. The API doesn't have enough questions for your query.",
            2: "Invalid Parameter - Contains an invalid parameter.",
            3: "Token Not Found - Session Token does not exist.",
            4: "Token Empty - Session Token has returned all possible questions for the specified query."
          };
          setApiError(`⚠️ ${errorMessages[data.response_code] || 'Unknown API error'}`);
          return;
        }
        if (data.results && data.results.length > 0) {
          const q = data.results[0];
          const allAnswers = shuffleArray([q.correct_answer, ...q.incorrect_answers]);
          setQuestion(q);
          setAnswers(allAnswers);
        } else {
          setApiError("⚠️ No questions found. Try again.");
        }
      } catch (err) {
        setApiError(`⚠️ Error fetching question: ${err.message}`);
      }
    };
    if (formData) {
      fetchQuestion();
    }
  }, [formData, setQuestion, setUserAnswer, setRateLimitError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userAnswer) {
      setError("⚠️ Please select an answer.");
      return;
    }
    setError("");
    setResult(userAnswer === question.correct_answer ? "correct" : "incorrect");
  };

  if (apiError) return <p style={{ color: "red" }}>{apiError}</p>;
  if (!question) return <p>Loading question...</p>;

  return (
    <div>
      <h2>❓ Quiz Question</h2>
      <form onSubmit={handleSubmit}>
        <p dangerouslySetInnerHTML={{ __html: question.question }} />
        {answers.map((ans, idx) => (
          <div key={idx}>
            <input
              type="radio"
              id={`ans-${idx}`}
              name="answer"
              value={ans}
              checked={userAnswer === ans}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
            <label htmlFor={`ans-${idx}`} dangerouslySetInnerHTML={{ __html: ans }} />
          </div>
        ))}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Submit Answer</button>
      </form>
    </div>
  );
}

export default QuestionForm;
