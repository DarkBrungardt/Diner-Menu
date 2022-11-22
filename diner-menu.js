const menu = [
    {
        product: "Large JavePizza",
        price: 10.50,
        dinnerPriceMod: 2,
        tags: ["lunch", "dinner", "specials", "burger"]
    },
    {
        product: "Cowboy Pizza",
        price: 12.50,
        dinnerPriceMod: 2,
        tags: ["lunch", "dinner", "specials", "burger"]
    },
    {
        product: "Java-club sliders",
        price: 10.50,
        dinnerPriceMod: 2,
        tags: ["lunch", "dinner", "specials", "salad"]
    },
    {
        product: "CSS Corn Salad",
        price: 11.00,
        dinnerPriceMod: 2,
        tags: ["lunch", "dinner", "specials", "salad"]
    },
    {
        product: "Word-Wrapper Chicken Pasta",
        price: 8.50,
        tags: ["breakfast", "specials"]
    },
    {
        product: "Font Omelette",
        price: 9.00,
        tags: ["breakfast", "specials"]
    },
    {
        product: "c++ French Toast",
        price: 7.50,
        tags: ["breakfast", "specials"]
    },
    {
        product: "c+= Creamy Corndip",
        price: 3.50,
        tags: ["lunch", "dinner", "sides"]
    },
    {
        product: "Java Cornbread",
        price: 4.00,
        tags: ["breakfast", "lunch", "dinner", "sides"]
    },
    {
        product: "Green bean and HTML",
        price: 3.00,
        tags: ["breakfast", "sides"],
    },
    {
        product: "Dr.Fuzz 20oz",
        price: 1.00,
        tags: ["breakfast", "drinks"]
    },
    {
        product: "Sweet Cream Rootbeer",
        price: 2.00,
        tags: ["lunch", "dinner", "drinks"]
    },
    {
        product: "Fizzy Cider",
        price: 3.00,
        tags: ["lunch", "dinner", "drinks"],
        description: "Free refills all day!"
    },
    {
        product: "Vanilla Smoothie",
        price: 3.00,
        tags: ["lunch", "dinner", "drinks"]
    },
    {
        product: "Waffle Shake",
        price: 2.00,
        tags: ["breakfast", "drinks"],
        description: "Fill up on your breakfast!"
    },
    {
        product: "Chrome Download",
        price: 8.00,
        tags: ["breakfast", "drinks"],
        description: "All of the mixed drinks combined!"
    },
]

const waitressNameBank = ["Sydney", "Maddie", "Taylor", "Dian", "Max", "Alica"];


var customerOrderList = [];
var currentMenuCategory = "";
var menuActive = false;
var waitressName = generateWaitress();
var totalPayment = 0;


function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function setMenuCategory(menuType) {
    setSpecialsCategory(menuType);
    renderMenu("specials", menuType);
    renderMenu("drinks", menuType);
    renderMenu("sides", menuType);
    renderOrderList();
    toggleMenu();
    let hideList = document.querySelectorAll(".intro-menu");
    for (var i = 0; i < hideList.length; i++) {
        hideList[i].classList.add('toggle-visible');
    }
    serviceBark("intro");
}


function setSpecialsCategory(menuType) {
    currentMenuCategory = menuType;
    // document.getElementById("header-specials").textContent = `<h2>specials("${menuType}");</h2>`;
    const newText = document.createTextNode(`specials("${menuType}");`);
    const newHeading = document.createElement("h2");
    newHeading.appendChild(newText);
    document.getElementById("header-specials").appendChild(newHeading);
}


function toggleMenu() {
    const myMenu = document.querySelector('#menu-display');
    if (menuActive) {
        myMenu.classList.toggle('toggle-visible');
        menuActive = false;
    } else {
        myMenu.classList.toggle('toggle-visible');
        menuActive = true;
    }
}


function getItemPrice(item) {
    return item.price + ('dinnerPriceMod' in item && currentMenuCategory === 'dinner' ? item.dinnerPriceMod : 0);
}


function getItemDesc(item) {
    return 'description' in item ? item.description : "";
}


function buildDiv({ divID = '', divClass = '', divText = null }) {
    const newDiv = document.createElement("div");
    newDiv.className = divClass;
    newDiv.id = divID;
    if (divText) {
        const newText = document.createTextNode(divText);
        newDiv.appendChild(newText);
    }
    return newDiv;
}


function renderMenu(itemType, menuCategory) {
    var idListTag = "list-" + itemType;
    for (var item in menu) {
        if (menu[item].tags.includes(itemType) && menu[item].tags.includes(menuCategory)) {

            const menuAppended = document.getElementById(idListTag);
            const newItemDiv = buildDiv({ divClass: "menu-item", divID: `add-${item}` });
            newItemDiv.appendChild(buildDiv({ divClass: "item-name", divText: `${menu[item].product}`}));
            newItemDiv.appendChild(buildDiv({ divClass: "item-price", divText: `$${getItemPrice(menu[item]).toFixed(2)}`}));
            newItemDiv.appendChild(buildDiv({ divClass: "item-desc", divText: `${getItemDesc(menu[item])}`}));
            newItemDiv.addEventListener("click",function(){addMenuItem(this.id)});
            menuAppended.appendChild(newItemDiv);
        }
    }
}


