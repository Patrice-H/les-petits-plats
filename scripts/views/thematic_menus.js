function getFilterTags() {
    let nodes = TAG_BAR.childNodes;
    let elements = [];
    nodes.forEach(node => {
        let type = node.id.split('-')[0];
        let name = node.id.split('-')[1];
        let element = {
            'type': type,
            'name': name
        }
        elements.push(element);
    });

    return elements;
}

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

function manageMainSearch(wordpart) {
    let elements = getElementsFromMainResearch(wordpart);
    let recipes = RECIPES;
    if (wordpart.length >= 3) {
        recipes = getRecipesByUnion(elements);
    }
    updateContent(recipes);
}

function manageDisplayFromInputMenuResearch(type, wordpart) {
    let elements;
    let recipes = RECIPES;
    if (wordpart.length >= 3) {
        elements = getElementsFromResearch(type, wordpart);
        if (elements.length > 0) {
            recipes = getRecipesByUnion(elements);
            updateContent(recipes);
            buildMenuFromInputSearch(elements);
        } else {
            buildMenuFromRecipes(recipes)
            resetChildNodes(document.getElementById(type + '-content'));
        }
    } else {
        updateContent(recipes);
    }
}

function manageDisplayFromTagResearch(filter, element) {
    displayTag(filter, element);
    let elements = getFilterTags();
    let recipes = getRecipesByIntersect(elements);   
    updateContent(recipes);
    closeThematicMenu(filter);
}

function updateContent(recipes) {
    buildRecipesGallery(recipes);
    buildMenuFromRecipes(recipes);
}

function resetChildNodes(domelement) {
    while(domelement.hasChildNodes()) {
        domelement.removeChild(domelement.firstChild);
    }
}

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
                tagClass = 'ingredients-choice'
                break;
            case 'appliance-content':
                elements = getApplianceFromRecipes(recipes);
                tagClass = 'appliance-choice'
                break;
            case 'ustensils-content':
                elements = getUstensilsFromRecipes(recipes);
                tagClass = 'ustensils-choice'
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

function closeThematicMenu(name) {
    let buttonId = name + '-open-btn';
    let menuId = name + '-menu';
    const BUTTON = document.getElementById(buttonId);
    const MENU = document.getElementById(menuId);
    BUTTON.classList.remove('hidden');
    MENU.classList.add('hidden');
}

function openThematicMenu(name) {
    let buttonId = name + '-open-btn';
    let menuId = name + '-menu';
    const BUTTON = document.getElementById(buttonId);
    const MENU = document.getElementById(menuId);
    BUTTON.classList.add('hidden');
    MENU.classList.remove('hidden');
}

const THEMATIC_BUTTONS = Array.from(document.getElementsByClassName('thematic-search-button'));
const CLOSE_THEMATIC_MENU_BUTTONS = Array.from(document.getElementsByClassName('close-btn'));
const THEMATIC_INPUTS = Array.from(document.getElementsByClassName('thematic-input'));
const TAG_BAR = document.getElementById('thematic-tag-bar');
const MAIN_INPUT = document.getElementById('main-search');

buildMenuFromRecipes(RECIPES);

THEMATIC_BUTTONS.forEach(button => {
    button.addEventListener('click', () => {
        openThematicMenu(button.id.split('-')[0]);
    });
});
CLOSE_THEMATIC_MENU_BUTTONS.forEach(button => {
    button.addEventListener('click', () => {
        closeThematicMenu(button.id.split('-')[0]);
    });
});
THEMATIC_INPUTS.forEach(input => {
    input.addEventListener('input', (evt) => {
        manageDisplayFromInputMenuResearch(input.id.split('-')[0], evt.target.value);
    });
});
MAIN_INPUT.addEventListener('input', (evt) => {
    manageMainSearch(evt.target.value);
});