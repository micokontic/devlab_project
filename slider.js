var myHeaders = new Headers();
myHeaders.append("Cookie", "__cfduid=d5e9781557ba0e34de0d80e38cef6d12b1607465675");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://api.spoonacular.com/recipes/random?apiKey=e611f39bf8a443e3ae2bfbfc63beb5ff&number=20", requestOptions)
  .then(response => response.json())
  .then(json => {
    result = json.recipes;
    makeSlider(result);

  })
  .catch(error => console.log('error', error));





function makeSlider (result){
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

      let newFood = document.createElement("div");
      newFood.className = "new-food";
      
      let newFoodImg = document.createElement("img");
      newFoodImg.src = result[i].image;
      newFoodImg.className = "newFoodImage";

      let newFoodName = document.createElement("p");
      newFoodName.innerText = result[i].title;
      newFoodName.className = "newFoodName";
     

      newFood.appendChild(newFoodImg);
      newFood.appendChild(newFoodName);
     

      
      
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

///if(count === 0){
 /// slider.firstChild.style.display = "flex";
///}
}


document.querySelector(".prev").addEventListener("click",function(){moveImg(-1)});
document.querySelector(".next").addEventListener("click",function(){moveImg(1)});

document.querySelector(".sliderContent").addEventListener("mouseover",function(){document.addEventListener('keydown',checkKey)});

setInterval(() => moveImg(-1), 5000);

function checkKey(event){
  let key = event.key;
  if(key === "ArrowRight"){
    moveImg(1);
  }else if (key === "ArrowLeft"){
    moveImg(-1);
  }
}


  }