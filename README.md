# jquery-promotional-modal-plugin
Basic jQuery to that triggers modals and measures user experience

- Call the plugin:
	-  ``` $(#selector).prom({ params });```
	- for the selector, choose any DOM element with id
	- params are optional: if nothing is passed, it will run on every page
  - if you want to exclude a page, added it to the params as in the example below.
      If the string is encountered in the url or in a recommended product, the plugin will not run.
	- ex. ```$(#selector).prom({ doNotRunOn: 'gummies' });```

- Dependencies:
  - Jquery, js-cookie, jquery-modal
