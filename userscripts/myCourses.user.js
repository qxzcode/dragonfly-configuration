// ==UserScript==
// @name        Dragonfly integration: myCourses
// @namespace   Dragonfly integrations
// @match       https://mycourses.rit.edu/*
// @downloadURL https://raw.githubusercontent.com/qxzcode/dragonfly-configuration/master/userscripts/myCourses.user.js
// @homepageURL https://github.com/qxzcode/dragonfly-configuration
// @supportURL  https://github.com/qxzcode/dragonfly-configuration/issues
// @require     https://raw.githubusercontent.com/qxzcode/dragonfly-configuration/master/userscripts/common.js
// @grant       none
// @version     1.0
// @author      Quinn Tucker
// @description (Created 9/2/2020.)
// ==/UserScript==


setTitleSuffix(' - myCourses');


// alt-shift-N: toggles the notifications dropdown
createShortcut('n', () => {
    const element = document.querySelector('d2l-dropdown[no-auto-open] > .d2l-dropdown-opener[text="Update alerts"]');
    if (element !== null) {
        element.click();
    } else {
        // run this code in the page's context, to access page-defined JS functions
        runInPage(() => {
            const element = document.querySelector('d2l-dropdown > .d2l-dropdown-opener[text="Update alerts"]');
            element.parentElement.toggleOpen(true);
        });
    }
});

// alt-shift-0: clicks on the course title (goes to the course homepage)
createShortcut('0', () => getElement('d2l-navigation-main-header .d2l-navigation-s-title-container > .d2l-navigation-s-link').click());

// alt-shift-<number>: click on different course tabs
function createTabShortcut(key, tabName) {
    createShortcut(key, () => getElement('.d2l-navigation-s-main-wrapper > .d2l-navigation-s-item > a', e => e.firstChild.textContent === tabName).click());
}
createTabShortcut('1', 'Content');
createTabShortcut('2', 'Assignments');
createTabShortcut('3', 'Discussions');
createTabShortcut('4', 'Quizzes');
createTabShortcut('5', 'Grades');
