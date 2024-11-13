# (More) Lazy Vendor Bandaids

LiveVox and other tools used by associates have some glaring accessibility issues that impact screen reader and keyboard users. This extension is designed to patch in the functionality needed to make this tool usable for associates who are blind.

This extension fixes these accessibility issues:
* Set labels for Login ID, Password, and Service fields.
* Improve dashboard menu accessibility:
    * Better labels for the top level menu button.
    * Support keyboard navigation and activation of menu items. Keyboard navigation is arrow key based. Menu items are activated using space.
    * Provide announcements and hint text to screen readers.
* Watches for foolish attempts to set aria-hidden on the <body> element and immediately banishes them.
* Bugs:
    * Menus do not close when an item is selected. Have to manually arrow backwards to close menu.

## How to Use
Install extension and it will automatically run on the pages listed in manifest.json.

## Install

### Chrome

1. Download this repo and put it somewhere easy to find
2. Open Chrome, and go to chrome://extensions/
3. Turn on "Developer Mode" (upper right corner)
4. Click "Load unpacked" (upper left, will appear after Developer Mode is enabled)
5. Select the folder containing this extension to install

### Firefox

Firefox install not yet available