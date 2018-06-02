"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var services_1 = require("../services");
var models_1 = require("../models");
var router_extensions_1 = require("nativescript-angular/router/router-extensions");
var router_1 = require("@angular/router");
var HomeComponent = (function () {
    function HomeComponent(routerExtensions, firebaseService, router) {
        this.routerExtensions = routerExtensions;
        this.firebaseService = firebaseService;
        this.router = router;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.firebaseService.getMessage();
    };
    HomeComponent.prototype.sendYowl = function () {
        this.yowl = new models_1.Yowl(this.id, this.name, this.username, this.text, this.date, this.UID);
        this.firebaseService.sendYowl(this.yowl).then(function (message) {
            alert(message);
        });
    };
    HomeComponent.prototype.logout = function () {
        this.firebaseService.logout();
        this.routerExtensions.navigate(["/login"], { clearHistory: true });
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "yw-home",
        templateUrl: "home.html"
    }),
    __metadata("design:paramtypes", [router_extensions_1.RouterExtensions,
        services_1.FirebaseService,
        router_1.Router])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RTtBQUd6RSx3Q0FBOEQ7QUFDOUQsb0NBQWlDO0FBQ2pDLG1GQUFpRjtBQUNqRiwwQ0FBeUM7QUFPekMsSUFBYSxhQUFhO0lBWXRCLHVCQUFvQixnQkFBa0MsRUFDMUMsZUFBZ0MsRUFDaEMsTUFBYztRQUZOLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDMUMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDdkIsQ0FBQztJQUVKLGdDQUFRLEdBQVI7UUFDRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGFBQUksQ0FDaEIsSUFBSSxDQUFDLEVBQUUsRUFDUCxJQUFJLENBQUMsSUFBSSxFQUNULElBQUksQ0FBQyxRQUFRLEVBQ2IsSUFBSSxDQUFDLElBQUksRUFDVCxJQUFJLENBQUMsSUFBSSxFQUNULElBQUksQ0FBQyxHQUFHLENBQ1gsQ0FBQTtRQUNDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUFXO1lBQ3RELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFFRCw4QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQUFDLEFBdkNELElBdUNDO0FBdkNZLGFBQWE7SUFMekIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixRQUFRLEVBQUUsU0FBUztRQUNuQixXQUFXLEVBQUUsV0FBVztLQUMzQixDQUFDO3FDQWF3QyxvQ0FBZ0I7UUFDekIsMEJBQWU7UUFDeEIsZUFBTTtHQWRqQixhQUFhLENBdUN6QjtBQXZDWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBCYWNrZW5kU2VydmljZSwgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzXCI7XG5pbXBvcnQgeyBZb3dsIH0gZnJvbSBcIi4uL21vZGVsc1wiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlci9yb3V0ZXItZXh0ZW5zaW9ucyc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiBcInl3LWhvbWVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJob21lLmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHsgXG5cbiAgICBwdWJsaWMgeW93bDogWW93bDtcbiAgICBpZDogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB1c2VybmFtZTogc3RyaW5nO1xuICAgIHRleHQ6IHN0cmluZztcbiAgICBkYXRlOiBzdHJpbmc7XG4gICAgVUlEOiBzdHJpbmdcblxuICAgIHB1YmxpYyB5b3dscyQ6IE9ic2VydmFibGU8YW55PjtcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgIHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcbiAgICApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHsgICAgICAgIFxuICAgICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldE1lc3NhZ2UoKTtcbiAgICB9XG4gICAgXG4gICAgc2VuZFlvd2woKXtcbiAgICAgIHRoaXMueW93bCA9IG5ldyBZb3dsKFxuICAgICAgICAgIHRoaXMuaWQsXG4gICAgICAgICAgdGhpcy5uYW1lLFxuICAgICAgICAgIHRoaXMudXNlcm5hbWUsXG4gICAgICAgICAgdGhpcy50ZXh0LFxuICAgICAgICAgIHRoaXMuZGF0ZSxcbiAgICAgICAgICB0aGlzLlVJRCxcbiAgICAgIClcbiAgICAgICAgdGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VuZFlvd2wodGhpcy55b3dsKS50aGVuKChtZXNzYWdlOmFueSkgPT4ge1xuICAgICAgICAgICAgYWxlcnQobWVzc2FnZSk7XG4gICAgICAgfSkgXG4gICAgfVxuXG4gICAgbG9nb3V0KCkge1xuICAgICAgICB0aGlzLmZpcmViYXNlU2VydmljZS5sb2dvdXQoKTtcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9sb2dpblwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gICAgfVxufVxuXG4iXX0=