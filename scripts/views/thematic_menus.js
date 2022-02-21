/**
 * @description returns an array of objects composed of the names and type of search filters among ingredients, appliances and or utensils
 * @returns {[object]} Array of elements
 */
function getFilterTags() {
    let nodes = TAG_BAR.childNodes;
    let elements = [];
    nodes.forEach(node => {
        let type = node.id.split('-')[0];
        let name = node.id.split('-')[1];
        let element = {
            'type': type,
            'name': name
        };
        elements.push(element);
    });

    return elements;
}

/**
 * @description Hide the unsuccessful main search message
 */
function closeResult() {
    RESULT.classList.add('hidden');
}

/**
 * @description Display a message in case of unsuccessful main search
 */
function openResult() {
    RESULT.classList.remove('hidden');
}

/**
 * @description Hide the corresponding tag and reset content
 * @param {string} element - The tag name
 * @see {@link getFilterTags}
 * @see {@link getRecipesByIntersect}
 * @see {@link updateContent}
 */
function closeTag(element) {
    const ELEMENT = document.getElementById(element);
    TAG_BAR.removeChild(ELEMENT);
    let recipes = RECIPES;
    if (TAG_BAR.firstChild !== null) {
        let elements = getFilterTags();
        recipes = getRecipesByIntersect(elements);
    }
    updateContent(recipes);
}

/**
 * @description Display the corresponding filter tag
 * @param {string} type 
 * @param {string} name 
 */
function displayTag(type, name) {
    let tagClass = type + '-tag';
    const TAG_ELEMENT = document.createElement('p');
    const TAG = document.createElement('span');
    const TAG_BUTTON = document.createElement('span');
    TAG_ELEMENT.setAttribute('class', tagClass);
    TAG_ELEMENT.setAttribute('id', type + '-' + name);
    TAG.textContent = name;
    TAG_BUTTON.setAttribute('class', 'far fa-times-circle');
    TAG_BUTTON.addEventListener('click', () => {
        closeTag(TAG_ELEMENT.id);
    });
    TAG_ELEMENT.appendChild(TAG);
    TAG_ELEMENT.appendChild(TAG_BUTTON);
    TAG_BAR.appendChild(TAG_ELEMENT);
}

/**
 * @description Launch main research from a part of a word and manage the process
 * @see {@link getElementsFromMainResearch}
 * @see {@link getRecipesByUnion}
 * @see {@link openResult}
 * @see {@link closeResult}
 * @see {@link updateContent}
 * @param {string} wordpart 
 */
function manageMainSearch(wordpart) {
    let elements = getElementsFromMainResearch(wordpart);
    let recipes = RECIPES;
    if (wordpart.length >= 3) {
        if (elements.length > 0) {
            recipes = getRecipesByUnion(elements);
        } else {
            openResult();
        }  
    } else {
        closeResult();
    }
    updateContent(recipes);
}

/**
 * @description Manage the specific research from part of word
 * @param {*} type - type of element
 * @param {*} wordpart
 * @see {@link getElementsFromResearch}
 * @see {@link buildMenuFromInputSearch}
 * @see {@link buildMenuFromRecipes}
 * @see {@link resetChildNodes}
 * @see {@link updateContent} 
 */
function manageDisplayFromInputMenuResearch(type, wordpart) {
    let elements;
    let recipes = RECIPES;
    if (wordpart.length >= 3) {
        elements = getElementsFromResearch(type, wordpart);
        if (elements.length > 0) {
            buildMenuFromInputSearch(elements);
        } else {
            buildMenuFromRecipes(recipes);
            resetChildNodes(document.getElementById(type + '-content'));
        }
    } else {
        updateContent(recipes);
    }
}

/**
 * @description Manage the research by tags
 * @param {string} filter type of element
 * @param {string} element name of element
 * @see {@link displayTag}
 * @see {@link getFilterTags}
 * @see {@link getRecipesByIntersect}
 * @see {@link updateContent}
 * @see {@link closeThematicMenu}
 */
function manageDisplayFromTagResearch(filter, element) {
    displayTag(filter, element);
    let elements = getFilterTags();
    let recipes = getRecipesByIntersect(elements);   
    updateContent(recipes);
    closeThematicMenu(filter);
}

