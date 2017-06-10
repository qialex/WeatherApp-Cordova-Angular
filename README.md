Angular 1.2 - WeatherApp
====================

Author: [Alexander Ishchenko](http://qialex.me)

WeatherApp cordova angular 1.2 application

The main feature of the application is architecture.
Async actions like getting coords and Rest are not involved in any directive.
Async actions abstract and isolated in services.
Services provided public properties that can be used anywhere.
No async actions in directives.
Directives is to show something to user and to get something from them. Nothing else.
Directives should not be bound on any async action.
Directives can initialize some action that might be async, but directive must work with existing data, not with promises.

Licence - MIT

https://github.com/qialex/WeatherApp-Cordova-Angular/blob/master/weatherapp.apk - apk file