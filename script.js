async function init() {
	console.log("Try init")
	if (localStorage[1]) {
		console.log("Local Storage was found, Loading it ...")
		lodingInit()
		loadCard()
		cssBs()
		PriceCalculator()
	} else {
		console.warn("Local Storage was not found, Loading default ...")
		DEL();
		await fetchData();
		lodingInit()
		cssBs()
	}
}

function cssBs() {
	elementToCheck = document.getElementById("header")

	window.addEventListener('scroll', () => { 
		if (checkVisiblety(elementToCheck)) { 
			document.getElementById("cardItems").style = "max-height: calc(100% - 416px);"
		} else { 
			document.getElementById("cardItems").style ="max-height: calc(100% - 342px);"
		} 
	}); 
}

function checkVisiblety(Ele) { 
	const item = Ele.getBoundingClientRect(); 
	return ( 
		item.top >= 0 && 
		item.left >= 0 && 
		item.bottom <= ( 
			window.innerHeight || 
			document.documentElement.clientHeight) && 
		item.right <= ( 
			window.innerWidth || 
			document.documentElement.clientWidth) 
	); 
} 

function DEL() {
	localStorage.clear();
}

async function fetchData() {
	let response = await fetch("http://localhost:5500//data.json");
	let data = await response.json();
	setNewlocalStorage(data);
}

function setNewlocalStorage(data) {
	localStorage.setItem('0', JSON.stringify(data[0]))
	localStorage.setItem('1', JSON.stringify(data[1]))
	localStorage.setItem('2', JSON.stringify(data[2]))
	localStorage.setItem('3', JSON.stringify(data[3]))
	localStorage.setItem('4', JSON.stringify(data[4]))
	localStorage.setItem('5', JSON.stringify(data[5]))
	localStorage.setItem('6', JSON.stringify(data[6]))
	localStorage.setItem('7', JSON.stringify(data[7]))
	localStorage.setItem('8', JSON.stringify(data[8]))
	localStorage.setItem('9', JSON.stringify(data[9]))
	localStorage.setItem('10', JSON.stringify(data[10]))
	localStorage.setItem('11', JSON.stringify(data[11]))
	localStorage.setItem('12', JSON.stringify(data[12]))
	localStorage.setItem('13', JSON.stringify(data[13]))
	localStorage.setItem('card', JSON.stringify(data["card"]))
}

function lodingInit() {
	eleIDs = ["Popular", "Starters", "Salads", "Pizzaa", "Pastaa", "BakedPasta", "Risottoo", "Carnee", "Pesce", "Focacciaa", "Additivoo", "Dolcii", "nonAlcoholicBeverages", "AlcoholicBeverages"]

	for (let index = 0; index < 14; index++) {	
		const properties =	JSON.parse(localStorage.getItem(index) || "[]");
		const mealsArray = properties[1]

		renderit(eleIDs[index], `${returnImg(properties)}<h2>${properties[0].name}</h2>${returnComments(properties)}`)
	
		mealsArray.forEach(meal => {
			renderit(eleIDs[index] , `<li onclick="addToCard(${index +`,`+ meal.ID})">${returnMeals(meal)}<div><svg viewBox="0 0 16 16" width="1em" height="1em" role="presentation" focusable="false" aria-hidden="true"><path d="M14.125 7.344H8.656V1.875H7.344v5.469H1.875v1.312h5.469v5.469h1.312V8.656h5.469V7.344z"></path></svg></div></li>`)
		});
	}
}

function renderit(id, html) {
	document.getElementById(id).innerHTML += html
}

function renderOverwrite(id, html) {
	id.innerHTML = html
}

function returnMeals(currentMeal) {
		responseHTML = `<h3>${currentMeal.name}</h3> <h5>${currentMeal.description}</h5> <h3>${currentMeal.price.toFixed(2)} €</h3>`
		return responseHTML	
}