/**
 * @description Update gallery of recipes and specific search menus
 * @param {[object]} recipes
 * @see {@link buildRecipesGallery}
 * @see {@link buildMenuFromRecipes}
 */
function updateContent(recipes) {
    buildRecipesGallery(recipes);
    buildMenuFromRecipes(recipes);
}

/**
 * @description Remove all children elements of a DOM element
 * @param {HTMLElement} domelement 
 */
function resetChildNodes(domelement) {
    while(domelement.hasChildNodes()) {
        domelement.removeChild(domelement.firstChild);
    }
}

/**
 * @description Update specific research menus from input search
 * @see {@link resetChildNodes}
 * @see {@link manageDisplayFromTagResearch}
 * @param {[object]} elements - Array of elements
 */
function buildMenuFromInputSearch(elements) {
    const MENU = document.getElementById(elements[0].type + '-content');
    let tagClass = elements[0].type + '-choice';
    resetChildNodes(MENU);
    const UL = document.createElement('ul');
    const LOOP = 3 - (elements.length % 3);
    for (let i = 0; i < elements.length; i++) {
        let li = document.createElement('li');
        li.setAttribute('class', tagClass);
        li.setAttribute('id', elements[i].name);
        li.textContent = elements[i].name;
        li.addEventListener('click', () => {
            manageDisplayFromTagResearch(li.className.split('-')[0], li.id);
        });
        UL.appendChild(li);
    }
    for (let i = 0; i < LOOP; i++) {
        let li = document.createElement('li');
        li.setAttribute('class', 'blank');
        UL.appendChild(li);
    }
    MENU.appendChild(UL);
}

/**
 * @description Build all specific research menus from elements of recipes
 * @param {[object]} recipes - Array of recipes
 * @see {@link resetChildNodes}
 * @see {@link getIngredientsFromRecipes}
 * @see {@link getApplianceFromRecipes}
 * @see {@link getUstensilsFromRecipes}
 * @see {@link manageDisplayFromTagResearch}
 */
function buildMenuFromRecipes(recipes) {
    const MENUS = ['ingredients-content', 'appliance-content', 'ustensils-content'];
    let elements;
    let tagClass;
    MENUS.forEach(menu => {
        const CONTENT = document.getElementById(menu);
        resetChildNodes(CONTENT);
        const UL = document.createElement('ul');
        switch (menu) {
            case 'ingredients-content':
                elements = getIngredientsFromRecipes(recipes);
                tagClass = 'ingredients-choice';
                break;
            case 'appliance-content':
                elements = getApplianceFromRecipes(recipes);
                tagClass = 'appliance-choice';
                break;
            case 'ustensils-content':
                elements = getUstensilsFromRecipes(recipes);
                tagClass = 'ustensils-choice';
                break;
            default:
                break;
        }
        const LOOP = 3 - (elements.length % 3);
        for (let i = 0; i < elements.length; i++) {
            let li = document.createElement('li');
            li.setAttribute('class', tagClass);
            li.setAttribute('id', elements[i]);
            li.textContent = elements[i];
            li.addEventListener('click', () => {
                manageDisplayFromTagResearch(li.className.split('-')[0], li.id);
            });
            UL.appendChild(li);
        }
        for (let i = 0; i < LOOP; i++) {
            let li = document.createElement('li');
            li.setAttribute('class', 'blank');
            UL.appendChild(li);
        }
        CONTENT.appendChild(UL); 
    }); 
}

/**
 * @description Close the specific research menu and reset seach input
 * @param {string} name - Name of menu
 */
function closeThematicMenu(name) {
    let buttonId = name + '-open-btn';
    let menuId = name + '-menu';
    const BUTTON = document.getElementById(buttonId);
    const MENU = document.getElementById(menuId);
    const INPUT = document.getElementById(name + '-input');
    BUTTON.classList.remove('hidden');
    MENU.classList.add('hidden');
    INPUT.value = '';
    buildMenuFromRecipes(RECIPES);
}

/**
 * Open the specific research menu
 * @param {string} name - Name of menu
 */
function openThematicMenu(name) {
    let buttonId = name + '-open-btn';
    let menuId = name + '-menu';
    const BUTTON = document.getElementById(buttonId);
    const MENU = document.getElementById(menuId);
    BUTTON.classList.add('hidden');
    MENU.classList.remove('hidden');
}