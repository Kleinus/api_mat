import './App.css';
import React, { useState, useEffect } from "react";

function App() {

  // Meals är i detta fall är en array och den änvädns för att spåra 7 måltider som kommer ifrån Meal DBs API
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      var updatedMeals = meals.slice();

      // här tas 10 slumpmässiga recept 
      var foundRecepies = 0;
      while(foundRecepies < 10) {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/random.php"
        );
        const data = await response.json();
        console.log(data.meals[0].strCategory);
       
        updatedMeals[foundRecepies] = data.meals[0];
        foundRecepies++; 
        //lägger till antal hittade recept 
      }


      setMeals(updatedMeals);
    }

    fetchData();
  }, []);

  return (
    <div class="lunchsalsMeny">

      <h1>Mat rätter</h1>

      {meals.map((meal, index) => (
        <div class="lunchsalsMaten">
          <h2>{meal.weekDay}</h2>
          <h3>{meal.strMeal}.</h3>
          <p> typ av mat: {meal.strCategory}</p>
          <img
            src={meal.strMealThumb}
            alt={meal.weekDay}
            width="400"
            height="400"
          />
          <p>
            Recept :{" "}
            <a href={meal.strSource} target="_blank">
              {meal.strMeal}
            </a>
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;