// src/JsonForm.jsx

import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./JsonForm.css";

const JsonForm = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState();
  const [filteredData, setFilterData] = useState();

  const handleChange = (e) => {
    setJsonInput(e.target.value);
    setError("");
  };

  const optionList = [
    { value: "Alphabets", label: "alphabets" },
    { value: "Numbers", label: "numbers" },
    { value: "Highest Alphabets", label: "highest_alphabet" },
  ];

  function handleSelect(data) {
    setSelectedOptions(data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedJson = JSON.parse(jsonInput);

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
        throw new Error(Network response was not ok: ${res.statusText});
      }

      const result = await res.json();
      console.log("API response:", result);
      setResponse(result); // Set the response state
      alert("JSON submitted successfully!");
    } catch (error) {
      console.log(error);
      setError(
        Invalid JSON format or API error. Please correct it. Error: ${error.message}
      );
    }
  };

  useEffect(() => {
    if (selectedOptions && response) {
      const filters = selectedOptions.map((option) => option.label);
      setFilterData(filters);
      console.log("Val set");
    }
  }, [selectedOptions]);

  return (
    <div className="container">
      <div className="horizontal">
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
        <div className="response">
          <h3>API Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      </div>
      <div className="vertical">
        <div className="dropdown-container">
          <Select
            options={optionList}
            placeholder="Select the Filter"
            value={selectedOptions}
            onChange={handleSelect}
            isSearchable={true}
            isMulti
          />
        </div>
        <div className=" FilteredData">
          {response && selectedOptions && filteredData ? (
            <div className=" DataFiltered">
              {filteredData.map((item, index) => {
                console.log(response.item);
                console.log(item);
                console.log(response);

                return (
                  <span key={index}>
                    {item} : {response[item]}
                  </span>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
        sdfsdf
      </div>
    </div>
  );
};

export default JsonForm;
