// Object untuk tempat menampung data 

const cashier = {
    listOrder: {
        "Nasi Goreng": 20000,
        "Soto Ayam": 15000,
    },
    totalPaymentDisplay : "0",
    totalDailyIncomeDisplay: "0",
    displaySearch: "",
    totalPayment: [],
    dailyIncome: [],
    nameOrder: [],
}

// Manage display order and quantity
const displayOrderQuantityandName = () => {
    const QuantityOrder = document.querySelector('.display-total-order');
    const orderName = document.querySelector('.display-order-name');
    QuantityOrder.innerText = cashier.nameOrder.length;
    orderName.innerHTML = cashier.nameOrder.join('<br>');

}

// Display total payment
const displayTotalPayment = () => {
    const totalPaymentDisplay = document.querySelector('.display-total-payment');
    totalPaymentDisplay.innerText = cashier.totalPaymentDisplay;
}

const displayDailyIncome = () => {
    const dailyIncome = document.querySelector('.display-daily-income');
    dailyIncome.innerText = cashier.totalDailyIncomeDisplay;
}

// Manage selected item 
const inputItem = (item) => {
    cashier.nameOrder.push(item);
}


const clearTransaction = () => {
    cashier.totalPaymentDisplay = "0";
    cashier.totalPayment = [];
    cashier.nameOrder = [];
  

}

// When item selected
const chooseMenu = () => {

    const btnMenu = document.querySelectorAll('.food-name');

    for (let btnMenus of btnMenu) {

        btnMenus.addEventListener('click', (event) => {

            const eventTarget = event.target;

            if(eventTarget.classList.contains('clear')) {
           
            totalDailyIncome(totalPayment());
            displayDailyIncome();
            clearTransaction(); 
            displayTotalPayment();
            displayOrderQuantityandName(); 
            return
            }

            inputItem(eventTarget.innerText);
            totalPayment(eventTarget.innerText);
            displayOrderQuantityandName(); 
            displayTotalPayment();
        })
    }
    
}


const totalPayment = (target) => {

    if(target === "Nasi Goreng")
     {
        cashier.totalPayment.push(cashier.listOrder["Nasi Goreng"]);
    } else if(target === "Soto Ayam") {
        cashier.totalPayment.push(cashier.listOrder["Soto Ayam"]);
    } 

    let result = 0;
    for (let payment of cashier.totalPayment) {
            result += payment; 
    }
    cashier.totalPaymentDisplay = result;
    return result;
   
}


const totalDailyIncome = (result) => {
    
    cashier.dailyIncome.push(result);

    let income = 0;

    for (let dailyIncome of cashier.dailyIncome) {
            income+= dailyIncome;
    }

    cashier.totalDailyIncomeDisplay = income;
    
}


chooseMenu();



const updateDisplaySearch = () => {
    let displaySearch = document.querySelector('.display-search');
    displaySearch.innerHTML = cashier.displaySearch;
}

const searchInput = () => {
    const searchInput = document.querySelector('.search-text').value;
    return searchInput;
}


const btnSearch = () => {
    const searchButton = document.querySelector('#btnSearch');
    
    searchButton.addEventListener('click', (event) => {

        if(cashier.nameOrder.length != 0) {
        for (let orderName of cashier.nameOrder) {  
    
            if(searchInput() === orderName) {
                cashier.displaySearch = orderName;
                updateDisplaySearch();
                cashier.displaySearch = "";
                return true;
            } else {
                alert("Food that you want it doesnt registered");
                return false;
            }
            
        }
    } else {
        alert("Consumen doesnt order anything");
    }
        
    })
}

btnSearch();




