var viewport = document.querySelector("head > meta[name='viewport']");
if (viewport) { viewport.setAttribute('content', 'width=device-width, initial-scale=1'); }

var logo = document.querySelector("img[src='assets/images/Nelnet.svg']");
if (logo) { logo.setAttribute('aria-label', 'Nelnet'); }

var username = document.getElementById('username');
if (username) { username.setAttribute('aria-label', 'Username'); }

var password = document.getElementById('password');
if (password) { 
	password.setAttribute('aria-label', 'Password');
	if (document.title === 'Change Password') {
		password.setAttribute('aria-label', 'Current Password');
	}
}

var newPassword1 = document.getElementById('newPassword1');
if (newPassword1) { newPassword1.setAttribute('aria-label', 'New Password'); }

var newPassword2 = document.getElementById('newPassword2');
if (newPassword2) { newPassword2.setAttribute('aria-label', 'Confirm New Password'); }

var buttonLink = document.querySelectorAll("form > div.ping-buttons > a");
for (var i = 0; i < buttonLink.length; i++) {
	buttonLink[i].setAttribute('tabindex', '0'); 
	buttonLink[i].addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
			event.preventDefault();
	        buttonLink[i].click();
        }
    });
}

var trouble = document.querySelector("body > div > div.ping-body-container > div > form > div.ping-input-link.ping-pass-change.account-actions > a:nth-child(4)");
if (trouble) { 
	trouble.setAttribute('tabindex', '0'); 
	trouble.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
			event.preventDefault();
	        trouble.click();
        }
    });
}

var passwordRequirements = document.getElementById("requirements-link");
if (passwordRequirements) { 
	passwordRequirements.setAttribute('tabindex', '0'); 
	passwordRequirements.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
			event.preventDefault();
	        passwordRequirements.click();
        }
    });
}
