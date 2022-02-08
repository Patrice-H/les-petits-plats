function closeTag(element) {
    const TAG_BAR = document.getElementById('thematic-tag-bar');
    const ELEMENT = document.getElementById(element);
    TAG_BAR.removeChild(ELEMENT);
}

function displayTag(tagkind, tagname) {
    const TAG_BAR = document.getElementById('thematic-tag-bar');
    let tagClass = tagkind.split('-')[0] + '-tag';
    const TAG_ELEMENT = document.createElement('p');
    const TAG = document.createElement('span');
    const TAG_BUTTON = document.createElement('span');
    TAG_ELEMENT.setAttribute('class', tagClass);
    TAG_ELEMENT.setAttribute('id', tagkind.split('-')[0] + '-' + tagname);
    TAG.textContent = tagname;
    TAG_BUTTON.setAttribute('class', 'far fa-times-circle');
    TAG_BUTTON.addEventListener('click', () => {
        closeTag(TAG_ELEMENT.id);
    });
    TAG_ELEMENT.appendChild(TAG);
    TAG_ELEMENT.appendChild(TAG_BUTTON);
    TAG_BAR.appendChild(TAG_ELEMENT);
}

function buildMenus(recipes) {
    const MENUS = ['ingredients-content', 'appliance-content', 'ustensils-content'];
    let elements;
    let tagClass;
    MENUS.forEach(menu => {
        const CONTENT = document.getElementById(menu);
        const UL = document.createElement('ul');
        switch (menu) {
            case 'ingredients-content':
                elements = getIngredients(recipes);
                tagClass = 'ingredients-choice'
                break;
            case 'appliance-content':
                elements = getAppliance(recipes);
                tagClass = 'appliance-choice'
                break;
            case 'ustensils-content':
                elements = getUstensils(recipes);
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
                displayTag(li.className, li.id);
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

buildMenus(RECIPES);

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