const rootNode = document.querySelector('body');

// create an aria live region to feed announcements to
const ariaAnnouncer = document.createElement('div');
ariaAnnouncer.setAttribute('aria-live', 'polite');
ariaAnnouncer.setAttribute('aria-atomic', 'true');
rootNode.after(ariaAnnouncer);

// element with menu help text
const menuHelp = document.createElement('span');
const menuHelpText = 'Menu Instructions: Press Down Arrow, then Right Arrow to open menu.';

menuHelp.setAttribute('id', 'menu-help-div');
menuHelp.innerText = menuHelpText;
rootNode.after(menuHelp);

const statusLabel = document.createElement('span');
statusLabel.setAttribute('id', 'status-label');
statusLabel.innerText = 'Status: ';
rootNode.after(statusLabel);

const announce = function(text) {
    ariaAnnouncer.innerText = text;
    console.log(text);
}

const getActiveMenuItem = function(menu) {
    let activeItem = menu.querySelector(':scope > .rc-menu-item-active');

    if(!activeItem) {
        activeItem = menu.querySelector('.rc-menu-submenu-active > [aria-expanded="false"]');
    }

    if(!activeItem) {
        activeItem = menu.querySelector('.rc-menu-submenu-active .rc-menu-item-active');
    }

    console.log(activeItem);
    return activeItem;
}

const menuItemAnnouncement = function(menuItem, verb) {
    let announcement = "";

    if(verb) { announcement = verb + ' '; } 

    if(menuItem.hasAttribute('aria-haspopup')) {
        announcement += menuItem.textContent + " sub menu. Press right arrow to open";
    } else {
        announcement += menuItem.textContent + " menu item";
    }

    return announcement;
}

const accessibitizeMenus = function(mutationsList, observer) {

    console.log('attempting menu fixes');

    const menuButtons = document.getElementsByClassName('rc-menu');

    console.log(menuButtons.length);
    
    for(let i = 0; i < menuButtons.length; i++) {

        // remove tabindex and role from top level "menu" element. Menu works better if focusing on the child element.
        menuButtons[i].removeAttribute('tabindex');
        menuButtons[i].removeAttribute('role');

        // remove role from <li> since this provides no benefit either, we will focus on the <div> inside it.
        menuButtons[i].querySelector('li').removeAttribute('role');
        
        // get our actual menu buttons and set it up.
        let menuDiv = menuButtons[i].querySelector('.rc-menu-submenu-title');
        
        //console.log(menuDiv);

        menuDiv.setAttribute('role', 'menu');
        menuDiv.setAttribute('tabindex', '0');
        menuDiv.setAttribute('attr-menu-num', i);
        menuDiv.setAttribute('aria-describedby', menuHelp.getAttribute('id'));
        menuDiv.setAttribute('id', 'menu-btn-' + i);

        if(menuDiv.textContent == 'Not Ready') {
            menuDiv.setAttribute('aria-labelledby', statusLabel.getAttribute('id') + ' menu-btn-' + i);
        } else if(menuDiv.querySelector('.lv-avatar')) {
            // assuming if this contains the avatar class this is the user menu
            menuDiv.setAttribute('aria-label', 'User');
        }

        // summary of how this event listener works:
        // listen for keyup events on the menuDiv element. keyup instead of keydown, because the actual key handling by LiveVox
        // happens on keydown, and we want to make sure the active menu item is updated before we read it out.
        // 
        // first, see if the menu is open by checking for presence of aria-owns attribute. if it is, check if the menu is using
        // the default id value, and if it is, change it to something better. We can't do this ahead of time, because the menu
        // is not added to the DOM until the first time it's opened. Either way, save the menu to a variable to reference later.
        //
        // then, if an arrow key was pressed, we know menu navigation is happening, and we will find the active menu item,
        // and feed it to the aria-live announcer so it can be read out.
        // otherwise, if the enter key is pressed, announce the selected item and simulate a click event so that any actions
        // tied to that menu item can fire.
        //
        // bugs:
        //   * menu DOES NOT close after selecting an item. I've tried simulating mouseout but that doesn't help. the only time
        //     the menu has closed for me was when my cursor was coincidentally over the menu.
        menuDiv.addEventListener('keyup', function(event) {
            

            if(event.target.hasAttribute('aria-owns')) {
				
                // so the menu ids this app uses are not valid html, so the selector needs to use [id=""] instead of # :(
                let menu = document.querySelector('[id="' + event.target.getAttribute('aria-owns') + '"]');
                
                if(menu) {
                    // give it a better id that is actually unique
                    menu.setAttribute('id', 'menu' + event.target.getAttribute('attr-menu-num'));
                } else {
                    menu = document.querySelector('#menu' + event.target.getAttribute('attr-menu-num'));
                }
				
                // on arrow, find active menu item and read it out loud
                if(event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                    announce(menuItemAnnouncement(getActiveMenuItem(menu)));
                }
                
                // on space or enter, find active item and simulate a click
                if(event.key === ' ' || event.key === 'Enter') {
                    
					let menuItem = getActiveMenuItem(menu);
                    announce(menuItemAnnouncement(menuItem, 'Selected'));
                    menuItem.click();

                    // this click does not close the menu.... haven't yet figured out how to close it
                }
            }

        });

    };
    
};

const observer = new MutationObserver(accessibitizeMenus);
observer.observe(rootNode, { childList: true });

const catchBodyAriaHidden = function(mutationsList, observer) {
    if(document.body.hasAttribute('aria-hidden')) {
        // BEGONE ARIA HIDDEN!
        document.body.removeAttribute('aria-hidden');
    }
}

const bodyObserver = new MutationObserver(catchBodyAriaHidden);
bodyObserver.observe(document.body, { attributes: true });