console.log("App.js in client side is loading ...")
const inputField = document.querySelector('.addressInput')
const button = document.querySelector('.addressButton')
const locate = document.querySelector('.locate')
const descript = document.querySelector('.description')
const error = document.querySelector('.error')

// hello what

const getAddressData =  async (address) => {
    const response = await fetch(`/weather?address=${address}`)
    const data =  await response.json()
    // console.log(data);
    if(data.data){
        error.innerHTML = ""
        locate.innerHTML = data.data.location
        descript.innerHTML = data.data.description
    }else{
        locate.innerHTML = ""
        descript.innerHTML = ""
        error.innerHTML = data.error
    }

}


button.addEventListener('click', () => {

    getAddressData(inputField.value)

})
