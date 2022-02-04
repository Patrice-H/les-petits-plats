/**
 * @description Manages the number of description lines according to the length of the recipe title
 * @param {string} name 
 * @returns {string} class names list
 */
function getNumberOfDescriptionLines(name) {
    let classNames = 'recipe-description ';
    if (name.length > 28) {
        classNames = classNames + 'display8rows';
    } else {
        classNames = classNames + 'display10rows';
    }

    return classNames;
}

/**
 * @description Return the div of ingredients
 * @param {[object]} ingredients 
 * @returns {HTMLElement} div
 */
function getRecipeIngredients(ingredients) {
    const DIV = document.createElement('div');
    DIV.setAttribute('class', 'recipe-ingredients');

    ingredients.forEach(ingredient => {
        const P = document.createElement('p');
        const NAME = document.createElement('span');
        const QTY = document.createElement('span');
        const BR = document.createElement('br');

        P.setAttribute('class', 'ingredient');
        NAME.setAttribute('class', 'ingredient-name');
        NAME.textContent = ingredient.ingredient + ': ';
        if (ingredient.unit) {
            QTY.textContent = ingredient.quantity + ' ' + ingredient.unit;
        } else {
            QTY.textContent = ingredient.quantity;
        }

        P.appendChild(NAME);
        P.appendChild(QTY);
        DIV.appendChild(P);
        DIV.appendChild(BR);
    });

    return DIV;
}

/**
 * @description Return an article about recipe data
 * @param {object} recipe 
 * @returns {HTMLElement} article
 */
function getRecipeArticle(recipe) {
    const ARTICLE = document.createElement('article');
    const IMG = document.createElement('img');
    const RECIPE_TEXT = document.createElement('div');
    const TEXT_HEADER = document.createElement('div');
    const TEXT_BODY = document.createElement('div');
    const RECIPE_TITLE = document.createElement('h2');
    const RECIPE_TIME = document.createElement('div');
    const TIME_ICON = document.createElement('span');
    const TIME_TEXT = document.createElement('span');
    const RECIPE_DESCRIPTION = document.createElement('p');
    const RECIPE_INGREDIENTS = getRecipeIngredients(recipe.ingredients);

    IMG.setAttribute('src', './images/recipe-image.jpg');
    IMG.setAttribute('alt', '');
    IMG.setAttribute('class', 'recipe-image');
    RECIPE_TEXT.setAttribute('class', 'recipe-text');
    TEXT_HEADER.setAttribute('class', 'recipe-text-header');
    TEXT_BODY.setAttribute('class', 'recipe-text-body');
    RECIPE_TITLE.textContent = recipe.name;
    RECIPE_TITLE.setAttribute('class', 'recipe-title');
    RECIPE_TIME.setAttribute('class', 'recipe-time');
    TIME_ICON.setAttribute('class', 'far fa-clock');
    TIME_TEXT.textContent = recipe.time + ' min';
    RECIPE_DESCRIPTION.textContent = recipe.description
    RECIPE_DESCRIPTION.setAttribute('class', getNumberOfDescriptionLines(recipe.name));

    RECIPE_TIME.appendChild(TIME_ICON);
    RECIPE_TIME.appendChild(TIME_TEXT);
    TEXT_HEADER.appendChild(RECIPE_TITLE);
    TEXT_HEADER.appendChild(RECIPE_TIME);
    TEXT_BODY.appendChild(RECIPE_INGREDIENTS);
    TEXT_BODY.appendChild(RECIPE_DESCRIPTION);
    RECIPE_TEXT.appendChild(TEXT_HEADER);
    RECIPE_TEXT.appendChild(TEXT_BODY);
    ARTICLE.appendChild(IMG);
    ARTICLE.appendChild(RECIPE_TEXT);

    return ARTICLE;
}

/**
 * @description Build the recipes gallery on page
 * @param {[object]} recipes 
 */
function buildRecipesGallery(recipes) {
    const RECIPES_GALLERY = document.getElementById('recipes');
    const LOOP = 4 - (recipes.length % 4);
    recipes.forEach(recipe => {
        const RECIPE_ARTICLE = getRecipeArticle(recipe);
        RECIPES_GALLERY.appendChild(RECIPE_ARTICLE);
    });
    for (let i = 0; i < LOOP; i++) {
        let blank = document.createElement('article');
        blank.setAttribute('class', 'blank');
        RECIPES_GALLERY.appendChild(blank);
    }
}

document.addEventListener('DOMContentLoaded', buildRecipesGallery(RECIPES));