let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total =document.getElementById('total') ;
let count = document.getElementById('count');
let category = document.getElementById('category');
let createbtn = document.getElementById('create');
let  tmp  ;
let mode ='create' ;


// total func
function calcTotal(){
    let totalPrice ;
    if(price.value != ''){
        if(discount.value !=''){
            totalPrice = (+(price.value) + +(taxes.value) + +(ads.value))- +(discount.value) ;
        }
        else {
            totalPrice = +(price.value) + +(taxes.value) + +(ads.value)
        }
        total.style.background='#040' ;
    }   
    else{
        totalPrice= '';
        total.style.background='#e61f3ab4' ;
    }
    total.innerText=totalPrice;
}
// create product 
let products ;
if(localStorage.product !=null){
    products = JSON.parse(localStorage.product) ;
}
else{
    products = [] ;
}

function createProduct (){
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerText,
        count:count.value,
        category:category.value.toLowerCase()
    }
    
    if(title.value!='' && price.value!='' && category.value!='' && count.value<=100){
        if(mode==='create'){
            if(newpro.count>1) {
                for(let a=0; a<newpro.count; a++){
                    products.push(newpro) ;
                }
            }
            else{
                products.push(newpro) ;
            }
        }
        else{
            products[tmp] = newpro ;
            mode='create';
            createbtn.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clearData () ;
    }
    else{
        Swal.fire({
            title: 'Error...',
            text: 'Please Enter the all data of product !! and the count must be <= 100 ',
            icon: 'error',
            width: '400px',
            padding: '2em',
            color: '#white',
            background: '#000',
            confirmButtonText: 'ok',
            customClass: {
                popup: 'my-popup',
                title: 'my-title',
                confirmButton: 'my-button'
              }
          })          
    }
    
    localStorage.setItem('product' , JSON.stringify(products)) ;
    read() ;
    
}

//clear data from inputs
function clearData (){
    title.value = '' ;
    price.value = '' ;
    taxes.value = '' ;
    ads.value = '' ;
    discount.value = '' ;
    total.innerHTML = '' ;
    total.style.background = '#e61f3ab4';
    count.value = '' ;
    category.value = '' ;
}

// read data 
function read(){
    let tbody =document.querySelector('tbody') ;
    let k=1;
    tbody.innerHTML = "";
    for(let i=0; i<products.length; i++){
        tbody.innerHTML+=`
            <tr>  
              <td>${k++}</td>
              <td>${products[i].title}</td>
              <td>${products[i].price}</td>
              <td>${products[i].taxes}</td>
              <td>${products[i].ads}</td>
              <td>${products[i].discount}</td>
              <td>${products[i].total}</td>
              <td>${products[i].category}</td>
              <td><button onclick="update(${i})">update</button></td>
              <td><button onclick="del(${i})">delete</button></td>
            </tr>
        `;
    }
    
    let DA =document.querySelector('.deleteAll') ;
    if(products.length>1){
        DA.innerHTML=`
        <button onclick="DeleteAll()">Delete ALL ( ${products.length} )</button>
        `;
    }
    else{
        DA.innerHTML= '';
    }
}

read() ;
//delete product 

function del(i){
    products.splice(i , 1) ;
    localStorage.setItem('product', JSON.stringify(products));
    read();
}

//delete all

function DeleteAll(){
    products =[] ;
    localStorage.setItem('product', JSON.stringify(products));
    read();
}

//update data of product 

function update(i){
    title.value =products[i].title ;
    price.value = products[i].price;
    taxes.value = products[i].taxes;
    ads.value = products[i].ads;
    calcTotal() ;
    discount.value = products[i].discount;
    category.value = products[i].category;
    count.style.display='none';
    createbtn.innerText='Update product data';
    mode='update' ;
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}

// search function 
let searchbox=document.getElementById('search') ;
let searchMode;
function changeSearchbox(id){
    if(id==='searchTitle'){
        searchMode='title';
    }
    else{
        searchMode='category'
    }
    searchbox.focus() ;
    searchbox.placeholder=" Search By " + searchMode;
}


function search(value){
    value = value.toLowerCase();
    let tbody =document.querySelector('tbody') ;
    let k=1;
    let results=0;
    tbody.innerHTML = "";
    for(let i=0; i<products.length; i++){
        if(searchMode=='title'){
            if(products[i].title.includes(value)){
                tbody.innerHTML+=`
                <tr>  
                  <td>${k++}</td>
                  <td>${products[i].title}</td>
                  <td>${products[i].price}</td>
                  <td>${products[i].taxes}</td>
                  <td>${products[i].ads}</td>
                  <td>${products[i].discount}</td>
                  <td>${products[i].total}</td>
                  <td>${products[i].category}</td>
                  <td><button onclick="update(${i})">update</button></td>
                  <td><button onclick="del(${i})">delete</button></td>
                </tr>
                `;
                results++;
            }
        }
        else{
            if(products[i].category.includes(value)){
                tbody.innerHTML+=`
                <tr>  
                  <td>${k++}</td>
                  <td>${products[i].title}</td>
                  <td>${products[i].price}</td>
                  <td>${products[i].taxes}</td>
                  <td>${products[i].ads}</td>
                  <td>${products[i].discount}</td>
                  <td>${products[i].total}</td>
                  <td>${products[i].category}</td>
                  <td><button onclick="update(${i})">update</button></td>
                  <td><button onclick="del(${i})">delete</button></td>
                </tr>
                `;
                results++;
            }
        }
    }
    if(results === 0){
        tbody.innerHTML = `<tr><td colspan="10">Not Found</td></tr>`;
    }

}

