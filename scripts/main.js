/**
 * @description Load the scripts of the application
 */
 function loadScripts() {
    const scripts = ['data/recipes_data', 'functionalities/search', 'views/recipes_gallery', 'views/thematic_menus', 'controllers/main_controller'];
    const appScripts = document.getElementById("scripts");
    scripts.forEach(script => {
        let node = document.createElement('script');
        appScripts.append(node);
        appScripts.lastChild.setAttribute('src', './scripts/' + script + '.js');
    });
}

loadScripts();