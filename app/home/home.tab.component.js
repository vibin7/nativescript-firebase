"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var services_1 = require("../services");
var HomeTabComponent = (function () {
    function HomeTabComponent(firebaseService) {
        this.firebaseService = firebaseService;
    }
    HomeTabComponent.prototype.ngOnInit = function () {
        this.yowls$ = this.firebaseService.getYowls();
    };
    return HomeTabComponent;
}());
HomeTabComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "home-tab",
        templateUrl: "home.tab.html"
    }),
    __metadata("design:paramtypes", [services_1.FirebaseService])
], HomeTabComponent);
exports.HomeTabComponent = HomeTabComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS50YWIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9tZS50YWIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELHdDQUE4RDtBQU85RCxJQUFhLGdCQUFnQjtJQUV6QiwwQkFDWSxlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFDekMsQ0FBQztJQUlHLG1DQUFRLEdBQWY7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFRLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDdkQsQ0FBQztJQUVMLHVCQUFDO0FBQUQsQ0FBQyxBQVpELElBWUM7QUFaWSxnQkFBZ0I7SUFMNUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixRQUFRLEVBQUUsVUFBVTtRQUNwQixXQUFXLEVBQUUsZUFBZTtLQUMvQixDQUFDO3FDQUkrQiwwQkFBZTtHQUhuQyxnQkFBZ0IsQ0FZNUI7QUFaWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEJhY2tlbmRTZXJ2aWNlLCBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogXCJob21lLXRhYlwiLFxuICAgIHRlbXBsYXRlVXJsOiBcImhvbWUudGFiLmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBIb21lVGFiQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZVxuICAgICkge31cblxuICAgIHB1YmxpYyB5b3dscyQ6IE9ic2VydmFibGU8YW55PjtcbiAgICBcbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMueW93bHMkID0gPGFueT50aGlzLmZpcmViYXNlU2VydmljZS5nZXRZb3dscygpO1xuICAgIH1cblxufSJdfQ==