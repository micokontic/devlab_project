var myHeaders = new Headers();
myHeaders.append("Cookie", "__cfduid=d5e9781557ba0e34de0d80e38cef6d12b1607465675");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY130}&number=10`, requestOptions)
  .then(response => response.json())
  .then(json => {
    result = json.recipes;
    makeSlider(result);

  })
  .catch(error => console.log('error', error));





function makeSlider (result){
  console.log(result);
  let slider = document.querySelector(".sliderContent");
  let count = 0;
  let foodCurr;
  let foodPrev;
  let prev = 1;
  let curr = 1;
  let numImg = 3;
  let classImg;
  let classImgPrev;
  let key;
  let isOnDiv;

  function moveImg(val){
    count++;
    if (val === 1){
      if(curr!==numImg){
        prev = curr;
        curr=curr+1;
      }else{
        prev = numImg;
        curr = 1;
      }
      } else if (val === -1) {
        if (curr !==1){
          prev = curr;
          curr = curr - 1;
        }else{
          prev = 1;
          curr = numImg;
        }
      }

      showImages(curr, prev);
    }
  

  function showImages(curr=0, prev=0){

    slider.innerHTML = "";
    let helpList2 = [];
    for (let i=1;i<10;i++){

      cuisine=result[i];
      let newFood = document.createElement("div");
      newFood.className = "new-food";

    const div = document.createElement('div');
    div.dataset.value=("data-value", `${cuisine.id}`)
    div.innerHTML=`<img data-value="${cuisine.id}" src='${cuisine.image}' class='slider-card-img' alt='Ingridient Image id-${cuisine.id}'>
            <h2 data-value="${cuisine.id}" >${cuisine.title}</h2>
            <div class='icons-container' data-value='${cuisine.id}'>
            <div class='icons' data-value='${cuisine.id}'>
                <div class="health-rating" data-value='${cuisine.id}'>
                    <img src='../Img/health-rating.svg' data-value='${cuisine.id}' <span data-value='${cuisine.id}' >${cuisine.healthScore}</span>
                </div>
                <div class="health-rating dollar-container" data-value='${cuisine.id}'>
                    <img src='../Img/icon-dollar.jpg' data-value='${cuisine.id}' <span data-value='${cuisine.id}'>${Math.round(cuisine.pricePerServing)}$</span>
                </div>
                <div  data-value='${cuisine.id}' class="health-rating dollar-container">
                    <img data-value='${cuisine.id}' src='../Img/time.png' <span data-value='${cuisine.id}' >${cuisine.readyInMinutes}min</span>
                </div>
            </div>
            </div>
          `
    /*CHECK IF MEAL IS VEGAN (ADD PSEUDO EL VEGAN IF IT IS) */
    div.classList.add("divTest");
    div.classList.add("sliderCard");

    if(cuisine.vegan){
        div.classList.toggle('greenW');
    }
  
    newFood.appendChild(div);


      if (i%3 !== 0){
        helpList2.push(newFood);
      }
      else{
        helpList2.push(newFood);

        let newFoodGroup = document.createElement("div");
        newFoodGroup.className = "newFoodGroup";
        helpList2.forEach((elem)=>newFoodGroup.appendChild(elem));
        helpList2 = [];

        slider.appendChild(newFoodGroup);
      
               
      }  
      
    }

  if (curr !==0 && prev!==0){
    foodPrev = document.querySelector(".sliderContent").children[prev-1];
    foodPrev.style.display = "none";
    foodCurr = document.querySelector(".sliderContent").children[curr-1];
    foodCurr.style.display = "flex";
  }

if(count === 0){
  slider.firstChild.style.display = "flex";
}
}


document.querySelector(".prev").addEventListener("click",function(){moveImg(-1)});
document.querySelector(".next").addEventListener("click",function(){moveImg(1)});

document.querySelector(".sliderContent").addEventListener("mouseover",function(){document.addEventListener('keydown',checkKey)});

moveImg(-1);

/* setInterval(() => moveImg(-1), 5000); */

function checkKey(event){
  let key = event.key;
  if(key === "ArrowRight"){
    moveImg(1);
  }else if (key === "ArrowLeft"){
    moveImg(-1);
  }
}


  }