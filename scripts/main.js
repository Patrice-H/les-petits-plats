/**
 * @description Load the scripts of the application
 */
 function loadScripts() {
    const scripts = ['data/recipes_data', 'views/recipes_gallery', 'views/thematic_menus'];
    const appScripts = document.getElementById("scripts");
    scripts.forEach(script => {
        let node = document.createElement('script');
        appScripts.append(node);
        appScripts.lastChild.setAttribute('src', './scripts/' + script + '.js');
    });
}

loadScripts();