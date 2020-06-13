$(window).on("load", function(){
});

$(window).on("resize", function(){

});

$(window).on("scroll", function(){

});

/*scroll effect*/
function effect(){
	wow = new WOW(
		{
			boxClass:     'eff',      // default
			animateClass: 'animated', // default
			offset:       0,          // default
			mobile:       true,       // default
			live:         true        // default
		}
	)
	wow.init();
}

function mobileMenu(){
	const hamb = document.querySelector(".mobile-hambuger");
	const menu = document.querySelector(".mainMenu");
	hamb.addEventListener("click", function(){
		hamb.classList.toggle("active");
		menu.classList.toggle("opened");
	});
}
function scrollEvent(){
	const header = document.querySelector("header");    
	if(window.scrollY > 0) header.classList.add("fixed");
	else header.classList.remove("fixed");
}