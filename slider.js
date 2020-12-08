const LINK_COMPLEX_SEARCH_RECEPIES='https://api.spoonacular.com/recipes/complexSearch?apiKey=a807bbb33f68406b846d84b7ad507d55';
var sliderContent = document.getElementById("sliderContent")
var myHeaders = new Headers();
myHeaders.append("Cookie", "__cfduid=d5e9781557ba0e34de0d80e38cef6d12b1607465675");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://api.spoonacular.com/recipes/random?apiKey=a807bbb33f68406b846d84b7ad507d55", requestOptions)
    .then((res) => res.json())
    .then((data)=>{   
            data.forEach(function (receipt){
                output = `
            <div class="SliderCard">
            <img>${receipt.image}</img>
            <h3>${receipt.name}</h3
            </div>`
                    
            })
            document.getElementById('sliderContent').innerHTML = output;
        })