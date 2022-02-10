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

function getRecipesFromTitle(title) {
    let recipes = [];
    for (let i = 0; i < RECIPES.length; i++) {
        if (RECIPES[i].name.toLowerCase() === title.toLowerCase()) {
            recipes[recipes.length] = RECIPES[i];
        };
    }

    return recipes;
}

function getRecipesFromDescription(description) {
    let recipes = [];
    for (let i = 0; i < RECIPES.length; i++) {
        if (RECIPES[i].description.toLowerCase() === description.toLowerCase()) {
            recipes[recipes.length] = RECIPES[i];
        };
    }

    return recipes;
}

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

function getRecipesFromAppliance(element) {
    let recipes = [];
    for (let i = 0; i < RECIPES.length; i++) {
        if (RECIPES[i].appliance.toLowerCase() === element.toLowerCase()) {
            recipes[recipes.length] = RECIPES[i];
        }
    }

    return recipes;
}

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