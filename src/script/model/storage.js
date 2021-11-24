const CACHE_KEY = 'cache_key';

const checkWebStorage = () => {
    return typeof(Storage) != null;
}

const putData = (data) => {
     let Historydata = null;
     if(checkWebStorage()) {
         if(localStorage.getItem(CACHE_KEY) == null) {
            Historydata = [];
         } else {
             Historydata = JSON.parse(localStorage.getItem(CACHE_KEY));
         }
         Historydata.push(data);
         localStorage.setItem(CACHE_KEY,JSON.stringify(Historydata));

     }
}

const showHistory = () => {
    if(checkWebStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}


const renderHistory = () => {
    let dataHistories = showHistory();

    const tableBody = document.querySelector('.table-body');
    tableBody.innerHTML = "";

    for (let data of dataHistories) {

        const row = document.createElement('tr');
        


        row.innerHTML = `<td> ${data.Foodname} </td>`
        row.innerHTML += `<td> ${data.AmountOfFood} </td>`;
        row.innerHTML += `<td> ${data.Discount} </td>`;
        row.innerHTML += `<td> ${data.Foodprice} </td>`;
       

        tableBody.appendChild(row);
    }
}

const onRemoveButtonClicked = () => {
    if(checkWebStorage()) {
        if(localStorage.getItem(CACHE_KEY) != null) {
            localStorage.removeItem(CACHE_KEY);
            location.reload();
        } else {
            alert('No data');
        }
    }
}


renderHistory();
export {putData,renderHistory,onRemoveButtonClicked};