function renderOrderList() {
    var orderListHTML = document.getElementById("order-list-tag");
    var totalPaymentOutput = 0;
    var deleteNode = orderListHTML.lastElementChild;
    while (deleteNode) {
        orderListHTML.removeChild(deleteNode);
        deleteNode = orderListHTML.lastElementChild;
    }

    if (customerOrderList.length > 0) {
        document.getElementById("checkout-btn").classList.remove("toggle-visible");
        document.getElementById("reset-btn").classList.remove("toggle-visible");

        for (var item in customerOrderList) {
            totalPaymentOutput += getItemPrice(customerOrderList[item]);

            const newOrderDiv = buildDiv({ divClass: "order-item" })
            newOrderDiv.appendChild(buildDiv({ divClass: "order-product", divText: `${customerOrderList[item].product}` }));
            newOrderDiv.appendChild(buildDiv({ divClass: "order-price", divText: `$${getItemPrice(customerOrderList[item]).toFixed(2)}` }));
            const trashIcon = document.createElement("i");
            trashIcon.className = "order-remove far fa-trash-alt";
            trashIcon.id = `del-${item}`;
            trashIcon.addEventListener("click",function() {delOrderItem(this.id)});
            newOrderDiv.appendChild(trashIcon);

            orderListHTML.appendChild(newOrderDiv);
        }
    } else {
        document.getElementById("checkout-btn").classList.add("toggle-visible");
        document.getElementById("reset-btn").classList.add("toggle-visible");
        orderListHTML.appendChild(buildDiv({ divClass: "please-order-text", divText: "(No items in cart.)" }))
    }
    document.getElementById("total-payment").textContent = `$${totalPaymentOutput.toFixed(2)}`;
}


function addMenuItem(itemID) {
    let itemIndex = itemID.substring(itemID.indexOf("-") + 1);
    customerOrderList.push(menu[itemIndex]);

    renderOrderList();
    serviceBarkCategory(menu[itemIndex], "breakfast");
    serviceBarkCategory(menu[itemIndex], "burger");
    serviceBarkCategory(menu[itemIndex], "salad");
    serviceBarkCategory(menu[itemIndex], "sides");
    serviceBarkCategory(menu[itemIndex], "drinks");
    console.log(customerOrderList);
}


function delOrderItem(itemID) {
    let delItemIndex = itemID.substring(itemID.indexOf("-") + 1);
    if (confirm(`Are you sure you want to delete ${customerOrderList[delItemIndex].product} from your order? Hit OK to confirm.`)) {
        customerOrderList.splice(delItemIndex, 1);
        renderOrderList();
        serviceBark("delete");
    }
}


function delOrderAll() {
    if (confirm(`Are you sure you want to delete your entire order? Hit OK to confirm.`)) {
        customerOrderList = [];
        renderOrderList();
        serviceBark("deleteAll");
    }
}


function checkoutButton() {
    if (customerOrderList.length > 0) {
        for (var item in customerOrderList) {
            totalPayment += getItemPrice(customerOrderList[item]);
        }
        barkTable.checkout[0] = `Perfect! We'll get that started for you right away! Your total comes out to $${totalPayment.toFixed(2)}\r\n\r\nWould you like to leave a tip?`;
        serviceBark("checkout");
        toggleMenu();
        document.getElementById("checkout-btn").classList.add("toggle-visible");
        document.getElementById("reset-btn").classList.add("toggle-visible");
    } else {
        alert("You need at least 1 item in your cart to check out.");
    }
}


function generateWaitress() {
    var idxName = getRandInt(1, waitressNameBank.length) - 1;
    return waitressNameBank[idxName];
}


function serviceBark(eventType) {
    var barkIndex = getRandInt(1, barkTable[eventType].length) - 1;
    document.getElementById("server-chat-box").textContent = `${waitressName.toUpperCase()} SAYS:\r\n\r\n"` + barkTable[eventType][barkIndex] + '"';
}


function serviceBarkCategory(menuItem, category) {
    if (menuItem.tags.includes(category)) {
        serviceBark(category);
    }
}



const barkTable = {
    intro: [
        `Hello there! My name is ${waitressName} and I'll be your server today.
        \r\n\r\nPlease have a look at our online Menu today. Please click any meal you want to the side. A bar will pop up with the price and meal!`
    ],

    delete: [
        "Not to worry, we'll just forget you ever tried to order that.",
        "Are you sure?",
        "Alright, I'll take that one off the list. What else would you like to order?"
    ],

    checkout: [
        "SPECIAL CASE - STRING MUST BE UPDATED FROM CHECKOUT FUNCTION"
    ],

    breakfast: [
        "Great way to start the day! Don't forget about our Chrome Download!",
        "Fresh from the kitchen!",
    ],

    Pizza: [
        "That is a pizza. Pizza are so tasty. it will be a blast of flavor!",
        "We've got a full condiments bar just over there if you need any toppings."
    ],

    salad: [
        "Great choice! One of us has to eat healthy for the group!",
        "Have you had one of our salads before? They tast amazing",
        "Good choice! I'll be bringing pepper for you in a minute!.",
    ],

    drinks: [
        "I'll bring it out to you once we are done with your order!"
    ],

    sides: [
        "Any sauces on the side?.",
        "Just can't get enough, huh? That's an excellent choice of side."
    ],

    deleteAll: [
        "Alright, I've shredded the entire order page, ready to start from scratch. What would you like?",
    ]
};