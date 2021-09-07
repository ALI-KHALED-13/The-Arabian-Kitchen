document.body.onload =()=> updateCartButt();

// the + and - code
let adders = document.getElementsByClassName("add");
let reducers = document.getElementsByClassName("minus")
for (add of adders){
    add.onclick =(ev)=> increaseQT(ev.target.parentElement);
}
for (reducer of reducers){
    reducer.onclick =(ev)=> reduceQT(ev.target.parentElement);
}

function increaseQT(parent){
    const qt = parent.querySelector(".qt");
    qt.innerHTML = Number(qt.innerHTML) + 1;
}

function reduceQT(parent){
    const qt = parent.querySelector(".qt");
    if (qt.innerHTML <= 0){ 
        alert('خلاص يالطيب صفرتها');
    } else { 
        qt.innerHTML = Number(qt.innerHTML) - 1;
    }
}

// the category based showing script

document.querySelector(".hall > ul").addEventListener("click", (eve)=> showHide(eve));

function showHide(eve){
    const category = eve.target.id;
    const products = document.getElementsByClassName("product");
    for (product of products){
        if (category == "all"){
            product.style.display = "block";
            continue;
        } else if (product.className.includes(category)){
            product.style.display = "block"
        } else {
            product.style.display = "none"
        }
    }
}


// the shopping cart script
if (!sessionStorage.getItem("products")){
    sessionStorage.setItem("products", JSON.stringify({count: 0}));   
}

// storing on producrr pages
for (button of document.getElementsByTagName("button")){
    button.addEventListener('click', (ev)=> storeIt(ev.target))
}

function storeIt(targetButt){
    const quantityEl = targetButt.parentElement.querySelector(".qt");
    if (quantityEl.innerHTML == 0) return;

    let disc = targetButt.parentElement.firstElementChild.innerHTML;
    let quantity = +quantityEl.innerHTML;
    let price = parseFloat(targetButt.parentElement.querySelector(".price").innerHTML);
    let picture = {
          source: targetButt.parentElement.previousElementSibling.src,
          altText: targetButt.parentElement.previousElementSibling.alt,
        };
   
    let existingPdcts = JSON.parse(sessionStorage.getItem("products"));

    if (disc in existingPdcts){
        existingPdcts[disc]['quantity'] = +existingPdcts[disc]['quantity'] + quantity;
    } else {
        existingPdcts[disc] = {
            quantity,
            price,
            picture,
        }
        existingPdcts["count"] = existingPdcts["count"] + 1;
    }

    sessionStorage.setItem("products", JSON.stringify(existingPdcts));
    updateCartButt()
   
    quantityEl.innerHTML = 0;
}


function updateCartButt(){
    cartCount = document.getElementById("cart").firstElementChild;
    currentCount = JSON.parse(sessionStorage.getItem("products")).count;
    cartCount.innerHTML = currentCount;
}

