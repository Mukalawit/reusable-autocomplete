

createAutoComplete({

    root: document.querySelector('.autocomplete'),
    renderOption(meal){
        return `<img src="${meal.strMealThumb}">
        ${meal.strMeal}
        `;
    },
    onOptionSelect(meal){
        onMealSelect(meal);
    },
    inputValue(meal , e){
        return `${meal.strMeal} (${e.target.value})`;
    },
    async searchByArea (area){
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php', {
            params: {
                a: area
            }
        })
        if (response.data.meals === null) {
            return [];
        }
        return response.data.meals;
    
    }
});


const onMealSelect = async (meal) => {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php', {
        params: {
            i: meal.idMeal
        }
    })
    console.log(response.data.meals[0])
    document.querySelector('#summary').innerHTML = optionDisplayTemplate(response.data.meals[0]);
}



const optionDisplayTemplate = (mealDetail) => {
    return `
    <article class="media">
    <figure class="media-left">
    <img src="${mealDetail.strMealThumb}" width=100 height=100>
    </figure>
    <div class="media-content">
    <div class="content">
    <h1>${mealDetail.strMeal}</h1>
    <h4>${mealDetail.strCategory}</h4>
    <p>${mealDetail.strInstructions}</p>
    </div>
    </div>
    </article>
    `;
}