# burgerMenu

Les burger menu sont devenus très populaires, surtout sur des écrans de petite taille. Ils nous permettent de placer une liste de liens ou des informations qui deviennent visibles en cliquant sur un bouton.

## Structure HTML

Il y a plusieurs manières de mettre en place un burgerMenu en HTML. Mais la structure de base d'une navigation reste la même, on retrouve:

- la balise `a` pour les liens;
- une liste pour grouper nos liens;
- la balise `nav` pour indiquer une navigation principale;
- un ou des `button` pour pouvoir ouvrir/fermer le menu;

Dans notre exemple, nous allons mettre en place une version simple en utilisant 1 bouton pour l'ouverture et la fermeture du menu.

```HTML

<nav class="menu">

    <ul class="menu__liste">
        <li class="menu__el"><a href="#">Accueil</a></li>
        <li class="menu__el"><a href="#">Mon expérience</a></li>
        <li class="menu__el"><a href="#">Ressources</a></li>
        <li class="menu__el"><a href="#">Case study</a></li>
    </ul>


    <button class="btn">Day/Night</button>
</nav>
<button class="btn menu__btn">Menu</button>
```

On peut voir la structure de la méthode BEM: 
- le Block `menu`;
- les éléments du block:
  - la liste `menu__liste`;
  - les éléments de la liste `menu__el`;
  - le bouton `menu__btn`;



## Le bouton

Dans mon exemple le `button` se trouve en dehors de la `nav`. On va le placer, en CSS, en haut et à droite de notre page.

**IMPORTANT** n'oubliez pas que le bouton à plusieurs styles par défaut, et que le curseur ne change pas automatiquement quand on le survol comme avec un lien. Il faut donc bien penser à définir:
- la `font-family`;
- le `cursor: pointer`;
- modifier le style du `border`, le `background-color` et le padding. 

```CSS
.btn{
    font-family: 'Heebo', sans-serif;
    cursor: pointer;    
    border: none;
    padding: 0;
    background-color: transparent;
    
    /* Ajouter le style de votre bouton */
}
.menu__btn{
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 20;
}
```

Dans cette proposition, je place le bouton en `absolute`, je le retire donc du flux normal du document. Ce qui me permet de le placer à un endroit précis du `viewport`. Le `z-index` est utile pour le garder au dessus des autres éléments de l'HTML. Dans noter exemple, vu que nous n'utilisons qu'un seul bouton pour la fermeture et l'ouverture, ça va nous permettre de garder le bouton au dessus du menu (plus d'explication dans la suite). Comme l'élément est déjà positionné (ici en `absolute`) le `z-index` est bien pris en compte.

### Le javascript du bouton

En javascript on va avoir besoin de notre menu et de notre bouton, la première chose à faire est donc de les sélectionner:

```JAVASCRIPT
const menu = document.querySelector(".menu"),
      menuBtn = document.querySelector(".menu__btn");
```

Ensuite, lorsqu'on clique sur le bouton, on veut ouvrir le menu. L'ouverture du menu va se faire en CSS, la seule chose qu'on a besoin, c'est l'ajout d'une classe.

```JAVASCRIPT
menuBtn.addEventListener("click", function(){
    menu.classList.toggle("menu--open");
});
```

Le toggle va automatiquement ajouter la classe `menu--open` lorsqu'elle n'est pas présente, ou la retirer lorsqu'elle est déjà là.

Si on veut, on peut également personnaliser le texte du bouton. D'après les études, un burgerMenu qui affiche le texte «MENU» est plus accessible.

```JAVASCRIPT
if(menuBtn.innerHTML === "Menu"){
  menuBtn.innerHTML = "Fermer";
}else{
  menuBtn.innerHTML = "Menu";
}
```

## Le menu

Comme pour l'HTML, il y a plusieurs moyens de procéder en CSS. La structure peut dépendre du résultat voulu et par exemple la manière dont doit apparaitre le menu.
Dans notre cas, nous allons faire apparaitre le menu de manière _classique_, une animation qui va glisser de la droite vers la gauche.

Pour ce faire, nous allons commencer par placer notre `<nav class="menu">` en `position: fixed;`, de cette manière nous allons pouvoir lui demander d'occuper tout l'espace de l'écran. 
 
```CSS
@media (max-width: 700px){

    /* M E N U */
    .menu{
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        top: 0;
        background-color: #fff;
        z-index: 10;
    }
    
}
```
Encore une fois, on utilise le `z-index` pour placer le menu au dessus du contenu du site. Une valeur `10` pour le menu et une valeur `20` pour le bouton de manière à garder le bouton au dessus du menu.

Ensuite, il faut le placer en mode **fermé**. Dans notre cas, tout à droite de l'écran. Une transformation de type `translateX(100%)` va nous permettre de placer automatiquement notre menu à 100% de sa largeur (donc toute la largeur de l'écran) sur la droite. On pourrait appliquer la même chose avec un `translateY` pour la hauteur par exemple.

