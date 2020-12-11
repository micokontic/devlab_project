const sliderContainer=document.querySelector('.slider');


sliderContainer.addEventListener('click',sliderClickHandler);

document.querySelectorAll('.sliderCard').forEach(item => {
    item.addEventListener('click', sliderClickHandler)
})



function sliderClickHandler(e){
    let id=(e.target.getAttribute('data-value'));
    console.log(id);
    getElementById(id);
}

function getElementById(id){
    console.log(id);
    fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=true`, requestOptions)
    .then(response => response.json())
    .then(json => {
      console.log(json);
      toggleModal(json);
    })
    .catch(error => console.log('error', error));
}
