/**
 * @description Return array of recipes from union of arrays of elements
 * @param {[object]} elements
 * @see {@link getRecipesFromElement}
 * @returns {[object]} Recipes table
 */
function getRecipesByUnion(elements) {
    let recipes = getRecipesFromElement(elements[0].type, elements[0].name);
    for (let i = 1; i < elements.length; i++) {
        let temp = getRecipesFromElement(elements[i].type, elements[i].name);
        for (let j = 0; j < temp.length; j++) {
            let control = true;
            for (let k = 0; k < recipes.length; k++) {
                if (recipes[k].id === temp[j].id) {
                    control = false;
                } 
            }
            if(control) {
                recipes[recipes.length] = temp[j];
            }
        }
    }

    return recipes;
}

/**
 * @description Return array of recipes from intersection of arrays of elements
 * @param {[object]} elements
 * @see {@link getRecipesFromElement}
 * @returns {[object]} Recipes table
 */
function getRecipesByIntersect(elements) {
    let recipes = getRecipesFromElement(elements[0].type, elements[0].name); 
    for (let i = 1; i < elements.length; i++) {
        let temp = [];
        let tab = getRecipesFromElement(elements[i].type, elements[i].name);
        for (let j = 0; j < recipes.length; j++) {
            for (let k = 0; k < tab.length; k++) {
                if (tab[k].id === recipes[j].id) {
                    temp[temp.length] = tab[k];
                } 
            }
        }
        recipes = temp;
    }
    
    return recipes;
}

/**
 * @description Return array of recipes from title recipe
 * @param {string} title - Recipe title
 * @returns {[object]} Array of recipes
 */
function getRecipesFromTitle(title) {
    let recipes = [];
    for (let i = 0; i < RECIPES.length; i++) {
        if (RECIPES[i].name.toLowerCase() === title.toLowerCase()) {
            recipes[recipes.length] = RECIPES[i];
        };
    }

    return recipes;
}

/**
 * @description Return array of recipes from recipe description
 * @param {string} description 
 * @returns {[object]} Array of recipes
 */
function getRecipesFromDescription(description) {
    let recipes = [];
    for (let i = 0; i < RECIPES.length; i++) {
        if (RECIPES[i].description.toLowerCase() === description.toLowerCase()) {
            recipes[recipes.length] = RECIPES[i];
        };
    }

    return recipes;
}

/**
 * @description Return array of recipes from recipe ingredient
 * @param {string} element - Recipe ingredient
 * @returns {[object]} Array of recipes
 */
function getRecipesFromIngredient(element) {
    let recipes = [];
    for (let i = 0; i < RECIPES.length; i++) {
        for (let j = 0; j < RECIPES[i].ingredients.length; j++) {
            if (RECIPES[i].ingredients[j].ingredient.toLowerCase() === element.toLowerCase()) {
                recipes[recipes.length] = RECIPES[i];
            }
        }
    }
    
    return recipes;
}

/**
 * @description Return array of recipes from recipe appliance
 * @param {string} element - Recipe appliance
 * @returns {[object]} Array of recipes
 */
function getRecipesFromAppliance(element) {
    let recipes = [];
    for (let i = 0; i < RECIPES.length; i++) {
        if (RECIPES[i].appliance.toLowerCase() === element.toLowerCase()) {
            recipes[recipes.length] = RECIPES[i];
        }
    }

    return recipes;
}

/**
 * @description Return array of recipes from recipe ustensil
 * @param {string} element - Recipe ustensil
 * @returns {[object]} Array of recipes
 */
function getRecipesFromUstensil(element) {
    let recipes = [];
    for (let i = 0; i < RECIPES.length; i++) {
        for (let j = 0; j < RECIPES[i].ustensils.length; j++) {
            if (RECIPES[i].ustensils[j].toLowerCase() === element.toLowerCase()) {
                recipes[recipes.length] = RECIPES[i];
            }
        }
    }

    return recipes;
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
    let recipes;
    switch (type) {
        case 'ingredients':
            recipes = getRecipesFromIngredient(element);
            break;
        case 'appliance':
            recipes = getRecipesFromAppliance(element);
            break;
        case 'ustensils':
            recipes = getRecipesFromUstensil(element);
            break
        case 'title':
            recipes = getRecipesFromTitle(element);
            break;
        case 'description':
            recipes = getRecipesFromDescription(element);
        default:
            break;
    }

    return recipes;
}

/**
 * @description Return array of ingredients from array of recipes
 * @param {[object]} recipes - Array of recipes
 * @returns {[string]} Array of ingredients
 */
function getIngredientsFromRecipes(recipes) {
    let ingredientsMenu = [];
    for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
            let single = true;
            for (let k = 0; k < ingredientsMenu.length; k++) {
                if(recipes[i].ingredients[j].ingredient.toLowerCase() === ingredientsMenu[k].toLowerCase()) {
                    single = false;
                }
            }
            if (single) {
                ingredientsMenu[ingredientsMenu.length] = recipes[i].ingredients[j].ingredient;
            }
        } 
    }

    return ingredientsMenu;
}

/**
 * @description Return array of appliances from array of recipes
 * @param {[object]} recipes - Array of recipes
 * @returns {[string]} Array of appliances
 */
