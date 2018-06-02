"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var services_1 = require("../services");
require("rxjs/add/operator/do");
var ChatTabComponent = (function () {
    function ChatTabComponent(firebaseService) {
        this.firebaseService = firebaseService;
    }
    ChatTabComponent.prototype.ngOnInit = function () {
        // this.me = BackendService.token;
        // this.chats$ = <any>this.firebaseService.getChats();
        this.scrolling();
    };
    ChatTabComponent.prototype.scrolling = function () {
        var _this = this;
        this.me = services_1.BackendService.token;
        this.chats$ = this.firebaseService.getChats().do(function (chats) {
            _this.list.scrollToIndex(chats.length - 1);
        });
        // this.user$ = <any>this.firebaseService.getUsers().do(
        //     user => {
        //         console.log(user)
        //     }
        // )
    };
    ChatTabComponent.prototype.ngAfterViewInit = function () {
        this.list = this.lv.nativeElement;
        this.textfield = this.tf.nativeElement;
    };
    // scroll(count:number){
    //    console.log("scrolling to ", count)
    //    this.list.scrollToIndex(count-1);
    //    this.list.refresh();
    // }
    ChatTabComponent.prototype.chat = function (message) {
        var _this = this;
        this.firebaseService.chat(message).then(function (data) {
            var count = _this.list.items.length;
            _this.scrolling();
        });
        this.textfield.text = '';
    };
    ChatTabComponent.prototype.filter = function (sender) {
        if (sender == services_1.BackendService.token) {
            return "me";
        }
        else {
            return "them";
        }
    };
    ChatTabComponent.prototype.align = function (sender) {
        if (sender == services_1.BackendService.token) {
            return "right";
        }
        else {
            return "left";
        }
    };
    ChatTabComponent.prototype.showImage = function (sender) {
        if (sender == services_1.BackendService.token) {
            return "collapsed";
        }
        else {
            return "visible";
        }
    };
    return ChatTabComponent;
}());
__decorate([
    core_1.ViewChild("list"),
    __metadata("design:type", core_1.ElementRef)
], ChatTabComponent.prototype, "lv", void 0);
__decorate([
    core_1.ViewChild("textfield"),
    __metadata("design:type", core_1.ElementRef)
], ChatTabComponent.prototype, "tf", void 0);
ChatTabComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "chat-tab",
        templateUrl: "chat.tab.component.html",
        styleUrls: ["chat.tab.component.css"]
    }),
    __metadata("design:paramtypes", [services_1.FirebaseService])
], ChatTabComponent);
exports.ChatTabComponent = ChatTabComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC50YWIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hhdC50YWIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXdGO0FBRXhGLHdDQUE4RDtBQUk5RCxnQ0FBOEI7QUFTOUIsSUFBYSxnQkFBZ0I7SUFVekIsMEJBQ1ksZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBQ3hDLENBQUM7SUFLRSxtQ0FBUSxHQUFmO1FBQ0ksa0NBQWtDO1FBQ2xDLHNEQUFzRDtRQUN0RCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFckIsQ0FBQztJQUNELG9DQUFTLEdBQVQ7UUFBQSxpQkFZSztRQVhELElBQUksQ0FBQyxFQUFFLEdBQUcseUJBQWMsQ0FBQyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBUSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FDckQsVUFBQSxLQUFLO1lBQ0wsS0FBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQ0osQ0FBQTtRQUNELHdEQUF3RDtRQUN4RCxnQkFBZ0I7UUFDaEIsNEJBQTRCO1FBQzVCLFFBQVE7UUFDUixJQUFJO0lBQ0osQ0FBQztJQUVFLDBDQUFlLEdBQXRCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQztRQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDO0lBQzNDLENBQUM7SUFFRCx3QkFBd0I7SUFDeEIseUNBQXlDO0lBQ3pDLHVDQUF1QztJQUN2QywwQkFBMEI7SUFDMUIsSUFBSTtJQUVKLCtCQUFJLEdBQUosVUFBSyxPQUFlO1FBQXBCLGlCQU1DO1FBTEcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBUztZQUM5QyxJQUFJLEtBQUssR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDbkMsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxpQ0FBTSxHQUFOLFVBQU8sTUFBTTtRQUNULEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSx5QkFBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUNmLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUE7UUFDakIsQ0FBQztJQUNMLENBQUM7SUFFRCxnQ0FBSyxHQUFMLFVBQU0sTUFBTTtRQUNSLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSx5QkFBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLE9BQU8sQ0FBQTtRQUNsQixDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixNQUFNLENBQUMsTUFBTSxDQUFBO1FBQ2pCLENBQUM7SUFDTCxDQUFDO0lBQ0Qsb0NBQVMsR0FBVCxVQUFVLE1BQU07UUFDWixFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUkseUJBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxXQUFXLENBQUE7UUFDdEIsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0YsTUFBTSxDQUFDLFNBQVMsQ0FBQTtRQUNwQixDQUFDO0lBQ0wsQ0FBQztJQUVMLHVCQUFDO0FBQUQsQ0FBQyxBQWxGRCxJQWtGQztBQTlFc0I7SUFBbEIsZ0JBQVMsQ0FBQyxNQUFNLENBQUM7OEJBQUssaUJBQVU7NENBQUM7QUFDVjtJQUF2QixnQkFBUyxDQUFDLFdBQVcsQ0FBQzs4QkFBSyxpQkFBVTs0Q0FBQztBQUw5QixnQkFBZ0I7SUFONUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixRQUFRLEVBQUUsVUFBVTtRQUNwQixXQUFXLEVBQUUseUJBQXlCO1FBQ3RDLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixDQUFDO0tBQ3hDLENBQUM7cUNBWStCLDBCQUFlO0dBWG5DLGdCQUFnQixDQWtGNUI7QUFsRlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEFmdGVyVmlld0luaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEJhY2tlbmRTZXJ2aWNlLCBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXNcIjtcbmltcG9ydCB7IExpc3RWaWV3IH0gZnJvbSAndWkvbGlzdC12aWV3JztcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gJ3VpL3RleHQtZmllbGQnO1xuaW1wb3J0IHsgU2Nyb2xsVmlldyB9IGZyb20gJ3VpL3Njcm9sbC12aWV3JztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZG8nO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6IFwiY2hhdC10YWJcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJjaGF0LnRhYi5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiY2hhdC50YWIuY29tcG9uZW50LmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBDaGF0VGFiQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHB1YmxpYyBtZTogU3RyaW5nO1xuICAgIFxuICAgIEBWaWV3Q2hpbGQoXCJsaXN0XCIpIGx2OiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoXCJ0ZXh0ZmllbGRcIikgdGY6IEVsZW1lbnRSZWY7XG5cbiAgICBsaXN0OiBMaXN0VmlldztcbiAgICB0ZXh0ZmllbGQ6IFRleHRGaWVsZDtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZVxuICAgICkgeyB9XG4gICBcblxuICAgIHB1YmxpYyBjaGF0cyQ6IE9ic2VydmFibGU8YW55PjtcbiAgICBwdWJsaWMgdXNlciQ6IE9ic2VydmFibGU8YW55PjtcbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIC8vIHRoaXMubWUgPSBCYWNrZW5kU2VydmljZS50b2tlbjtcbiAgICAgICAgLy8gdGhpcy5jaGF0cyQgPSA8YW55PnRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldENoYXRzKCk7XG4gICAgICAgIHRoaXMuc2Nyb2xsaW5nKCk7XG4gICAgICAgIFxuICAgIH1cbiAgICBzY3JvbGxpbmcoKSB7XG4gICAgICAgIHRoaXMubWUgPSBCYWNrZW5kU2VydmljZS50b2tlbjtcbiAgICAgICAgdGhpcy5jaGF0cyQgPSA8YW55PnRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldENoYXRzKCkuZG8oXG4gICAgICAgIGNoYXRzID0+IHtcbiAgICAgICAgdGhpcy5saXN0LnNjcm9sbFRvSW5kZXgoY2hhdHMubGVuZ3RoLTEpO1xuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgICAgIC8vIHRoaXMudXNlciQgPSA8YW55PnRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldFVzZXJzKCkuZG8oXG4gICAgICAgIC8vICAgICB1c2VyID0+IHtcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyh1c2VyKVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyApXG4gICAgICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMubGlzdCA9IHRoaXMubHYubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy50ZXh0ZmllbGQgPSB0aGlzLnRmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLy8gc2Nyb2xsKGNvdW50Om51bWJlcil7XG4gICAgLy8gICAgY29uc29sZS5sb2coXCJzY3JvbGxpbmcgdG8gXCIsIGNvdW50KVxuICAgIC8vICAgIHRoaXMubGlzdC5zY3JvbGxUb0luZGV4KGNvdW50LTEpO1xuICAgIC8vICAgIHRoaXMubGlzdC5yZWZyZXNoKCk7XG4gICAgLy8gfVxuXG4gICAgY2hhdChtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5maXJlYmFzZVNlcnZpY2UuY2hhdChtZXNzYWdlKS50aGVuKChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGxldCBjb3VudCA9IHRoaXMubGlzdC5pdGVtcy5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbGluZygpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy50ZXh0ZmllbGQudGV4dCA9ICcnOyAgICAgICAgXG4gICAgfVxuXG4gICAgZmlsdGVyKHNlbmRlcikge1xuICAgICAgICBpZiAoc2VuZGVyID09IEJhY2tlbmRTZXJ2aWNlLnRva2VuKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJtZVwiXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXCJ0aGVtXCJcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFsaWduKHNlbmRlcikge1xuICAgICAgICBpZiAoc2VuZGVyID09IEJhY2tlbmRTZXJ2aWNlLnRva2VuKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJyaWdodFwiXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXCJsZWZ0XCJcbiAgICAgICAgfVxuICAgIH1cbiAgICBzaG93SW1hZ2Uoc2VuZGVyKSB7XG4gICAgICAgIGlmIChzZW5kZXIgPT0gQmFja2VuZFNlcnZpY2UudG9rZW4pIHtcbiAgICAgICAgICAgIHJldHVybiBcImNvbGxhcHNlZFwiXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXCJ2aXNpYmxlXCJcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5cblxuIl19