function returnImg(properties) {
	if (properties[0].img !== "") {
		responseHTML = `<img src="${properties[0].img}" alt="" srcset="">`
		return responseHTML
	} else {
		return ""
	}
}

function returnComments(properties) {
	if (properties[0].comment !== "") {
		responseHTML = `<h6>${properties[0].comment}</h6>`
		return responseHTML
	} else {
		return ""
	}
}

function loadCard() {
	const cardArray = JSON.parse(localStorage.getItem("card") || "[]");
	renderOverwrite(cardItems, "")
	for (let index = 1; index < cardArray.length; index++) {
		price = cardArray[index].price * cardArray[index].times
		priceRounded = price.toFixed(2)
		renderit("cardItems", `
			<li id="">
				<h4>${cardArray[index].times}</h4>
				<div style="margin-bottom: 8px;">
					<h3>${cardArray[index].name}</h3>
					<span>${priceRounded} €</span>
				</div>
				<div>
					<strong>Anmerkung hinzufügen</strong>
					<div>
						<button onclick="removeFromCard(${index})">
							<svg xmlns="http://www.w3.org/2000/svg" role="presentation" focusable="false" fill="currentColor" viewBox="0 0 16 16" class="c-pieIcon c-pieIcon--minus" width="24" height="24"><path d="M14.125 7.344H1.875v1.312h12.25V7.344Z"></path></svg>							
						</button>
						<span>${cardArray[index].times}</span>
						<button onclick="addToCard(${cardArray[index].category +`,`+ cardArray[index].ID})">
							<svg xmlns="http://www.w3.org/2000/svg" role="presentation" focusable="false" fill="currentColor" viewBox="0 0 16 16" class="c-pieIcon c-pieIcon--plus" width="24" height="24"><path d="M14.125 7.344H8.656V1.875H7.344v5.469H1.875v1.312h5.469v5.469h1.312V8.656h5.469V7.344Z"></path></svg>
						</button>
					</div>
				</div>
			</li>
		`)		
	}
}

function addChangeDB(category, cardItem) {
	localStorage.setItem(category, JSON.stringify(cardItem))
}

function cardItemExists(ItemUniqueID) {
	const cardArray = JSON.parse(localStorage.getItem("card") || "[]");

	let seachArray = []

	for (let index = 1; index < cardArray.length; index++) {
		seachArray.push(cardArray[index].uniqueID)
	}
	const found = seachArray.findIndex((index) => index === ItemUniqueID);
	return found
}

function addToCard(category, itemID) {
	const cardItem = JSON.parse(localStorage.getItem(category) || "[]");
	const cardArray = JSON.parse(localStorage.getItem("card") || "[]");

	ItemUniqueID = `${category}` + `${itemID}`
	if (cardItemExists(ItemUniqueID) !== -1) {
		cardArray[cardItemExists(ItemUniqueID) + 1].times = cardArray[cardItemExists(ItemUniqueID) + 1].times + 1
		addChangeDB("card", cardArray)
		loadCard()
		PriceCalculator()
	} else {
		cardArray.push({"name": cardItem[1][itemID].name, "description": cardItem[1][itemID].description, "price": cardItem[1][itemID].price, "times": 1, "category": category, "ID":  itemID, "uniqueID": ItemUniqueID})
		addChangeDB("card", cardArray)
		loadCard()
		PriceCalculator()
	}
}	

function removeFromCard(ItemID) {
	const cardArray = JSON.parse(localStorage.getItem("card") || "[]");
	if (cardArray[ItemID].times === 1) {
		lol = ItemID + 1
		cardArray.splice(ItemID, 1)
		console.log(cardArray)
		addChangeDB("card", cardArray)
		loadCard()
		PriceCalculator()
	} else {
		cardArray[ItemID].times = cardArray[ItemID].times - 1
		addChangeDB("card", cardArray)
		loadCard()
		PriceCalculator()
	}
}


