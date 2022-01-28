"use strict";

const menu = document.querySelector(".menu"),
      menuBtn = document.querySelector(".menu__btn");

menuBtn.addEventListener("click", function(){
    menu.classList.toggle("menu--open");

    if(menuBtn.innerHTML === "Menu"){
        menuBtn.innerHTML = "Fermer";
    }else{
        menuBtn.innerHTML = "Menu";
    }
});