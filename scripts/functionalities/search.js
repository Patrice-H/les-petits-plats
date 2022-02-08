function getIngredients(recipes) {
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

function getAppliance(recipes) {
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

function getUstensils(recipes) {
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