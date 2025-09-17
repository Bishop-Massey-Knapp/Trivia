import { useState } from "react";
import Home from "./Home";
import QuestionForm from "./QuestionForm";
import Results from "./Results";
import bgWelcome from "./assets/trivia-neon-sign-welcome.png";
import bgQuiz from "./assets/trivia-neon-sign.png";
import bgAlert from "./assets/trivia-neon-alert.png";

function App() {
  const [formData, setFormData] = useState(null);
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [rateLimitError, setRateLimitError] = useState(false);

  const resetQuiz = () => {
    setFormData(null);
    setQuestion(null);
    setUserAnswer("");
    setResult(null);
    setRateLimitError(false);
  };

  let bgImage = bgWelcome;
  if (formData && !result && !rateLimitError) bgImage = bgQuiz;
  if (result && !rateLimitError) bgImage = bgQuiz;
  if (rateLimitError) bgImage = bgAlert;

  return (
    <div
      className="main-bg-container"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
        backgroundSize: "contain",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      {rateLimitError ? (
        <div className="results-content">
          <h2 style={{ color: 'red', marginTop: '2rem' }}>⚠️ Too Many Requests</h2>
          <p style={{ color: 'white', fontWeight: 'bold' }}>
            You have made too many requests to the trivia API.<br />
            Please wait a moment and try again.
          </p>
          <button onClick={resetQuiz}>Back to Start</button>
        </div>
      ) : !formData ? (
        <div className="home-content-bottom">
          <Home setFormData={setFormData} />
        </div>
      ) : formData && !result ? (
        <div className="quiz-content">
          <QuestionForm
            formData={formData}
            setQuestion={setQuestion}
            question={question}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
            setResult={setResult}
            setRateLimitError={setRateLimitError}
          />
        </div>
      ) : (
        <div className="results-content">
          <Results
            name={formData.name}
            result={result}
            question={question}
            userAnswer={userAnswer}
            resetQuiz={resetQuiz}
          />
        </div>
      )}
    </div>
  );
}

export default App;
