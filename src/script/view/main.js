import { DataSource,EmptyInput } from "../data/data-source.js";
import {foods} from '../data/food.js'
import { putData,renderHistory,onRemoveButtonClicked } from "../model/storage.js";

const main = () => {

    const FoodOrder = {
        Foodname: [],
        AmountOfFood: null,
        Discount: 0,
        Foodprice: null,
        purchaseDate: null,
    }

    const searchInput = document.querySelector('.search-input');
    const btnSearch = document.querySelector('.btn-search');
    const listFoods = document.getElementById('food-list');
    const btnBuy = document.querySelector('.btn-buy');
    const btnRemove = document.querySelector('.btnRemoveData');


    // Function when user click searchForm
    async function onFormButtonClicked()  {
        // Callback function class DataSource
        // const dataSource = new DataSource();
        // Didalam method then berisi function handle callback
       try {
        await DataSource.searchFoods(searchInput.value)
       .then(renderResult)

       } catch(message) {
        fallbackResult(message);
       }
    };

    // Process showing result (filterfoods from data-source)
    const renderResult = (result) => {
        listFoods.innerHTML = "";

        result.forEach((foods) => {
           const {name,price,picture} = foods;

           const foodContainer = document.createElement('div');
           foodContainer.setAttribute('class','food');

           foodContainer.innerHTML = `<img class=listoffood src=${picture} alt=foodhome \n
           <div class=food-info> \n
           <h2> ${name.toLowerCase()} </h2> \n
           <p> ${price} </p> </div>`;

           listFoods.appendChild(foodContainer);
        });
    };

    const fallbackResult = (message) => {
        listFoods.innerHTML = "";
        listFoods.innerHTML = `<h2 class="placeholder"> ${message} </h2>`;
    };


    const onBuyButtonClicked = () => {
        const listAllMenu = document.getElementsByName('foods');
        let checkedFoods = [];
  
       for(let index=0; index <= listAllMenu.length-1; index++) {
      
            if(listAllMenu[index].checked) {
                checkedFoods.push([listAllMenu[index].value]);
            } 
    }

try {
    if(checkedFoods == '' || checkedFoods == null) {
        throw new EmptyInput('Input form cannot be empty');
    }
        let tempFoods = [];
        let tempPrice = 0;
        checkedFoods.forEach((foodsChecked) => {
             for(let index=0; index <= foods.length-1; index++) {
                 if(foodsChecked == foods[index].name) {
                     tempFoods.push(foods[index].name);
                     tempPrice += parseInt(foods[index].price);
                 }
             }
        })
 
        FoodOrder.Foodname.push(...tempFoods);
        FoodOrder.AmountOfFood = FoodOrder.Foodname.length;
        FoodOrder.Discount = DataSource.discount(FoodOrder.Foodname.length); 
        FoodOrder.Foodprice = parseInt(tempPrice - FoodOrder.Discount);
        FoodOrder.purchaseDate = DataSource.PurchaseDate();
       
        putData(FoodOrder);
        renderHistory();
        location.reload();

       

    } catch (error) {
        if(error instanceof EmptyInput) {
            alert(error.message);
        }
    }
      
};



    btnSearch.addEventListener('click',onFormButtonClicked);
    btnBuy.addEventListener('click',onBuyButtonClicked);
    btnRemove.addEventListener('click', onRemoveButtonClicked);
};

export {main};