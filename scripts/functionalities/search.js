import { RECIPES } from "../data/recipes_data.js";

/**
 * @description Return array of recipes from union of arrays of elements
 * @param {[object]} elements
 * @see {@link getRecipesFromElement}
 * @returns {[object]} Recipes table
 */
export function getRecipesByUnion(elements) {
    let recipes = [];
    elements.forEach(element => {
        let elementRecipes = getRecipesFromElement(element.type, element.name);
        elementRecipes.forEach(recipe =>  recipes.push(recipe));
    });

    return Array(...new Set(recipes));
}

/**
 * @description Return array of recipes from intersection of arrays of elements
 * @param {[object]} elements
 * @see {@link getRecipesFromElement}
 * @returns {[object]} Recipes table
 */
export function getRecipesByIntersect(elements) {
    let firstElement = elements.shift();
    let recipes = getRecipesFromElement(firstElement.type, firstElement.name);
    elements.forEach(element => {
        let elementRecipes = getRecipesFromElement(element.type, element.name);
        let temp = recipes.filter(recipe => elementRecipes.includes(recipe));
        recipes = temp;
    });

    return recipes;
}

/**
 * @description Return array of recipes from title recipe
 * @param {string} title - Recipe title
 * @returns {[object]} Array of recipes
 */
function getRecipesFromTitle(title) {
    return RECIPES.filter(recipe => recipe.name.toLowerCase() === title.toLowerCase());
}

/**
 * @description Return array of recipes from recipe description
 * @param {string} description 
 * @returns {[object]} Array of recipes
 */
function getRecipesFromDescription(description) {
    return RECIPES.filter(recipe => recipe.description.toLowerCase() === description.toLowerCase());
}

/**
 * @description Return array of recipes from recipe ingredient
 * @param {string} element - Recipe ingredient
 * @returns {[object]} Array of recipes
 */
function getRecipesFromIngredient(element) {
    return RECIPES.filter(
        recipe => recipe.ingredients.some(
            item => item.ingredient.toLowerCase() === element.toLowerCase()
        )
    );
}

/**
 * @description Return array of recipes from recipe appliance
 * @param {string} element - Recipe appliance
 * @returns {[object]} Array of recipes
 */
function getRecipesFromAppliance(element) {
    return RECIPES.filter(recipe => recipe.appliance.toLowerCase() === element.toLowerCase());
}

/**
 * @description Return array of recipes from recipe ustensil
 * @param {string} element - Recipe ustensil
 * @returns {[object]} Array of recipes
 */
function getRecipesFromUstensil(element) {
    return RECIPES.filter(
        recipe => recipe.ustensils.some(
            item => item.toLowerCase() === element.toLowerCase()
        )
    );
}

/**
 * @description Return array of recipes from element type of research
 * @param {string} type - element type
 * @param {string} element - element name
 * @see {@link getRecipesFromIngredient}
 * @see {@link getRecipesFromAppliance}
 * @see {@link getRecipesFromUstensil}
 * @see {@link getRecipesFromTitle}
 * @see {@link getRecipesFromDescription}
 * @returns {[object]} Array of recipes
 */
function getRecipesFromElement(type, element) {
    switch (type) {
        case 'ingredients':
            return getRecipesFromIngredient(element);
        case 'appliance':
            return getRecipesFromAppliance(element);
        case 'ustensils':
            return getRecipesFromUstensil(element);
        case 'title':
            return getRecipesFromTitle(element);
        case 'description':
            return getRecipesFromDescription(element);
        default:
            break;
    }
}

/**
 * @description Return array of ingredients from array of recipes
 * @param {[object]} recipes - Array of recipes
 * @returns {[string]} Array of ingredients
 */
export function getIngredientsFromRecipes(recipes) {
    let ingredientsTable = [];
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(item => {
            ingredientsTable.push(
                item.ingredient.charAt(0).toUpperCase() + 
                item.ingredient.toLowerCase().slice(1));
        });
    });

    return Array(...new Set(ingredientsTable));
}

/**
 * @description Return array of appliances from array of recipes
 * @param {[object]} recipes - Array of recipes
 * @returns {[string]} Array of appliances
 */
export function getApplianceFromRecipes(recipes) {
    let applianceTable = [];
    recipes.forEach(recipe => applianceTable.push(
        recipe.appliance.charAt(0).toUpperCase() + 
        recipe.appliance.toLowerCase().slice(1)
    ));

    return Array(...new Set(applianceTable));
}

/**
 * @description Return array of ustensils from array of recipes
 * @param {[object]} recipes - Array of recipes
 * @returns {[string]} Array of ustensils
 */