function PriceCalculator() {
	const cardArray = JSON.parse(localStorage.getItem("card") || "[]");
	let subtotal = null
	for (let index = 1; index < cardArray.length; index++) {
		PriceCache = cardArray[index].price * cardArray[index].times		
		if (subtotal == null) {
			subtotal = PriceCache
		} else if (PriceCache !== subtotal) {
			subtotal = PriceCache + subtotal	
			cardArray[0].subtotal = subtotal
		}
	}
	addChangeDB("card", cardArray)
	loadCardPrice(subtotal)
}

let price

function loadCardPrice(subtotal) {
	subtotalRoundet = subtotal.toFixed(2)
	total = Number(subtotalRoundet) + 2
	if (forPickup === "pickup") {
		renderOverwrite(billingArea,`
			<span>
				<div><span>Zwischensumme</span><span>${subtotalRoundet} €</span></div>
				<div><strong>Gesamt</strong><strong>${subtotalRoundet} €</strong></div>
			</span>
			<button id="payNonMoba" onclick="invoceIt(payNonMoba,${subtotalRoundet})">Bezahlen (<h1 id="totalAmount">${subtotalRoundet} €</h1>)</button>
			<button id="payMoba" onclick="invoceIt(payMoba,${subtotalRoundet})">Warenkorb (<h1 id="totalAmount">${subtotalRoundet} €</h1>)</button>
		`)
		price = subtotalRoundet
	} else {
		renderOverwrite(billingArea,`
			<span>
				<div><span>Zwischensumme</span><span>${subtotalRoundet} €</span></div>
				<div><span>Lieferkosten</span><span>2,00 €</span></div>
				<div><strong>Gesamt</strong><strong>${total.toFixed(2)} €</strong></div>
			</span>	
			<button id="payNonMoba" onclick="invoceIt(payNonMoba)">Bezahlen (<h1 id="totalAmount">${total.toFixed(2)} €</h1>)</button>
			<button id="payMoba" onclick="invoceIt(payMoba)">Warenkorb (<h1 id="totalAmount">${total.toFixed(2)} €</h1>)</button>
		`)
		price = total.toFixed(2)
	}
}

function invoceIt(diviceType) {
	if (diviceType.id === "payNonMoba") {
		document.getElementById("fullscreen").style = "display: flex;"
	} else {
		document.getElementById("card").classList = "cart cartFullscreen"
		document.getElementById("payMoba").innerHTML = "Bezahlen" + " (" + price + ") €"
		document.getElementById("body").style = "overflow-y: hidden;"
		document.getElementById("cardItems").style = "max-height: 75%;"
		document.getElementById("cardheadingmoba").style = "display: flex;"
	}
}

function closeCartFullscreen() {
	document.getElementById("card").classList = "cart"
	document.getElementById("body").style = "overflow-y: scroll;"
	document.getElementById("cardItems").style ="max-height: calc(100% - 342px);"
	document.getElementById("cardheadingmoba").style = ""
	document.getElementById("payMoba").innerHTML = "Warenkorb" + " (" + price + ") €"
}

function closefullscreen() {
	document.getElementById("fullscreen").style = "display: none;"
}

let lastItem

function clickt(item, scrollTo) {
	console.log(lastItem)
	if (lastItem) {
		document.getElementById(lastItem).classList = ""
	} 
	document.getElementById(scrollTo.id).scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
	document.getElementById(item).classList = "current"	
	
	lastItem = item
}

function skipBack() {
	document.getElementById("scroll").scrollLeft -= 100;
}

function skipFor() {
	document.getElementById("scroll").scrollLeft += 100;
}

let forPickup

function minecraftLever(whichCase) {
	deliveryBnt = document.getElementById("delivery")
	pickupBnt = document.getElementById("pickup")
	if (whichCase.id === "delivery") {
		deliveryBnt.classList = "active"
		pickupBnt.classList.remove("active")
	} else {
		pickupBnt.classList = "active"
		deliveryBnt.classList.remove("active")
	}
	forPickup = whichCase.id
	PriceCalculator()
}