function getApplianceFromRecipes(recipes) {
    let applianceMenu = [];
    for (let i = 0; i < recipes.length; i++) {
        let single = true;
        for (let j = 0; j < applianceMenu.length; j++) {
            if(recipes[i].appliance.toLowerCase() === applianceMenu[j].toLowerCase()) {
                single = false;
            }
        }
        if (single) {
            applianceMenu[applianceMenu.length] = recipes[i].appliance;
        }
    }

    return applianceMenu;
}

/**
 * @description Return array of ustensils from array of recipes
 * @param {[object]} recipes - Array of recipes
 * @returns {[string]} Array of ustensils
 */
function getUstensilsFromRecipes(recipes) {
    let ustensilsMenu = [];
    for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ustensils.length; j++) {
            let single = true;
            for (let k = 0; k < ustensilsMenu.length; k++) {
                if(recipes[i].ustensils[j].toLowerCase() === ustensilsMenu[k].toLowerCase()) {
                    single = false;
                }
            }
            if (single) {
                ustensilsMenu[ustensilsMenu.length] = recipes[i].ustensils[j];
            }
        } 
    }

    return ustensilsMenu;
}

/**
 * @description Return array of titles containing part of the word passed as parameter
 * @param {string} wordpart 
 * @returns {[object]} - Array of recipe titles
 */
function getTitlesFromResearch(wordpart) {
    let titleTable = [];
    for (let i = 0; i < RECIPES.length; i++) {
        if (RECIPES[i].name.toLowerCase().includes(wordpart.toLowerCase())) {
            titleTable[titleTable.length] = {
                'type': 'title',
                'name': RECIPES[i].name
            }
        }
    }

    return titleTable;
}

/**
 * @description Return array of description containing part of the word passed as parameter
 * @param {string} wordpart 
 * @returns {[object]} - Array of recipe descriptions
 */
function getDescriptionsFromResearch(wordpart) {
    let descriptionTable = [];
    for (let i = 0; i < RECIPES.length; i++) {
        if (RECIPES[i].description.toLowerCase().includes(wordpart.toLowerCase())) {
            descriptionTable[descriptionTable.length] = {
                'type': 'description',
                'name': RECIPES[i].description
            }
        }
    }

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
    for (let i = 0; i < allIngredients.length; i++) {
        if (allIngredients[i].toLowerCase().includes(wordpart.toLowerCase())) {
            ingredientsTable[ingredientsTable.length] = {
                'type': 'ingredients',
                'name': allIngredients[i]
            };
        }
    }

    return ingredientsTable;
}

/**
 * @description Return array of appliances containing part of the word passed as parameter
 * @param {string} wordpart 
 * @returns {[object]} - Array of recipe appliances
 */
function getApplianceFromResearch(wordpart) {
    let allAppliance = getApplianceFromRecipes(RECIPES);
    let applianceTable = [];
    for (let i = 0; i < allAppliance.length; i++) {
        if (allAppliance[i].toLowerCase().includes(wordpart.toLowerCase())) {
            applianceTable[applianceTable.length] = {
                'type': 'appliance',
                'name': allAppliance[i]
            };
        } 
    }

    return applianceTable;
}

/**
 * @description Return array of ustensils containing part of the word passed as parameter
 * @param {string} wordpart 
 * @returns {[object]} - Array of recipe ustensils
 */
function getUstensilsFromResearch(wordpart) {
    let allUstensils = getUstensilsFromRecipes(RECIPES);
    let ustensilsTable = [];
    for (let i = 0; i < allUstensils.length; i++) {
        if (allUstensils[i].toLowerCase().includes(wordpart.toLowerCase())) {
            ustensilsTable[ustensilsTable.length] = {
                'type': 'ustensils',
                'name': allUstensils[i]
            };
        }
    }

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
function getElementsFromResearch(type, wordpart) {
    let elements;
    switch (type) {
        case 'ingredients':
            elements = getIngredientsFromResearch(wordpart);
            break;
        case 'appliance':
            elements = getApplianceFromResearch(wordpart);
            break;
        case 'ustensils':
            elements = getUstensilsFromResearch(wordpart);
            break;
        default:
            break;
    }

    return elements
}

/**
 * @description Return array of elements composed of titles, descriptions and ingredient sought from part of a word
 * @param {string} wordpart
 * @see {@link getElementsFromMainResearch}
 * @see {@link getTitlesFromResearch}
 * @see {@link getDescriptionsFromResearch}
 * @see {@link getIngredientsFromResearch}
 * @returns {[object]} Array of elements
 */
function getElementsFromMainResearch(wordpart) {
    let elements = [];
    let title = getTitlesFromResearch(wordpart);
    let description = getDescriptionsFromResearch(wordpart);
    let ingredients = getIngredientsFromResearch(wordpart);
    for (let i = 0; i < title.length; i++) {
        elements[elements.length] = title[i]; 
    }
    for (let j = 0; j < description.length; j++) {
        elements[elements.length] = description[j];
    }
    for (let k = 0; k < ingredients.length; k++) {
        elements[elements.length] = ingredients[k];
    }

    return elements;
}

/**
 * @description Return all recipes data
 * @async
 * @returns {[object]} Array of recipes
 */
async function getAllRecipes() {
    return RECIPES;
}