export function getUstensilsFromRecipes(recipes) {
    let ustensilsTable = [];
    recipes.forEach(recipe => {
        recipe.ustensils.forEach(item => {
            ustensilsTable.push(
                item.charAt(0).toUpperCase() + 
                item.toLowerCase().slice(1));
        });
    });

    return Array(...new Set(ustensilsTable));
}

/**
 * @description Return array of titles containing part of the word passed as parameter
 * @param {string} wordpart 
 * @returns {[object]} - Array of recipe titles
 */
function getTitlesFromResearch(wordpart) {
    let titleTable = [];
    let recipesTable = RECIPES.filter(recipe => recipe.name.toLowerCase().includes(wordpart.toLowerCase()));
    recipesTable.forEach(recipe => {
        titleTable.push({
            'type': 'title',
            'name': recipe.name
        });
    });

    return titleTable;
}

/**
 * @description Return array of description containing part of the word passed as parameter
 * @param {string} wordpart 
 * @returns {[object]} - Array of recipe descriptions
 */
function getDescriptionsFromResearch(wordpart) {
    let descriptionTable = [];
    let recipesTable = RECIPES.filter(recipe => recipe.description.toLowerCase().includes(wordpart.toLowerCase()));
    recipesTable.forEach(recipe => {
        descriptionTable.push({
            'type': 'description',
            'name': recipe.description
        });
    });

    return descriptionTable;
}

/**
 * @description Return array of ingredients containing part of the word passed as parameter
 * @param {string} wordpart 
 * @returns {[object]} - Array of recipe ingredients
 */
function getIngredientsFromResearch(wordpart) {
    let allIngredients = getIngredientsFromRecipes(RECIPES);
    let ingredientsTable = [];
    let ingredients = allIngredients.filter(ingredient => ingredient.toLowerCase().includes(wordpart.toLowerCase()));
    ingredients.forEach(ingredient => {
        ingredientsTable.push({
            'type': 'ingredients',
            'name': ingredient
        });
    });

    return ingredientsTable;
}

/**
 * @description Return array of appliances containing part of the word passed as parameter
 * @param {string} wordpart 
 * @returns {[object]} - Array of recipe appliances
 */
function getApplianceFromResearch(wordpart) {
    let allAppliances = getApplianceFromRecipes(RECIPES);
    let appliancesTable = [];
    let appliances = allAppliances.filter(appliance => appliance.toLowerCase().includes(wordpart.toLowerCase()));
    appliances.forEach(appliance => {
        appliancesTable.push({
            'type': 'appliance',
            'name': appliance
        });
    });

    return appliancesTable;
}

/**
 * @description Return array of ustensils containing part of the word passed as parameter
 * @param {string} wordpart 
 * @returns {[object]} - Array of recipe ustensils
 */
function getUstensilsFromResearch(wordpart) {
    let allUstensils = getUstensilsFromRecipes(RECIPES);
    let ustensilsTable = [];
    let ustensils = allUstensils.filter(ustensil => ustensil.toLowerCase().includes(wordpart.toLowerCase()));
    ustensils.forEach(ustensil => {
        ustensilsTable.push({
            'type': 'ustensils',
            'name': ustensil
        });
    });

    return ustensilsTable;
}

/**
 * @description Return array of elements from type and part of the word passed as parameters
 * @param {string} type - element type
 * @param {string} wordpart
 * @see {@link getIngredientsFromResearch}
 * @see {@link getApplianceFromResearch}
 * @see {@link getUstensilsFromResearch}
 * @returns {[object]} Array of elements
 */
export function getElementsFromResearch(type, wordpart) {
    switch (type) {
        case 'ingredients':
            return getIngredientsFromResearch(wordpart);
        case 'appliance':
            return getApplianceFromResearch(wordpart);
        case 'ustensils':
            return getUstensilsFromResearch(wordpart);
        default:
            break;
    }
}

/**
 * @description Return array of elements composed of titles, descriptions and ingredients sought from part of a word
 * @param {string} wordpart
 * @see {@link getElementsFromMainResearch}
 * @see {@link getTitlesFromResearch}
 * @see {@link getDescriptionsFromResearch}
 * @see {@link getIngredientsFromResearch}
 * @returns {[object]} Array of elements
 */
export function getElementsFromMainResearch(wordpart) {
    let elements = [];
    let titles = getTitlesFromResearch(wordpart);
    let descriptions = getDescriptionsFromResearch(wordpart);
    let ingredients = getIngredientsFromResearch(wordpart);
    titles.forEach(title => elements.push(title));
    descriptions.forEach(description => elements.push(description));
    ingredients.forEach(ingredient => elements.push(ingredient));

    return elements;
}

/**
 * @description Return all recipes data
 * @async
 * @returns {[object]} Array of recipes
 */
export async function getAllRecipes() {
    return RECIPES;
}