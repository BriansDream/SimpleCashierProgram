import {foods} from './food.js'

class DataSource {
    // constructor(onSucces,onFailed) {
    //     this.onSucces = onSucces;
    //     this.onFailed = onFailed;
    // }

   static searchFoods = (keyword) => {
    return new Promise((resolve,reject) => {        
        const filterFoods = foods.filter((food) => {
            return food.name.toLowerCase().includes(keyword.toLowerCase());
        });

        if(filterFoods.length) {
            resolve(filterFoods);
        } else {
            reject(`${keyword} not found!!`);
        }

    })
}

    static discount = (FoodOrder) => {
            if(FoodOrder >= 3) {
                return 5000;
            } else {
                return 0;
            }
        
    }

    static PurchaseDate = () => {
        const Today = new Date();
        return Today.toUTCString();
    }
}


// CustomError
class EmptyInput extends Error {
    constructor(message) {
        super(message);
    }
}
export {DataSource,EmptyInput};