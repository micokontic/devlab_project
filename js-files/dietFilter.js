const inputFieldDiet = document.querySelector('#diet-filter');
const dropdownDiet = document.querySelector('.value-list-diet');
const dropdownArrayDiet = [... document.querySelectorAll('.value-list-diet li')];

console.log(typeof dropdownArrayDiet);
//dropdownDiet.classList.add('open');

let valueArrayDiet = [];
dropdownArrayDiet.forEach(item => {
  valueArrayDiet.push(item.textContent);
});

const closeDropdownDiet = () => {
  dropdownDiet.classList.remove('open');
}

inputFieldDiet.addEventListener('input', () => {
  dropdownDiet.classList.add('open');
  let inputValue = inputFieldDiet.value.toLowerCase();
  if (inputValue.length > 0) {
    for (let j = 0; j < valueArrayDiet.length; j++) {
      if (!(inputValue.substring(0, inputValue.length) === valueArrayDiet[j].substring(0, inputValue.length).toLowerCase())) {
        dropdownArrayDiet[j].classList.add('closed');
      } else {
        dropdownArrayDiet[j].classList.remove('closed');
      }
    }
  } else {
    for (let i = 0; i < dropdownArrayDiet.length; i++) {
      dropdownArrayDiet[i].classList.remove('closed');
    }
  }
});
/*Pitati stevana za problem sa dodavanjem klase!! */
dropdownArrayDiet.forEach(item => {
  item.addEventListener('click', (evt) => {
    inputFieldDiet.value = item.textContent;
    /* console.log(inputFieldDiet.value); */
    dropdownArrayDiet.forEach(dropdown => {
      dropdown.classList.add('closed');
    });
  });
})

inputFieldDiet.addEventListener('focus', () => {
   inputFieldDiet.placeholder = 'Type to filter';
   dropdownDiet.classList.add('open');
   dropdownArrayDiet.forEach(dropdownDiet => {
     dropdownDiet.classList.remove('closed');
   });
});

inputFieldDiet.addEventListener('blur', () => {
   inputFieldDiet.placeholder = 'Choose Cuisine';
  dropdownDiet.classList.remove('open');
});

document.addEventListener('click', (evt) => {
  const isDropdown = dropdownDiet.contains(evt.target);
  const isInput = inputFieldDiet.contains(evt.target);
  if (!isDropdown && !isInput) {
    dropdownDiet.classList.remove('open');
  }
});