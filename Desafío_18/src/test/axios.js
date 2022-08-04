import axios from 'axios'

const data = {
    "producto": "lapiz azul",
    "precio": 7,
    "foto": "https://cdn1.iconfinder.com/data/icons/school-outline-icons/76/School_01-Converted_22-125.png"
}

axios.get('http://localhost:8080/productos/')
    .then(response => {
        console.log("TESTEANDO CON AXIOS GET - /productos/",response.data)
       })
    .catch(e=>{
        console.log(e)
    })

axios.get('http://localhost:8080/productos/9')
    .then(response => {
        console.log("TESTEANDO CON AXIOS GET - /productos/:id", response.data)
        })
    .catch(e=>{
        console.log(e)
    })

axios.post('http://localhost:8080/productos/producto/', data)
    .then(response=>{
        console.log("TESTEANDO CON AXIOS POST - productos/producto:",response.data)
        })
    .catch(e=>{
        console.log(e)
    })

    