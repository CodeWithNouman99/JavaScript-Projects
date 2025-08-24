const searchbtn=document.querySelector('.searchbtn')
const searchBox=document.querySelector('.searchBox')
const recipecontainer=document.querySelector('.recipe-container')
const recipedetailscontent=document.querySelector('.recipe-details-content')
const recpieclosebtn=document.querySelector('.recpie-closebtn')
// Function to get recipees
const fetchrecipeeApi=async(query)=>
{
     recipecontainer.innerHTML="<h2>Fetching Recipees</h2>"
     try{
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const response=await data.json()
    recipecontainer.innerHTML=""
    response.meals.forEach(meal=>
    {
        // console.log(response.meals[0])
        // console.log(meal)
        const recipediv=document.createElement('div')
        recipediv.classList.add('recipe')
        recipediv.innerHTML=`
       <img src="${meal.strMealThumb}">
       <h3>${meal.strMeal}</h3>
        <p>${meal.strArea} <span>Dish</span></p>
        <p><span>${meal.strCategory}</span> Category</p>
       
    `
    const button=document.createElement('button')
    button.textContent="View Recipe"
    recipediv.appendChild(button)
    //Adding event listner to button
    button.addEventListener('click',()=>
    {
        openRecipePopup(meal);
    })
        recipecontainer.appendChild(recipediv)
    }
    )
}
catch(error)
{
         recipecontainer.innerHTML="<h2>Error in Fetching Recipees</h2>"

}

}

const fetchingredients = (meal) => {
    let ingredientslists = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`]; 
        const measure = meal[`strMeasure${i}`];         

        if (ingredient && ingredient.trim() !== "") {
            ingredientslists += `<li>${measure} ${ingredient}</li>`;
        } else {
            break;
        }
    }
    return ingredientslists;
}

const openRecipePopup=(meal)=>
{
    recipedetailscontent.innerHTML=
    `
    <h2 class="recpiename">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientslists">${fetchingredients(meal)}</ul>
     <div class="recpieInstructions">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>

    </div>
    `
    recipedetailscontent.parentElement.style.display='block'
}
recpieclosebtn.addEventListener('click',()=>
{
    recipedetailscontent.parentElement.style.display='none'
})
searchbtn.addEventListener('click',(e)=>
{
    e.preventDefault()          // Ye auto submit krne se rok de ga
    const searchInput=searchBox.value.trim()
    if(!searchInput)
    {
        recipecontainer.innerHTML=`<h2>Type the meal in Search Box</h2>`
        return
    }
    fetchrecipeeApi(searchInput)
})