let itemsIn = JSON.parse(sessionStorage.getItem("products"));
if (itemsIn.count > 0){
    document.getElementById("message").style.display = "none";
    showItems()
}
function showItems(){
    for (key in itemsIn){
        if (key == "count") continue;
        const {price, picture, quantity} = itemsIn[key];
        

        const item = document.createElement("DIV");
        item.className = "item"

        const image = document.createElement("img");
        image.src = picture.source;
        image.alt = picture.altText;


        const desc = document.createElement("p")
        desc.className = "desc"
        desc.innerHTML = `${key}<br>
        سعر الوحدة: ${price} ريال  |  الكمية: <span>${quantity}</span>`;

        const total = document.createElement("p");
        total.className = "total";
        total.innerHTML = ` الإجمالي <br> ${price * quantity}`;
        
        const modification = modificationPart()

        item.append(image);
        item.append(desc);
        item.append(total);
        item.append(modification);
        document.getElementById('cashier').append(item);
        
    }
    const final = document.createElement("DIV");
    final.className = 'final';
    final.innerHTML = `<p>المبلغ الإجمالي <span id="totalCost"><span> ريال</p><button>أكد الطلبية</button>`;
    document.getElementById('cashier').append(final);

    CalcTotal();
    document.querySelector(".final > button").addEventListener("click", (ev)=> {
        itemsIn = {count: 0};
        sessionStorage.setItem("products", JSON.stringify(itemsIn));
        ev.target.parentElement.parentElement.innerHTML = "<p>تم استقبال طلبك وهو الآن في طور التجهيز 🍽🎊<p>"
    });
}

function modificationPart(){
    const modification = document.createElement("div");

    const inc = document.createElement("img");
    inc.src = "photos/inc.png"; inc.alt = "زد عليهم";
    inc.title = "زد الكمية";
    inc.addEventListener("click", (ev)=> increase(ev));

    const dec = document.createElement("img");
    dec.src = "photos/dec.png"; dec.alt = "زد عليهم";
    dec.title = "اخصم من الكمية";
    dec.addEventListener("click", (ev)=> decrease(ev))

    const deleteItem = document.createElement("img");
    deleteItem.src = "photos/trash.png"; deleteItem.alt = "حذف";
    deleteItem.title = "احذف الصنف كله";
    deleteItem.addEventListener("click", (ev)=> deleteWhole(ev))

    modification.append(inc);
    modification.append(dec);
    modification.append(deleteItem);

    return modification;
}

function increase(ev){
    let amountEl = ev.target.parentElement.parentElement.querySelector("span");
    amountEl.innerHTML = +amountEl.innerHTML + 1;
    
    let pdctEl = ev.target.parentElement.parentElement.querySelector(".desc");
    let pdct = pdctEl.innerHTML.slice(0, pdctEl.innerHTML.indexOf("<br>"));
    
    itemsIn[pdct]['quantity'] = +itemsIn[pdct]['quantity'] + 1;
    sessionStorage.setItem("products", JSON.stringify(itemsIn));

    let total = ev.target.parentElement.parentElement.querySelector(".total");
    total.innerHTML = ` الإجمالي <br> ${itemsIn[pdct]['price'] * itemsIn[pdct]['quantity']}`;
    CalcTotal()
}

function decrease(ev){
    let amountEl = ev.target.parentElement.parentElement.querySelector("span");
    amountEl.innerHTML = +amountEl.innerHTML - 1;
    
    let pdctEl = ev.target.parentElement.parentElement.querySelector(".desc");
    let pdct = pdctEl.innerHTML.slice(0, pdctEl.innerHTML.indexOf("<br>"));
    
    itemsIn[pdct]['quantity'] = +itemsIn[pdct]['quantity'] - 1;

    if (itemsIn[pdct]['quantity'] == 0){ 
        delete itemsIn[pdct];
        itemsIn["count"] -= 1;
        sessionStorage.setItem("products", JSON.stringify(itemsIn));
        CalcTotal(); 
        ev.target.parentElement.parentElement.remove();
        checkPage();
    } else {
        sessionStorage.setItem("products", JSON.stringify(itemsIn));
        let total = ev.target.parentElement.parentElement.querySelector(".total");
        total.innerHTML = ` الإجمالي <br> ${itemsIn[pdct]['price'] * itemsIn[pdct]['quantity']}`;
        CalcTotal(); 
    }   
}

function deleteWhole(ev) {
    let pdctEl = ev.target.parentElement.parentElement.querySelector(".desc");
    let pdct = pdctEl.innerHTML.slice(0, pdctEl.innerHTML.indexOf("<br>"));

    delete itemsIn[pdct];
    itemsIn["count"] -= 1;
    sessionStorage.setItem("products", JSON.stringify(itemsIn));
    ev.target.parentElement.parentElement.remove();
    CalcTotal()
    checkPage();
}

function checkPage(){
    const items = document.getElementsByClassName('item');
    if (items.length == 0) {
        document.getElementById('message').style.display = "block";
        document.querySelector(".final").remove();
    };
}

function CalcTotal(){
    let total = 0;
    for (key in itemsIn){
        if (key == "count") continue;
        total += itemsIn[key]["price"] * itemsIn[key]["quantity"];
    }
    document.getElementById("totalCost").innerHTML = total + " ريال ";
    return total;
}