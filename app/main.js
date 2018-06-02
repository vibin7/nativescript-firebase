"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// this import should be first in order to load some required settings (like globals and reflect-metadata)
var platform_1 = require("nativescript-angular/platform");
var app_module_1 = require("./app.module");
var backend_service_1 = require("./services/backend.service");
var dialogs = require("ui/dialogs");
var firebase = require("nativescript-plugin-firebase");
firebase.init({
    /*onPushTokenReceivedCallback: function(token) {
      alert("Firebase push token: " + token);
    },
    onMessageReceivedCallback: function(message) {
      dialogs.alert({
        title: "Push message: " + (message.title !== undefined ? message.title : ""),
        message: JSON.stringify(message.body),
        okButtonText: "W00t!"
      });
    },*/
    //persist should be set to false as otherwise numbers aren't returned during livesync
    persist: false,
    //storageBucket: 'gs://yowwlr.appspot.com',
    onAuthStateChanged: function (data) {
        if (data.loggedIn) {
            backend_service_1.BackendService.token = data.user.uid;
        }
        else {
            backend_service_1.BackendService.token = "";
        }
    }
}).then(function (instance) {
    console.log("firebase.init done");
}, function (error) {
    console.log("firebase.init error: " + error);
});
platform_1.platformNativeScriptDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwR0FBMEc7QUFDMUcsMERBQTRFO0FBRTVFLDJDQUF5QztBQUN6Qyw4REFBNEQ7QUFDNUQsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3RDLHVEQUEwRDtBQUV6RCxRQUFRLENBQUMsSUFBSSxDQUFDO0lBQ1o7Ozs7Ozs7OztRQVNJO0lBQ0oscUZBQXFGO0lBQ3JGLE9BQU8sRUFBRSxLQUFLO0lBQ2QsMkNBQTJDO0lBQzNDLGtCQUFrQixFQUFFLFVBQUMsSUFBUztRQUM1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsQixnQ0FBYyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUN2QyxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDSixnQ0FBYyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDNUIsQ0FBQztJQUNILENBQUM7Q0FDRixDQUFDLENBQUMsSUFBSSxDQUNILFVBQVUsUUFBUTtJQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDcEMsQ0FBQyxFQUNELFVBQVUsS0FBSztJQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEdBQUcsS0FBSyxDQUFDLENBQUM7QUFDL0MsQ0FBQyxDQUNKLENBQUM7QUFFSCxzQ0FBMkIsRUFBRSxDQUFDLGVBQWUsQ0FBQyxzQkFBUyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0aGlzIGltcG9ydCBzaG91bGQgYmUgZmlyc3QgaW4gb3JkZXIgdG8gbG9hZCBzb21lIHJlcXVpcmVkIHNldHRpbmdzIChsaWtlIGdsb2JhbHMgYW5kIHJlZmxlY3QtbWV0YWRhdGEpXG5pbXBvcnQgeyBwbGF0Zm9ybU5hdGl2ZVNjcmlwdER5bmFtaWMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcGxhdGZvcm1cIjtcblxuaW1wb3J0IHsgQXBwTW9kdWxlIH0gZnJvbSBcIi4vYXBwLm1vZHVsZVwiO1xuaW1wb3J0IHsgQmFja2VuZFNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9iYWNrZW5kLnNlcnZpY2VcIjtcbmNvbnN0IGRpYWxvZ3MgPSByZXF1aXJlKFwidWkvZGlhbG9nc1wiKTtcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuXG4gZmlyZWJhc2UuaW5pdCh7XG4gICAvKm9uUHVzaFRva2VuUmVjZWl2ZWRDYWxsYmFjazogZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgYWxlcnQoXCJGaXJlYmFzZSBwdXNoIHRva2VuOiBcIiArIHRva2VuKTtcbiAgIH0sXG4gICBvbk1lc3NhZ2VSZWNlaXZlZENhbGxiYWNrOiBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgIHRpdGxlOiBcIlB1c2ggbWVzc2FnZTogXCIgKyAobWVzc2FnZS50aXRsZSAhPT0gdW5kZWZpbmVkID8gbWVzc2FnZS50aXRsZSA6IFwiXCIpLFxuICAgICAgIG1lc3NhZ2U6IEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UuYm9keSksXG4gICAgICAgb2tCdXR0b25UZXh0OiBcIlcwMHQhXCJcbiAgICAgfSk7XG4gICB9LCovXG4gICAvL3BlcnNpc3Qgc2hvdWxkIGJlIHNldCB0byBmYWxzZSBhcyBvdGhlcndpc2UgbnVtYmVycyBhcmVuJ3QgcmV0dXJuZWQgZHVyaW5nIGxpdmVzeW5jXG4gICBwZXJzaXN0OiBmYWxzZSxcbiAgIC8vc3RvcmFnZUJ1Y2tldDogJ2dzOi8veW93d2xyLmFwcHNwb3QuY29tJyxcbiAgIG9uQXV0aFN0YXRlQ2hhbmdlZDogKGRhdGE6IGFueSkgPT4ge1xuICAgICBpZiAoZGF0YS5sb2dnZWRJbikge1xuICAgICAgIEJhY2tlbmRTZXJ2aWNlLnRva2VuID0gZGF0YS51c2VyLnVpZDtcbiAgICAgfVxuICAgICBlbHNlIHtcbiAgICAgICBCYWNrZW5kU2VydmljZS50b2tlbiA9IFwiXCI7XG4gICAgIH1cbiAgIH1cbiB9KS50aGVuKFxuICAgICBmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgICAgICBjb25zb2xlLmxvZyhcImZpcmViYXNlLmluaXQgZG9uZVwiKTtcbiAgICAgfSxcbiAgICAgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgY29uc29sZS5sb2coXCJmaXJlYmFzZS5pbml0IGVycm9yOiBcIiArIGVycm9yKTtcbiAgICAgfVxuICk7XG5cbnBsYXRmb3JtTmF0aXZlU2NyaXB0RHluYW1pYygpLmJvb3RzdHJhcE1vZHVsZShBcHBNb2R1bGUpOyJdfQ==