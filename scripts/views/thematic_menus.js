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