import { getAllRecipes } from "../functionalities/search.js";
import { buildRecipesGallery } from "../views/recipes_gallery.js";
import { 
    buildMenuFromRecipes, 
    openThematicMenu, 
    closeThematicMenu, 
    manageDisplayFromInputMenuResearch, 
    manageMainSearch, 
    closeResult
} from "../views/thematic_menus.js";

// CONSTANTS
const THEMATIC_BUTTONS = Array.from(document.getElementsByClassName('thematic-search-button'));
const CLOSE_THEMATIC_MENU_BUTTONS = Array.from(document.getElementsByClassName('close-btn'));
const THEMATIC_INPUTS = Array.from(document.getElementsByClassName('thematic-input'));
const MAIN_INPUT = document.getElementById('main-search');
const CLOSE_RESULT = document.getElementById('close-result');

// EVENT LISTENERS
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
CLOSE_RESULT.addEventListener('click', () => {
    closeResult();
});

// PAGE VIEW
async function init() {
    await getAllRecipes().then(data => {
        buildRecipesGallery(data);
        buildMenuFromRecipes(data);
    });
}

window.onload = init;