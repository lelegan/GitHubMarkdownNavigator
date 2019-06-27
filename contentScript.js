(function(){

    showToc();

    // GitHub uses PJAX and therefore the page can be reloaded without the content script being triggered again.
    // PJAX emits a pjax:end event once the content has been replaced.
    document.addEventListener("pjax:end", function(){
        showToc();
    });

    function showToc(){
        var readme = document.getElementById("readme");
        if(!readme){
            // skipping because no readme
            return;
        }

        var nav = document.createElement("div");
        nav.id = "mdNav";

        // get all title elements
        // as there is no single query to find all titles we can find all titles as they have the anchor link and navigate from there:
        var titles = readme.querySelectorAll("a.anchor");
        for (let i = 0; i < titles.length; i++) {
            var element = titles[i];
            addTitleToNav(element, nav);
        }

        readme.parentElement.insertBefore(nav, readme);
    }
    
    function addTitleToNav(titleLink, parent){
        var link = document.createElement("a");
        link.setAttribute("href", titleLink.href);
        var titleElement = titleLink.parentElement;
        link.classList.add("level"+titleElement.tagName.substring(1));
        link.innerText = titleElement.innerText; //the title value
        parent.appendChild(link);
    }
})();

//TODO: hide lower level titles after some amount of titles to make overview better. Add controls to change behavior
//TODO: help differentiate between multi-line titles & next sibling
//TODO: make nav expandable on small screens
//TODO: underline highest level title