import { useState } from "react";

function Home({ setFormData }) {
  const [inputs, setInputs] = useState({ name: "", category: "", difficulty: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputs.name || !inputs.category || !inputs.difficulty) {
      setError("⚠️ Please fill in all fields.");
      return;
    }
    setError("");
    setFormData(inputs);
  };

  return (
    <div>
      <h1>Ready to Flex Those Brain Cells?</h1>
      <p>Drop your name, choose a category, set your challenge level, and let the neon showdown begin!</p>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="name" value={inputs.name} onChange={handleChange} />
        </label>
        <br />

        <label>
          Category:
          <select name="category" value={inputs.category} onChange={handleChange}>
            <option value="">-- Select --</option>
            <option value="9">General Knowledge</option>
            <option value="18">Science: Computers</option>
            <option value="23">History</option>
            <option value="21">Sports</option>
          </select>
        </label>
        <br />

        <label>
          Difficulty:
          <select name="difficulty" value={inputs.difficulty} onChange={handleChange}>
            <option value="">-- Select --</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <br />

        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Start Quiz</button>
      </form>
    </div>
  );
}

export default Home;
