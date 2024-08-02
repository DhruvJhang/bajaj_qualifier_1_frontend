// src/JsonForm.jsx

import React, { useState } from "react";
import "./JsonForm.css";

const JsonForm = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);
  const [filter, setFilter] = useState(""); // State to manage the selected filter option

  // Handles change in the JSON input field
  const handleChange = (e) => {
    setJsonInput(e.target.value);
    setError(""); // Clear error message when input changes
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Parse JSON to validate format
      const parsedJson = JSON.parse(jsonInput);

      // Send POST request to API
      const res = await fetch(
        "https://bajaj-assignment-qualifier-1.onrender.com/bhfl",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parsedJson),
        }
      );

      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }

      const result = await res.json();
      console.log("API response:", result);
      setResponse(result); // Set the response state
      alert("JSON submitted successfully!");
    } catch (error) {
      console.log(error);
      setError(
        `Invalid JSON format or API error. Please correct it. Error: ${error.message}`
      );
    }
  };

  // Handles change in the dropdown filter
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Get the data based on the selected filter
  const getFilteredData = () => {
    if (!response) return null;
    switch (filter) {
      case "alphabets":
        return response.alphabets && response.alphabets.length > 0
          ? response.alphabets
          : "No alphabets found";
      case "numbers":
        return response.numbers && response.numbers.length > 0
          ? response.numbers
          : "No numbers found";
      case "highestAlphabet":
        return response.highest_alphabet && response.highest_alphabet.length > 0
          ? response.highest_alphabet
          : "No highest alphabet found";
      default:
        return "Select a filter option";
    }
  };

  return (
    <div className="container">
      <form className="json-form" onSubmit={handleSubmit}>
        <h2 className="SubmitHeading">Submit JSON</h2>
        <div className="form-group">
          <textarea
            id="json-input"
            name="json-input"
            value={jsonInput}
            onChange={handleChange}
            placeholder='Enter JSON here (e.g., {"key": "value"})'
            rows="10"
            required
          ></textarea>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Submit</button>
      </form>

      <div className="dropdown-container">
        <h3>Select Filter:</h3>
        <select
          value={filter}
          onChange={handleFilterChange}
          className="filter-dropdown"
        >
          <option value="">Select an option</option>
          <option value="alphabets">Alphabets</option>
          <option value="numbers">Numbers</option>
          <option value="highestAlphabet">Highest Alphabet</option>
        </select>
        <div className="filtered-data">
          <h4>Filtered Data:</h4>
          <pre>{JSON.stringify(getFilteredData(), null, 2)}</pre>
        </div>
      </div>

      {/* Response display section always visible */}
      <div className="response">
        <h3>API Response:</h3>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>
    </div>
  );
};

export default JsonForm;
