/**
 * A library of useful functions for configuring websites to work with
 * Dragonfly voice commands.
 */


(function() { // create a private scope for variables used by the library
    
    let titleObserver = null;
    
    // Ensures that the page's title ends in a certain suffix.
    function setTitleSuffix(suffix) {
        // Appends the specified suffix to the page title.
        function fixTitle() {
            if (!document.title.endsWith(suffix)) {
                // console.log("document.title changed to:", document.title);
                document.title += suffix;
            }
        }
        
        // disconnect any old observer
        if (titleObserver !== null) {
            titleObserver.disconnect();
        }
        
        // start a new observer to re-fix the title if the page changes it
        titleObserver = new MutationObserver(function(mutations) {
            fixTitle();
        });
        titleObserver.observe(
            document.querySelector('title'),
            { subtree: true, characterData: true, childList: true },
        );
        
        // fix the title right now
        fixTitle();
    }
    window.setTitleSuffix = setTitleSuffix; // export this function for use by other code
    
    
    function isDigit(str) {
        return str.match(/^[0-9]$/) !== null;
    }
    function isLetter(str) {
        return str.match(/^[a-z]$/i) !== null;
    }
    
    // Register a function to be called when an alt-shift-[key] shortcut is pressed.
    function createShortcut(key, callback) {
        const keyCode = isDigit(key)? `Digit${key}` : isLetter(key)? `Key${key.toUpperCase()}` : key;
        
        document.addEventListener("keyup", function(event) {
            // let str = "";
            // if (event.metaKey) str += 'w';
            // if (event.ctrlKey) str += 'c';
            // if (event.altKey) str += 'a';
            // if (event.shiftKey) str += 's';
            // str += `-${event.key}`
            // console.log(str, event.code);
            
            if (event.altKey && event.shiftKey && !event.ctrlKey && !event.metaKey && event.code === keyCode) {
                callback();
            }
        });
    }
    window.createShortcut = createShortcut; // export this function for use by other code
    
    
    // Get the first element matching the given CSS selector
    // (and, optionally, for which the given predicate returns true),
    // or null if not found.
    function getElement(selector, predicate) {
        if (predicate === undefined) {
            return document.querySelector(selector);
        } else {
            for (const e of document.querySelectorAll(selector)) {
                if (predicate(e)) return e;
            }
            return null;
        }
    }
    window.getElement = getElement; // export this function for use by other code
    
    
    // Execute a function in the context of the page (not the userscript).
    function runInPage(func) {
        var script = document.createElement("script");
        script.textContent = `(${func})()`;
        document.body.appendChild(script);
        document.body.removeChild(script);
    }
    window.runInPage = runInPage; // export this function for use by other code
    
})();
