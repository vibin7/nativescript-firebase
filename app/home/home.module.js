"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var core_1 = require("@angular/core");
var forms_1 = require("nativescript-angular/forms");
var nativescript_ngx_fonticon_1 = require("nativescript-ngx-fonticon");
var home_routes_1 = require("./home.routes");
var home_component_1 = require("./home.component");
var chat_tab_component_1 = require("../chat/chat.tab.component");
var HomeModule = (function () {
    function HomeModule() {
    }
    return HomeModule;
}());
HomeModule = __decorate([
    core_1.NgModule({
        imports: [
            nativescript_module_1.NativeScriptModule,
            forms_1.NativeScriptFormsModule,
            home_routes_1.homeRouting,
            nativescript_ngx_fonticon_1.TNSFontIconModule.forRoot({
                'fa': 'fonts/font-awesome.css'
            }),
        ],
        declarations: [
            home_component_1.HomeComponent,
            chat_tab_component_1.ChatTabComponent
        ]
    })
], HomeModule);
exports.HomeModule = HomeModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGdGQUE4RTtBQUM5RSxzQ0FBeUM7QUFDekMsb0RBQXFFO0FBQ3JFLHVFQUFzSDtBQUN0SCw2Q0FBNEM7QUFDNUMsbURBQWlEO0FBRWpELGlFQUE4RDtBQWdCOUQsSUFBYSxVQUFVO0lBQXZCO0lBQXlCLENBQUM7SUFBRCxpQkFBQztBQUFELENBQUMsQUFBMUIsSUFBMEI7QUFBYixVQUFVO0lBZHRCLGVBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRTtZQUNQLHdDQUFrQjtZQUNsQiwrQkFBdUI7WUFDdkIseUJBQVc7WUFDWCw2Q0FBaUIsQ0FBQyxPQUFPLENBQUM7Z0JBQ3hCLElBQUksRUFBRSx3QkFBd0I7YUFDL0IsQ0FBQztTQUNIO1FBQ0QsWUFBWSxFQUFFO1lBQ1osOEJBQWE7WUFDYixxQ0FBZ0I7U0FDakI7S0FDRixDQUFDO0dBQ1csVUFBVSxDQUFHO0FBQWIsZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7VE5TRm9udEljb25Nb2R1bGUsIFROU0ZvbnRJY29uU2VydmljZSwgVE5TRm9udEljb25QaXBlLCBUTlNGb250SWNvblB1cmVQaXBlfSBmcm9tICduYXRpdmVzY3JpcHQtbmd4LWZvbnRpY29uJztcbmltcG9ydCB7IGhvbWVSb3V0aW5nIH0gZnJvbSBcIi4vaG9tZS5yb3V0ZXNcIjtcbmltcG9ydCB7IEhvbWVDb21wb25lbnQgfSBmcm9tIFwiLi9ob21lLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgSG9tZVRhYkNvbXBvbmVudCB9IGZyb20gJy4vaG9tZS50YWIuY29tcG9uZW50JztcbmltcG9ydCB7IENoYXRUYWJDb21wb25lbnQgfSBmcm9tICcuLi9jaGF0L2NoYXQudGFiLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgaG9tZVJvdXRpbmcsXG4gICAgVE5TRm9udEljb25Nb2R1bGUuZm9yUm9vdCh7XG4gICAgICAnZmEnOiAnZm9udHMvZm9udC1hd2Vzb21lLmNzcydcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbICAgIFxuICAgIEhvbWVDb21wb25lbnQsXG4gICAgQ2hhdFRhYkNvbXBvbmVudCAgICBcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBIb21lTW9kdWxlIHt9Il19