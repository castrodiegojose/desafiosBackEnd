const socket = io();


/// form //
const tabla = document.getElementById('tabla');
const agregar = document.getElementById("agregar");
const producto = document.getElementById("nombre")
const precio = document.getElementById("precio")
const thumbnail = document.getElementById("foto")
const mensajeProd = document.getElementById("no hay datos");


/// chat ///
const chatTable = document.getElementById("chatTable");
const btnChat = document.getElementById("boton_chat");
const author= document.getElementById('username');
const text = document.getElementById('texto');
const mensajechat = document.getElementById('no_mensaje')


agregar.addEventListener('click', (e) =>{
    e.preventDefault();
    
    console.log("esta aca")
    let mensaje = { 
        producto: producto.value,
        precio: precio.value, 
        foto: thumbnail.value         
    }    
    
    socket.emit('new-product', mensaje);
    producto.value ='';
    precio.value = '';
    thumbnail.value = '';
    if(mensajeProd.value !=''){ mensajeProd.innerHTML = '';}       
})



btnChat.addEventListener('click', (e) =>{
    e.preventDefault();
    
    let chat = {        
        author: author.value,
        text: text.value,
    }

    socket.emit('new-message', chat);
    author.value = '';
    text.value = '';
    if(mensajechat.value !=''){mensajechat.innerHTML = '';}
})


socket.on('product-refresh', (productos)=>{

     let lastPord = productos.length - 1;
    //console.log(lastPord);
    let tablaInfo = tabla.lastElementChild.innerHTML;
    tablaInfo += `                                                
                        <tr>
                            <td>${productos[lastPord].producto}</td>
                            <td>${productos[lastPord].precio}</td>
                            <td>
                            <img src="${productos[lastPord].foto}" size="5" alt="5">
                            </td>
                        </tr>`;
    tabla.lastElementChild.innerHTML = tablaInfo
  })


socket.on('message-refresh', (chat)=>{

    let lastchat = chat.length - 1;
    let chatInfo = chatTable.lastElementChild.innerHTML
    chatInfo += `<div>${chat[lastchat].author} : ${chat[lastchat].text}</div> `;
    chatTable.lastElementChild.innerHTML = chatInfo;
})