```CSS
transform: translateX(100%);
```

Pour l'instant, notre menu occupe bien 100% de notre écran en largeur et en hauteur. Il est aussi masqué à droite de notre écran.

### Apparition

Le javascript est déjà en place pour faire apparaitre notre menu, il ajoute une classe `menu--open` sur notre menu.
On va donc utiliser ce `modifier` en CSS pour annuler notre transformation:

```CSS
@media (max-width: 700px){

    .menu--open{
        transform: translateX(0);
    }
    
}
```

### Transition

Il nous reste à prévoir une transition pour avoir un effet plus agréable lors de l'ouverture de notre menu. On va ajouter notre transition sur la classe `.menu` pour avoir une transition d'apparition et de disparition. L'idéal est de prévoir un effet différent pour la transition allée et la retour.

```CSS
transition: transform .3s cubic-bezier(0.33, 1, 0.68, 1);
```

J'utilise ici une `timing-function` qui vient du site [easings.net](https://easings.net/#easeOutCubic), elles sont plus travaillées que les simples transitions automatiques.
Vous avez aussi toujours la possibilité de tester directement vos effets dans votre navigateur:

<img width="459" alt="image" src="https://user-images.githubusercontent.com/2959650/151407177-ab799a29-f4fd-43f7-b464-0d49180f3e57.png">

Voici le CSS complet:

```CSS
@media (max-width: 1049px){

    /* M E N U */
    .menu{
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        top: 0;
        background-color: var(--color-bg);
        
        transform: translateX(100%);
        transition: transform .3s cubic-bezier(0.33, 1, 0.68, 1);
    }
    .menu--open{
        transform: translateX(0);
    }
}
```

## Menu responsive

Pour une application mobile, un seul menu sans responsive peut être suffisant. Dans le contexte d'un projet responsive, il faut pouvoir adapter le menu, ici un burgerMenu.

Nous avons déjà utilisé un max-width pour notre @media, ce qui restreint notre style de menu à une taille de smartphone. Il nous reste juste à cacher notre bouton d'ouverture/fermeture du menu:

```CSS
@media (min-width: 700px){

    .menu__btn{
        display: none;
    }

}
```

Il ne nous reste plus qu'a ajouter le style du menu :grin:.

## Documentations

Sur cette image, on peut découvrir la première utilisation de cet icône:

![xerox](https://user-images.githubusercontent.com/2959650/151370029-dcb64983-751a-4180-acaf-d64c3c7ff847.jpg)

Voici d'autres liens qui peuvent être utiles:

- [The Ultimate Guide to the Brilliance — and Potential Dangers — of the Hamburger Icon](https://vtldesign.com/web-strategy/website-design-development/hamburger-icon-flyout-menu-website-navigation/);
- [Hamburger menu alternatives for mobile navigation](https://medium.com/@kollinz/hamburger-menu-alternatives-for-mobile-navigation-a3a3beb555b8).
