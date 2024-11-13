console.log("livevox-login");

const fixA11y = function() {

    console.log("livevox-login.fixA11y()");
	
	var logo = document.querySelector('#root > div > div > div > div.lv-login > div > div > div.lv-card__bd > div.lv-login__logo > div > img');
    if (logo) { logo.setAttribute('aria-label', 'LiveVox'); }
	
	var clientCode = document.getElementById('clientCode');
    if (clientCode) { clientCode.setAttribute('aria-label', 'Client Code'); }

    var username = document.getElementById('username');
    if (username) { username.setAttribute('aria-label', 'Login ID'); }

    var password = document.getElementById('password');
    if (password) { password.setAttribute('aria-label', 'Password'); }
	
	var rememberMe = document.getElementById('rememberMe');
    if (rememberMe) { rememberMe.setAttribute('aria-label', 'Remember Me'); }

    var service = document.getElementById('react-select-2-input');
    if (service) { 
        service.setAttribute('aria-label', 'Service'); 
        service.setAttribute('role', 'combobox');
    }
    
};


fixA11y();

const rootNode = document.querySelector('body');

const setLabels = function(mutationsList, observer) {

    console.log("mutation observed");
	fixA11y();
    
};

const observer = new MutationObserver(setLabels);
observer.observe(rootNode, { childList: true, subtree: true });