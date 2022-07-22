const socket = io();

/// form //
const agregar = document.getElementById("agregar");
const producto = document.getElementById("nombre")
const precio = document.getElementById("precio")
const thumbnail = document.getElementById("foto")
const mensajeProd = document.getElementById("no hay datos");


/// chat ///

const btnChat = document.getElementById("boton_chat");
const author= document.getElementById('username');
const text = document.getElementById('texto');
const mensajechat = document.getElementById('no_mensaje')


agregar.addEventListener('click', (e) =>{
    e.preventDefault();
    


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

    lastPord = productos.length - 1;
    console.log(productos.producto)
    

    let refresh_table = `                                                
                                   
                        <tr>
                            <td align="center">${productos[lastPord].producto}</td>
                            <td align="center">${productos[lastPord].precio}</td>
                            <td align="center">
                            <img src="${productos[lastPord].foto}" size="5" alt="5">
                        </td>
                                `;

    const tr = document.createElement('tr');
    tr.innerHTML = refresh_table;
    tabla.appendChild(tr);

    

})


socket.on('message-refresh', (chat)=>{

    console.log(chat)

    lastchat = chat.length - 1;
     

    let refresh_chat = `<div>${chat[lastchat].author} : ${chat[lastchat].text}</div> `;

    const div = document.createElement('div');
    div.innerHTML = refresh_chat;
    chatTable.appendChild(div);

    

})