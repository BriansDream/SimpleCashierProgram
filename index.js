// Object untuk menyimpan aksi nilai

const cashier =  {

    displayTotal: "0",
    jumlahPesanan: [],
    displayPesanan: "0"


}

const updateDisplayTotal = (result) => {
    let displayTotal = document.querySelector('.display');
    cashier.displayTotal = result;
    displayTotal.innerHTML = cashier.displayTotal;
   
}

const updateDisplayPesanan = () => {
    let displayPesanan = document.querySelector('.displayPemesanan');
    cashier.displayPesanan = cashier.jumlahPesanan.length;
     displayPesanan.innerHTML = cashier.displayPesanan;
  

}

const inputItem = (target) => {
    cashier.jumlahPesanan.push(target);
}



const buttons = document.querySelectorAll('.product');
for (let button of buttons) {
        button.addEventListener('click', (event) => {

            const eventTarget = event.target;

            // Fungsi khusus
            if(eventTarget.classList.contains('total')){
                totalPembayaran(cashier.jumlahPesanan);
                updateDisplayTotal(totalPembayaran(cashier.jumlahPesanan))
                return;

            }
          
            inputItem(eventTarget.innerText);
            updateDisplayPesanan();

    })
}

const totalPembayaran = (jumlahPesanan) => {
    let result = 0;
    for(let index = 0; index < jumlahPesanan.length; index++) {
        result += parseInt(jumlahPesanan[index]);
        
        }
        return result;
}