let canvas = document.getElementById("rainCanv"),
	ctx = canvas.getContext('2d');
	
let cloud3 = new Image();
	cloud3.src = "cloud3.png";
	
let img = new Image();  
	img.src = "RainDrop2.png";
	
let normalWeather = new Image();  
	normalWeather.src = "normal-weather.png";
	
let increment = 0,
	timer,
	City,
	dropSpeed = 0.25,
	dropSize = 12.5,
	bool = true,
	drop = [];
	
let input = document.querySelector('#search-input'),
	temperature = document.querySelector('#temperature'),
	hour = document.querySelector('#hour'),
	dta = document.querySelector('#dta'),
	weather = document.querySelector('#weather'),
	humidity = document.querySelector('#humidity'),
	wind = document.querySelector('#wind'),
	btn = document.getElementById("search-btn");
	

 if(!localStorage.city) {City = "Cluj"} else { City = localStorage.city } 

/* if(localStorage.length == 0) {
	City = "Cluj";
} */
	
//const proxy = "https://cors-anywhere.herokuapp.com/";
const api = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=2646559153b9b5e41a9b426f056d47d8`;
	
		
	fetch(api)
		.then(response => {
			return response.json();	
		})
		.then(data => {
		 	
		 	   let date = new Date(),
				   localTime = date.getTime(),
				   localOffset = date.getTimezoneOffset() * 60000,
				   utc = localTime + localOffset,
				   cty = utc + (1000 * data.timezone);
				   newDate = new Date(cty);

			let val = "";
				
			
				
		 	if(data.weather.length > 1) {
					val = data.weather[1].main; 

					} else { 
						val = data.weather[0].main;
						
					} 
			
				
			weather.innerHTML = "Weather: " + val.charAt(0).toUpperCase() + val.slice(1);
			temperature.innerHTML = Math.round(data.main.temp - 273.15) + "&#176;C";
			humidity.innerHTML = "Humidity: " + data.main.humidity;
			wind.innerHTML = "Wind: " + data.wind.speed + "m/s";
		 	dta.innerHTML = newDate.toString().split(" 2021")[0];
			hour.innerHTML = newDate.toString().split(" 2021")[1].split(" GMT")[0];
			console.log(newDate.toString().split(" 2021")[1])
		})

		btn.addEventListener("click", () => {		
		
		fetch('https://api.openweathermap.org/data/2.5/weather?q='+ input.value +'&appid=2646559153b9b5e41a9b426f056d47d8')
		.then( res => {
			return res.json();

		})
 	.then( data => {
			
			let weatherMain;
			
			
			if(data.coord) {
				
				if(data.weather.length > 1) {
					weatherMain = data.weather[1].main; 
						localStorage.setItem("forecast", weatherMain);
					} else { 
						weatherMain = data.weather[0].main;
						localStorage.setItem("forecast", weatherMain);
					}
					
			localStorage.setItem("city", input.value);
			
			location.reload();
			
			} else {
				document.querySelector('.err').style.display = "block";
			}
					

		}) 

	
	})
	



canvas.width = 800;	
canvas.height = 800;

 class Rain {	//creating class
	 
  constructor(imag, xCut, yCut, xWidth, yHeight, xCanvas, yCanvas, width, height) {
   
    this.imag = imag;
	this.xCut = xCut;
	this.yCut = yCut;
	this.xWidth = xWidth; 
	this.yHeight = yHeight;
	this.xCanvas = xCanvas;
	this.yCanvas = yCanvas; 
	this.width = width;
	this.height = height;
    
  }
	
  draw(imag, xCut, yCut, xWidth, yHeight, xCanvas, yCanvas, width, height ){		//draw method 
	  
	  ctx.drawImage(imag, xCut, yCut, xWidth, yHeight, xCanvas, yCanvas, width, height);
	  
  }
  
}  

		//creating a varible that will generate raindrops
  	const rainDrop = (imag, xCut, yCut, xWidth, yHeight, xCanvas, yCanvas, width, height) => {  
		
		return new Rain(imag, xCut, yCut, xWidth, yHeight, xCanvas, yCanvas, width, height);
	} 

 	for(let i = 0; i < 1000; i++) {  //generating raindrops and storing them into an array
		drop.push(rainDrop());
	}  

		 
	function animate(){		//the animate function
	
		ctx.clearRect(0, 0, canvas.width, canvas.height);   //clears canvas every fps
		
		requestAnimationFrame(animate);  //redrawing each raindrop every fps
		

	
	if(  increment >= canvas.height ||  bool == true){  //raindrop values
	
			drop.forEach( (elem) => {	
				elem.imag = img;
				elem.xCut = 14;
				elem.yCut = 37;
				elem.xWidth = 36;
				elem.yHeight = 40;
				elem.xCanvas = Math.random() * 1600;
				elem.yCanvas = Math.random() * canvas.height;
				elem.width = 10;
				elem.height = 15;
			})
			
	}
	
	if( localStorage.forecast !== "Rain" && localStorage.forecast !== "Snow"){

		ctx.drawImage(normalWeather, 0, 0, canvas.width, canvas.height);
		
		} else {
			
			if( localStorage.forecast == "Snow" ){
				
				ctx.fillStyle = "#45798c";
				ctx.fillRect(0, 0, canvas.width, canvas.height); 
				x
			}
			
		for(i = 0; i < drop.length; i++) {	  //iterating each raindrop position
			
			if( drop[i].yCanvas > canvas.height) { //checks when raindrop reached bottom
			drop[i].yCanvas = 0; //send back to top raindrop 
			drop[i].xCanvas = Math.random() * canvas.width; //changes it's position on the x axes 
		}	
			
			
			
		
				
  		 	if ( i <= 100 ) {
				drop[i].yCanvas += 3;
				drop[i].width = drop[i].height = 6.5;
			} else if ( i <= 200 ) {
				drop[i].yCanvas += 4.25;
				drop[i].width = drop[i].height = 6;
			} else if ( i <= 300 ){
				drop[i].yCanvas += 4.5;
				drop[i].width = drop[i].height = 5.5;
			} else if ( i <= 400 ) {
				drop[i].yCanvas += 4.75;
				drop[i].width = drop[i].height = 5;
			} else if ( i <= 500 ) {
				drop[i].yCanvas += 5;
				drop[i].width = drop[i].height = 4.5;
			} else if ( i <= 600 ) {
				drop[i].yCanvas += 5.25;
				drop[i].width = drop[i].height = 4;
			} else if ( i <= 700 ) {
				drop[i].yCanvas += 5.50;
				drop[i].width = drop[i].height = 3.5;
			} else if ( i <= 800 ) {
				drop[i].yCanvas += 5.75;
				drop[i].width = drop[i].height = 3;		
			} else if ( i <= 900 ) {	
				drop[i].yCanvas += 5;
				drop[i].width = drop[i].height = 2.5;
			} else if ( i <= 1000 ) {
				drop[i].yCanvas += 5.25;
				drop[i].width = drop[i].height = 8;
			} 

			ctx.drawImage(
			drop[i].imag,drop[i].xCut, drop[i].yCut,
			drop[i].xWidth, drop[i].yHeight, drop[i].xCanvas,
			drop[i].yCanvas, drop[i].width, drop[i].height) //draws the raindrop with all of his values	
			
			}
			
			ctx.drawImage(cloud3, 200, -50, canvas.width, 250);
			ctx.drawImage(cloud3, -220, -100, canvas.width, 350);
			
		} 
	
		bool = false;	

	}

		

	 	cloud3.addEventListener('load', () => {  // when the sprite images loades, the animate function fires
			
			animate();	
				
		}); 
	 

	setInterval( ()=> {
		timer++;
		let clock = hour.innerText,
			arr = [];
			
			clock.split("").forEach( num => {
				if( num != ":") { arr.push(num) }
			})
			
		arr[5] = Number(arr[5]) + 1;
		
		if( arr[5] > 9 ){
			arr[5] = 0;
			arr[4] = Number(arr[4]) + 1;
		} else if (arr[4] > 5) {
			arr[4] = 0;
			arr[3] = Number(arr[3]) + 1;
		} else if (arr[3] > 9) {
			arr[3] = 0;
			arr[2] = Number(arr[2]) + 1;
		} else if (arr[2] > 5 ) {
			arr[2] = 0;
			arr[1] = Number(arr[1]) + 1;
		} else if (arr[1] > 9) {
			arr[1] = 0;
			arr[0] = Number(arr[0]) + 1;
		} 
		
		let string = arr.join("");
		
		hour.innerHTML = 1;
		
		hour.innerHTML = string.substring(0,1) + string.substring(1,2) + ":"
			   + string.substring(2,3) + string.substring(3,4) + ":"
			   + string.substring(4,5) + string.substring(5,6);
		
		
		
	}, 1000)
		
	
	
	let btnSearch = document.getElementById("search-btn");

/* 	btnSearch.addEventListener("click", () => {
		console.log(document.getElementById("search-input").value)
	})
	if (document.activeElement.tagName === "INPUT") console.log("An input is focused"); */


