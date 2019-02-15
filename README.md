# jquery-promotional-modal-plugin

Basic jQuery plugin triggers modals and measures user experience

- Install the plugin using `npm i jquery-promotional-modal-plugin`

- Call the plugin:
	-  ``` $(#selector).prom({ params });```
	- for the selector, choose any DOM element with id
	- params are optional: if nothing is passed, it will run on every page
  	- if you want to exclude a page, added it to the params as in the example below.
      If the string is encountered in the url or in a recommended product, the plugin will not run.
	- ex. ```$(#selector).prom({ doNotRunOn: 'gummies' });```

- List of config params and their defaults:
    - doNotRunOn: '',
    - fadeDuration: 250,
    - fadeDelay: 0,

- `doNotRunOn` is empty by default
- `fadeDuration` sets param for jquery modal
- `fadeDelay` sets param for jquery modal

- `detectRecommendation` method is optional and tied to concrete css params; comment out or replace conditions
-  `beforeCookie` detects if another modal is currently open; if yes, it prevents the promo modal from being activated

- Dependencies:
  - jquery, js-cookie, jquery-modal
