const unitFormulas = {
  feet: 0.3048,
  meter: 1,
  inch: 0.0254,
  pound: 0.453592,
  kilogram: 1,
  centimeter: 0.01,
};

// Create a unit convertor program

/**
 * Converts a given value to a specific unit of measurement.
 *
 * @param {Object} params - An object containing the value and unit to convert.
 * @param {number} params.value - The value to convert.
 * @param {string} params.unit - The unit to convert the value to.
 * @return {number} The converted value.
 */
const unitConvertor = ({ value, unit }) => value * unitFormulas[unit];
// create a BMI calculator function

/**
 * Calculates the BMI (Body Mass Index) given the height and weight.
 *
 * @param {number} height - The height of the person in meters or feet.
 * @param {number} weight - The weight of the person in kilograms or pounds.
 * @return {Object} An object containing the calculated BMI and the corresponding BMI category.
 * @property {string} BMI - The calculated BMI value rounded to one decimal place.
 * @property {string} bmiCategory - The BMI category corresponding to the BMI value.
 */
const calculateBMI = (height, weight) => {
  const bmi = weight / height ** 2;

  return {
    BMI: bmi.toFixed(1),
    bmiCategory: `
      ${bmi < 18.5 ? "Underweight 😟" : ""}
      ${bmi >= 18.5 && bmi <= 25 ? "Normal weight 😌" : ""}
      ${bmi >= 25 && bmi <= 30 ? "Overweight 😔" : ""}
      ${bmi >= 30 && bmi <= 35 ? "Obese 😩" : ""}
      ${bmi >= 35 ? "Extremely Obese 😵" : ""}
    `,
  };
};

// DOM elements

const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const heightUnit = document.getElementById("heightUnit");
const weightUnit = document.getElementById("weightUnit");
const calculateBtn = document.getElementById("calculateBtn");
const result = document.getElementById("result");

// Create result card function

/**
 * Creates a result card element with the given BMI object and appends it to the result element.
 *
 * @param {Object} bmi - An object containing the calculated BMI value and the corresponding BMI category.
 * @property {string} bmi.BMI - The calculated BMI value.
 * @property {string} bmi.bmiCategory - The BMI category corresponding to the BMI value.
 */
const createResultCard = (bmi) => {
  const resultCard = document.createElement("div");

  resultCard.innerHTML = `
    <div class="result-card">
      <h2>BMI Result: ${bmi.BMI}</h2>
      <p id="bmiValue">${bmi.BMI}</p>
      <p id="bmiCategory">${bmi.bmiCategory}</p>
    </div>
  `;

  result.appendChild(resultCard);
};

// Event listeners

/**
 * Adds a click event listener to the calculate button.
 * When clicked, it retrieves the height and weight values from the input fields,
 * converts them to the same unit, calculates the BMI, and displays the result.
 */
calculateBtn.addEventListener("click", () => {
  // Retrieve height and weight values from input fields
  const height = unitConvertor({
    value: heightInput.value,
    unit: heightUnit.value,
  });

  const weight = unitConvertor({
    value: weightInput.value,
    unit: weightUnit.value,
  });

  // Check if height and weight are valid numbers
  if (Number.isNaN(height) || Number.isNaN(weight)) {
    // Display error message and return
    alert("Please enter valid height and weight.");
    return;
  }

  // Calculate BMI
  const bmi = calculateBMI(height, weight);

  // Clear input fields and result
  clearInputsAndResult();

  // Display BMI result
  createResultCard(bmi);

  /**
   * Clears the input fields and result area.
   */
  function clearInputsAndResult() {
    heightInput.value = "";
    weightInput.value = "";
    result.innerHTML = "";
  }
});
