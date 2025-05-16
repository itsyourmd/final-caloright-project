/* CALORIE CALCULATOR START */

let gender = '';

const activityMap = {
  1: { label: "Sedentary", multiplier: 1.2 },
  2: { label: "Lightly active", multiplier: 1.375 },
  3: { label: "Moderately active", multiplier: 1.55 },
  4: { label: "Very active", multiplier: 1.725 },
  5: { label: "Extra active", multiplier: 1.9 },
};

function getGender(value) {
  gender = value;

  const activityLevelDropdown = document.getElementById('activityLevelDropdown');

  activityLevelDropdown.addEventListener('change', () => {
    for (let i = 0; i < activityLevelDropdown.options.length; i++) {
      activityLevelDropdown.options[i].style.backgroundColor = '';
      activityLevelDropdown.options[i].style.color = '';
    }

    const selectedOption = activityLevelDropdown.options[activityLevelDropdown.selectedIndex];
    selectedOption.style.backgroundColor = 'orange';
    selectedOption.style.color = '#f8f2e8';
  });

  const femaleBtn = document.getElementById('femaleButton');
  const maleBtn = document.getElementById('maleButton');

  if (gender === 'female') {
    femaleBtn.style.backgroundColor = '#cc6100';
    femaleBtn.style.color = '#f8f2e8';
    femaleBtn.style.borderColor = '#f8f2e8';

    maleBtn.style.borderColor = '#cc6100';  // Corrected color format
    maleBtn.style.color = '#cc6100' ;
    maleBtn.style.backgroundColor = '#f8f2e8';
} else if (gender === 'male') {
    maleBtn.style.backgroundColor = '#cc6100';
    maleBtn.style.color = '#f8f2e8';
    maleBtn.style.borderColor = '#f8f2e8';

    femaleBtn.style.borderColor = '#cc6100';  // Corrected color format
    femaleBtn.style.color ='#cc6100' ;
    femaleBtn.style.backgroundColor = '#f8f2e8';
}

}

function calculateCalories() {

   const resultEl = document.getElementById('resultContainer');

  if (window.innerWidth <= 767) {
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  const age = parseFloat(document.getElementById("age").value);
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const activityLevel = parseInt(document.getElementById("activityLevelDropdown").value);
  const activityMultiplier = activityMap[activityLevel]?.multiplier;

  if (!age || !height || !weight || !gender || !activityMultiplier) {
    alert("Please fill in all fields correctly.");
    return;
  }

  let bmr;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const maintain = bmr * activityMultiplier;
  const mildLoss = maintain - 250;
  const normalLoss = maintain - 500;
  const extremeLoss = maintain - 1000;

  document.getElementById("maintainWeight").textContent = `${Math.round(maintain)} kcal/day`;
  document.getElementById("mildWeightLoss").textContent = `${Math.round(mildLoss)} kcal/day`;
  document.getElementById("normalWeightLoss").textContent = `${Math.round(normalLoss)} kcal/day`;
  document.getElementById("extremeWeightLoss").textContent = `${Math.round(extremeLoss)} kcal/day`;

  // Show result container
  document.getElementById("resultContainer").classList.add("show");
}


/* CALORIE CALCULATOR END */

