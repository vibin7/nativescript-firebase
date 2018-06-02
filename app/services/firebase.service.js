"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var backend_service_1 = require("./backend.service");
var firebase = require("nativescript-plugin-firebase");
var Observable_1 = require("rxjs/Observable");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
require("rxjs/add/operator/share");
var FirebaseService = (function () {
    function FirebaseService(ngZone) {
        this.ngZone = ngZone;
        this.yowls = new BehaviorSubject_1.BehaviorSubject([]);
        this._allYowls = [];
        this.chats = new BehaviorSubject_1.BehaviorSubject([]);
        this._allChats = [];
        this.users = new BehaviorSubject_1.BehaviorSubject([]);
        this._allUsers = [];
    }
    FirebaseService.prototype.getMessage = function () {
        firebase.addOnMessageReceivedCallback(function (data) {
            alert(JSON.stringify(data));
        });
    };
    FirebaseService.prototype.register = function (user) {
        return firebase.createUser({
            email: user.email,
            password: user.password
        }).then(function (result) {
            console.log(user.email);
            console.log("hhhh", JSON.stringify(result));
            firebase.push("/Users", {
                "username": user.email,
                "uid": result.key
            }).then(function (result) {
                return "saved";
            }, function (errorMessage) {
                alert(errorMessage);
            });
            return JSON.stringify(result);
        }, function (errorMessage) {
            alert(errorMessage);
        });
    };
    FirebaseService.prototype.login = function (user) {
        return firebase.login({
            type: firebase.LoginType.PASSWORD,
            passwordOptions: {
                email: user.email,
                password: user.password
            }
        }).then(function (result) {
            backend_service_1.BackendService.token = result.uid;
            return JSON.stringify(result);
        }, function (errorMessage) {
            alert(errorMessage);
        });
    };
    FirebaseService.prototype.logout = function () {
        backend_service_1.BackendService.token = "";
        firebase.logout();
    };
    FirebaseService.prototype.resetPassword = function (email) {
        return firebase.resetPassword({
            email: email
        }).then(function (result) {
            alert(JSON.stringify(result));
        }, function (errorMessage) {
            alert(errorMessage);
        }).catch(this.handleErrors);
    };
    FirebaseService.prototype.getYowls = function () {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            var path = 'Yowls';
            var onValueEvent = function (snapshot) {
                _this.ngZone.run(function () {
                    var results = _this.handleSnapshot(snapshot.value);
                    observer.next(results);
                });
            };
            firebase.addValueEventListener(onValueEvent, "/" + path);
        }).share();
    };
    FirebaseService.prototype.handleSnapshot = function (data) {
        //empty array, then refill and filter
        this._allYowls = [];
        if (data) {
            for (var id in data) {
                var result = Object.assign({ id: id }, data[id]);
                this._allYowls.push(result);
            }
            this.publishUpdates();
        }
        return this._allYowls;
    };
    FirebaseService.prototype.getChats = function (to_uid) {
        var _this = this;
        if (to_uid === void 0) { to_uid = "yuI6FRoOMaNZZRZgDk17taARKWp2"; }
        return new Observable_1.Observable(function (observer) {
            if (backend_service_1.BackendService.token < to_uid) {
                _this.first_uid = backend_service_1.BackendService.token;
                _this.second_uid = to_uid;
            }
            else {
                _this.first_uid = to_uid;
                _this.second_uid = backend_service_1.BackendService.token;
            }
            console.log("alphabetically sorted", _this.first_uid, _this.second_uid);
            var path = _this.first_uid + _this.second_uid;
            var onValueEvent = function (snapshot) {
                _this.ngZone.run(function () {
                    var results = _this.handleChatSnapshot(snapshot.value);
                    // console.log("",JSON.stringify(results));
                    observer.next(results);
                });
            };
            firebase.addValueEventListener(onValueEvent, "/" + path);
        }).share();
    };
    FirebaseService.prototype.handleChatSnapshot = function (data) {
        console.log(data);
        //empty array, then refill and filter
        this._allChats = [];
        if (data) {
            for (var id in data) {
                var result = Object.assign({ id: id }, data[id]);
                // console.log(JSON.stringify(result))
                this._allChats.push(result);
            }
            this.publishChatUpdates();
        }
        return this._allChats;
    };
    // getUsers(): Observable<any> {
    //   return new Observable((observer: any) => {
    //     let path = 'Users';
    //     console.log("Inside obser")
    //       let onValueEvent = (snapshot: any) => {
    //         console.log("Inside onvalueEvent")
    //         this.ngZone.run(() => {
    //           console.log("Inside ngZone")
    //           let results = this.handleUsersSnapshot(snapshot.value);
    //           console.log("Inside getUsers")
    //           console.log("users", JSON.stringify(results));
    //             observer.next(results);
    //         });
    //       };
    //       firebase.addValueEventListener(onValueEvent, `/${path}`)
    //   }).share();
    // }
    // handleUsersSnapshot(data: any) {
    //   this._allUsers = [];
    //   if (data) {
    //     for (let id in data) {
    //       let user = (<any>Object).assign({id: id}, data[id]);
    //         this._allUsers.push(user);
    //     }
    //     this.publishUserUpdates();
    //   }
    //   return this._allUsers;
    // }
    FirebaseService.prototype.sendYowl = function (Yowl) {
        var yowl = Yowl;
        return firebase.push("/Yowls", { "name": "Mr. Growlllr", "username": "MrGrwwlr", "text": "Yooowwwwlll!", "UID": backend_service_1.BackendService.token, "date": 0 - Date.now() }).then(function (result) {
            return 'Yowwled!';
        }, function (errorMessage) {
            console.log(errorMessage);
        });
    };
    FirebaseService.prototype.chat = function (message, to_uid) {
        //let chat = Chat; 
        if (to_uid === void 0) { to_uid = "yuI6FRoOMaNZZRZgDk17taARKWp2"; }
        console.log("tooooken", backend_service_1.BackendService.token);
        if (backend_service_1.BackendService.token < to_uid) {
            this.first_uid = backend_service_1.BackendService.token;
            this.second_uid = to_uid;
        }
        else {
            this.first_uid = to_uid;
            this.second_uid = backend_service_1.BackendService.token;
        }
        console.log("alphabetically sorted", this.first_uid, this.second_uid);
        var path = this.first_uid + this.second_uid;
        console.log(message);
        return firebase.push("/" + path, { "message": message, "to": to_uid, "from": backend_service_1.BackendService.token, "date": 0 - Date.now() }).then(function (result) {
            return "chatted";
        }, function (errorMessage) {
            console.log(errorMessage);
        });
    };
    FirebaseService.prototype.publishUpdates = function () {
        this._allYowls.sort(function (a, b) {
            if (a.date < b.date)
                return -1;
            if (a.date > b.date)
                return 1;
            return 0;
        });
        this.yowls.next(this._allYowls.slice());
    };
    FirebaseService.prototype.publishChatUpdates = function () {
        this._allChats.sort(function (a, b) {
            if (a.date > b.date)
                return -1;
            if (a.date < b.date)
                return 1;
            return 0;
        });
        this.chats.next(this._allChats.slice());
    };
    FirebaseService.prototype.publishUserUpdates = function () {
        this._allUsers.sort(function (a, b) {
            if (a.date > b.date)
                return -1;
            if (a.date < b.date)
                return 1;
            return 0;
        });
        this.users.next(this._allUsers.slice());
    };
    FirebaseService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error));
        return Promise.reject(error.message);
    };
    return FirebaseService;
}());
FirebaseService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_1.NgZone])
], FirebaseService);
exports.FirebaseService = FirebaseService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmViYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBaUQ7QUFFakQscURBQW1EO0FBQ25ELHVEQUEwRDtBQUMxRCw4Q0FBMkM7QUFDM0Msd0RBQXFEO0FBQ3JELG1DQUFpQztBQUdqQyxJQUFhLGVBQWU7SUFDMUIseUJBQ1UsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFJMUIsVUFBSyxHQUFpQyxJQUFJLGlDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEQsY0FBUyxHQUFnQixFQUFFLENBQUM7UUFDcEMsVUFBSyxHQUFpQyxJQUFJLGlDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEQsY0FBUyxHQUFnQixFQUFFLENBQUM7UUFDcEMsVUFBSyxHQUFnQyxJQUFJLGlDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckQsY0FBUyxHQUFlLEVBQUUsQ0FBQTtJQVI5QixDQUFDO0lBWUgsb0NBQVUsR0FBVjtRQUNFLFFBQVEsQ0FBQyw0QkFBNEIsQ0FBQyxVQUFVLElBQUk7WUFDaEQsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxrQ0FBUSxHQUFSLFVBQVMsSUFBVTtRQUNqQixNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztZQUN6QixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQ3hCLENBQUMsQ0FBQyxJQUFJLENBQ0QsVUFBVSxNQUFVO1lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxD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QztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQTNQRCxJQTJQQztBQTNQWSxlQUFlO0lBRDNCLGlCQUFVLEVBQUU7cUNBR08sYUFBTTtHQUZiLGVBQWUsQ0EyUDNCO0FBM1BZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBOZ1pvbmV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1VzZXIsIFlvd2wsIENoYXR9IGZyb20gXCIuLi9tb2RlbHNcIjtcbmltcG9ydCB7IEJhY2tlbmRTZXJ2aWNlIH0gZnJvbSBcIi4vYmFja2VuZC5zZXJ2aWNlXCI7XG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0fSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3NoYXJlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZpcmViYXNlU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICl7fVxuXG5cbnlvd2xzOiBCZWhhdmlvclN1YmplY3Q8QXJyYXk8WW93bD4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XG5wcml2YXRlIF9hbGxZb3dsczogQXJyYXk8WW93bD4gPSBbXTtcbmNoYXRzOiBCZWhhdmlvclN1YmplY3Q8QXJyYXk8WW93bD4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XG5wcml2YXRlIF9hbGxDaGF0czogQXJyYXk8WW93bD4gPSBbXTtcbnVzZXJzOiBCZWhhdmlvclN1YmplY3Q8QXJyYXk8YW55Pj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcbnByaXZhdGUgX2FsbFVzZXJzOiBBcnJheTxhbnk+ID0gW11cbnByaXZhdGUgZmlyc3RfdWlkO1xucHJpdmF0ZSBzZWNvbmRfdWlkO1xuXG4gIGdldE1lc3NhZ2UoKXsgXG4gICAgZmlyZWJhc2UuYWRkT25NZXNzYWdlUmVjZWl2ZWRDYWxsYmFjayhmdW5jdGlvbiAoZGF0YSApe1xuICAgICAgICBhbGVydChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgfSlcbiAgfVxuXG4gIHJlZ2lzdGVyKHVzZXI6IFVzZXIpIHtcbiAgICByZXR1cm4gZmlyZWJhc2UuY3JlYXRlVXNlcih7XG4gICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgIHBhc3N3b3JkOiB1c2VyLnBhc3N3b3JkXG4gICAgfSkudGhlbihcbiAgICAgICAgICBmdW5jdGlvbiAocmVzdWx0OmFueSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2codXNlci5lbWFpbCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhoaGhcIiwgSlNPTi5zdHJpbmdpZnkocmVzdWx0KSlcbiAgICAgICAgICAgIGZpcmViYXNlLnB1c2goXG4gICAgICAgICAgICAgIFwiL1VzZXJzXCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInVzZXJuYW1lXCI6IHVzZXIuZW1haWwsXG4gICAgICAgICAgICAgICAgXCJ1aWRcIjogcmVzdWx0LmtleVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICkudGhlbihcbiAgICAgICAgICAgICAgZnVuY3Rpb24ocmVzdWx0OiBhbnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzYXZlZFwiO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBmdW5jdGlvbiAoZXJyb3JNZXNzYWdlOiBhbnkpIHtcbiAgICAgICAgICAgICAgICBhbGVydChlcnJvck1lc3NhZ2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZ1bmN0aW9uIChlcnJvck1lc3NhZ2U6YW55KSB7XG4gICAgICAgICAgICBhbGVydChlcnJvck1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgIClcbiAgfVxuXG4gIGxvZ2luKHVzZXI6IFVzZXIpIHtcbiAgICByZXR1cm4gZmlyZWJhc2UubG9naW4oe1xuICAgICAgdHlwZTogZmlyZWJhc2UuTG9naW5UeXBlLlBBU1NXT1JELFxuICAgICAgcGFzc3dvcmRPcHRpb25zOiB7XG4gICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICBwYXNzd29yZDogdXNlci5wYXNzd29yZFxuICAgICAgfVxuICAgIH0pLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgQmFja2VuZFNlcnZpY2UudG9rZW4gPSByZXN1bHQudWlkO1xuICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xuICAgICAgfSwgKGVycm9yTWVzc2FnZTogYW55KSA9PiB7XG4gICAgICAgIGFsZXJ0KGVycm9yTWVzc2FnZSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGxvZ291dCgpe1xuICAgIEJhY2tlbmRTZXJ2aWNlLnRva2VuID0gXCJcIjtcbiAgICBmaXJlYmFzZS5sb2dvdXQoKTsgICAgXG4gIH1cbiAgXG4gIHJlc2V0UGFzc3dvcmQoZW1haWwpIHtcbiAgICByZXR1cm4gZmlyZWJhc2UucmVzZXRQYXNzd29yZCh7XG4gICAgZW1haWw6IGVtYWlsXG4gICAgfSkudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICBhbGVydChKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24gKGVycm9yTWVzc2FnZTphbnkpIHtcbiAgICAgICAgICBhbGVydChlcnJvck1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgKS5jYXRjaCh0aGlzLmhhbmRsZUVycm9ycyk7XG4gIH0gIFxuXG4gZ2V0WW93bHMoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBhbnkpID0+IHtcbiAgICAgIGxldCBwYXRoID0gJ1lvd2xzJztcbiAgICAgIFxuICAgICAgICBsZXQgb25WYWx1ZUV2ZW50ID0gKHNuYXBzaG90OiBhbnkpID0+IHtcbiAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlc3VsdHMgPSB0aGlzLmhhbmRsZVNuYXBzaG90KHNuYXBzaG90LnZhbHVlKTtcbiAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlc3VsdHMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBmaXJlYmFzZS5hZGRWYWx1ZUV2ZW50TGlzdGVuZXIob25WYWx1ZUV2ZW50LCBgLyR7cGF0aH1gKTtcbiAgICB9KS5zaGFyZSgpOyAgICAgICAgICAgICAgXG4gIH1cblxuICBoYW5kbGVTbmFwc2hvdChkYXRhOiBhbnkpIHtcbiAgICAvL2VtcHR5IGFycmF5LCB0aGVuIHJlZmlsbCBhbmQgZmlsdGVyXG4gICAgdGhpcy5fYWxsWW93bHMgPSBbXTtcbiAgICBpZiAoZGF0YSkge1xuICAgICAgZm9yIChsZXQgaWQgaW4gZGF0YSkgeyAgICAgICAgXG4gICAgICAgIGxldCByZXN1bHQgPSAoPGFueT5PYmplY3QpLmFzc2lnbih7aWQ6IGlkfSwgZGF0YVtpZF0pO1xuICAgICAgICAgIHRoaXMuX2FsbFlvd2xzLnB1c2gocmVzdWx0KTtcbiAgICAgIH1cbiAgICAgIHRoaXMucHVibGlzaFVwZGF0ZXMoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2FsbFlvd2xzO1xuICB9XG5cbiAgZ2V0Q2hhdHMoIHRvX3VpZCA9IFwieXVJNkZSb09NYU5aWlJaZ0RrMTd0YUFSS1dwMlwiICk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogYW55KSA9PiB7XG4gICAgICBpZihCYWNrZW5kU2VydmljZS50b2tlbiA8IHRvX3VpZCkge1xuICAgICAgICB0aGlzLmZpcnN0X3VpZCA9IEJhY2tlbmRTZXJ2aWNlLnRva2VuO1xuICAgICAgICB0aGlzLnNlY29uZF91aWQgPSB0b191aWQ7XG4gICAgICB9ZWxzZSB7XG4gICAgICAgIHRoaXMuZmlyc3RfdWlkID0gdG9fdWlkO1xuICAgICAgICB0aGlzLnNlY29uZF91aWQgPSBCYWNrZW5kU2VydmljZS50b2tlbjtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKFwiYWxwaGFiZXRpY2FsbHkgc29ydGVkXCIsIHRoaXMuZmlyc3RfdWlkLCB0aGlzLnNlY29uZF91aWQpO1xuICAgICAgbGV0IHBhdGggPSB0aGlzLmZpcnN0X3VpZCArIHRoaXMuc2Vjb25kX3VpZDsgICAgICBcbiAgICAgICAgbGV0IG9uVmFsdWVFdmVudCA9IChzbmFwc2hvdDogYW55KSA9PiB7XG4gICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIGxldCByZXN1bHRzID0gdGhpcy5oYW5kbGVDaGF0U25hcHNob3Qoc25hcHNob3QudmFsdWUpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJcIixKU09OLnN0cmluZ2lmeShyZXN1bHRzKSk7XG4gICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXN1bHRzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgZmlyZWJhc2UuYWRkVmFsdWVFdmVudExpc3RlbmVyKG9uVmFsdWVFdmVudCwgYC8ke3BhdGh9YCk7XG4gICAgfSkuc2hhcmUoKTsgICAgICAgICAgICAgIFxuICB9XG5cbiAgaGFuZGxlQ2hhdFNuYXBzaG90KGRhdGE6IGFueSkge1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIC8vZW1wdHkgYXJyYXksIHRoZW4gcmVmaWxsIGFuZCBmaWx0ZXJcbiAgICB0aGlzLl9hbGxDaGF0cyA9IFtdO1xuICAgIGlmIChkYXRhKSB7XG4gICAgICBmb3IgKGxldCBpZCBpbiBkYXRhKSB7ICAgICAgICBcbiAgICAgICAgbGV0IHJlc3VsdCA9ICg8YW55Pk9iamVjdCkuYXNzaWduKHtpZDogaWR9LCBkYXRhW2lkXSk7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0KSlcbiAgICAgICAgICB0aGlzLl9hbGxDaGF0cy5wdXNoKHJlc3VsdCk7XG4gICAgICB9XG4gICAgICB0aGlzLnB1Ymxpc2hDaGF0VXBkYXRlcygpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fYWxsQ2hhdHM7XG4gIH1cblxuICAvLyBnZXRVc2VycygpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAvLyAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IGFueSkgPT4ge1xuICAvLyAgICAgbGV0IHBhdGggPSAnVXNlcnMnO1xuICAvLyAgICAgY29uc29sZS5sb2coXCJJbnNpZGUgb2JzZXJcIilcbiAgLy8gICAgICAgbGV0IG9uVmFsdWVFdmVudCA9IChzbmFwc2hvdDogYW55KSA9PiB7XG4gIC8vICAgICAgICAgY29uc29sZS5sb2coXCJJbnNpZGUgb252YWx1ZUV2ZW50XCIpXG4gICAgICAgICAgXG4gIC8vICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgLy8gICAgICAgICAgIGNvbnNvbGUubG9nKFwiSW5zaWRlIG5nWm9uZVwiKVxuICAgICAgICAgICAgXG4gIC8vICAgICAgICAgICBsZXQgcmVzdWx0cyA9IHRoaXMuaGFuZGxlVXNlcnNTbmFwc2hvdChzbmFwc2hvdC52YWx1ZSk7XG4gIC8vICAgICAgICAgICBjb25zb2xlLmxvZyhcIkluc2lkZSBnZXRVc2Vyc1wiKVxuICAvLyAgICAgICAgICAgY29uc29sZS5sb2coXCJ1c2Vyc1wiLCBKU09OLnN0cmluZ2lmeShyZXN1bHRzKSk7XG4gIC8vICAgICAgICAgICAgIG9ic2VydmVyLm5leHQocmVzdWx0cyk7XG4gIC8vICAgICAgICAgfSk7XG4gIC8vICAgICAgIH07XG4gIC8vICAgICAgIGZpcmViYXNlLmFkZFZhbHVlRXZlbnRMaXN0ZW5lcihvblZhbHVlRXZlbnQsIGAvJHtwYXRofWApXG4gIC8vICAgfSkuc2hhcmUoKTtcbiAgLy8gfVxuICAvLyBoYW5kbGVVc2Vyc1NuYXBzaG90KGRhdGE6IGFueSkge1xuICAvLyAgIHRoaXMuX2FsbFVzZXJzID0gW107XG4gIC8vICAgaWYgKGRhdGEpIHtcbiAgLy8gICAgIGZvciAobGV0IGlkIGluIGRhdGEpIHtcbiAgLy8gICAgICAgbGV0IHVzZXIgPSAoPGFueT5PYmplY3QpLmFzc2lnbih7aWQ6IGlkfSwgZGF0YVtpZF0pO1xuICAvLyAgICAgICAgIHRoaXMuX2FsbFVzZXJzLnB1c2godXNlcik7XG4gIC8vICAgICB9XG4gIC8vICAgICB0aGlzLnB1Ymxpc2hVc2VyVXBkYXRlcygpO1xuICAvLyAgIH1cbiAgLy8gICByZXR1cm4gdGhpcy5fYWxsVXNlcnM7XG4gIC8vIH1cbiAgXG5cbiAgc2VuZFlvd2woWW93bDphbnkpIHtcbiAgICBsZXQgeW93bCA9IFlvd2w7ICAgXG4gICAgcmV0dXJuIGZpcmViYXNlLnB1c2goXG4gICAgICAgIFwiL1lvd2xzXCIsXG4gICAgICAgIHsgXCJuYW1lXCI6IFwiTXIuIEdyb3dsbGxyXCIsIFwidXNlcm5hbWVcIjogXCJNckdyd3dsclwiLCBcInRleHRcIjogXCJZb29vd3d3d2xsbCFcIiwgXCJVSURcIjogQmFja2VuZFNlcnZpY2UudG9rZW4sIFwiZGF0ZVwiOiAwIC0gRGF0ZS5ub3coKX1cbiAgICAgICkudGhlbihcbiAgICAgICAgZnVuY3Rpb24gKHJlc3VsdDphbnkpIHtcbiAgICAgICAgICByZXR1cm4gJ1lvd3dsZWQhJztcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24gKGVycm9yTWVzc2FnZTphbnkpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvck1lc3NhZ2UpO1xuICAgICAgICB9KTsgXG4gIH1cblxuICBjaGF0KG1lc3NhZ2U6c3RyaW5nLCB0b191aWQgPSBcInl1STZGUm9PTWFOWlpSWmdEazE3dGFBUktXcDJcIikge1xuICAgIC8vbGV0IGNoYXQgPSBDaGF0OyBcblxuICAgIGNvbnNvbGUubG9nKFwidG9vb29rZW5cIiwgQmFja2VuZFNlcnZpY2UudG9rZW4pXG4gICAgaWYoQmFja2VuZFNlcnZpY2UudG9rZW4gPCB0b191aWQpIHtcbiAgICAgIHRoaXMuZmlyc3RfdWlkID0gQmFja2VuZFNlcnZpY2UudG9rZW47XG4gICAgICB0aGlzLnNlY29uZF91aWQgPSB0b191aWQ7XG4gICAgfWVsc2Uge1xuICAgICAgdGhpcy5maXJzdF91aWQgPSB0b191aWQ7XG4gICAgICB0aGlzLnNlY29uZF91aWQgPSBCYWNrZW5kU2VydmljZS50b2tlbjtcbiAgICB9XG4gICAgY29uc29sZS5sb2coXCJhbHBoYWJldGljYWxseSBzb3J0ZWRcIiwgdGhpcy5maXJzdF91aWQsIHRoaXMuc2Vjb25kX3VpZCk7XG4gICAgbGV0IHBhdGggPSB0aGlzLmZpcnN0X3VpZCArIHRoaXMuc2Vjb25kX3VpZDtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKSAgXG4gICAgcmV0dXJuIGZpcmViYXNlLnB1c2goXG4gICAgICBgLyR7cGF0aH1gLFxuICAgICAgICB7IFwibWVzc2FnZVwiOiBtZXNzYWdlLCBcInRvXCI6IHRvX3VpZCwgXCJmcm9tXCI6IEJhY2tlbmRTZXJ2aWNlLnRva2VuLCBcImRhdGVcIjogMCAtIERhdGUubm93KCl9XG4gICAgICApLnRoZW4oXG4gICAgICAgIGZ1bmN0aW9uIChyZXN1bHQ6YW55KSB7XG4gICAgICAgICAgcmV0dXJuIFwiY2hhdHRlZFwiO1xuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbiAoZXJyb3JNZXNzYWdlOmFueSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yTWVzc2FnZSk7XG4gICAgICAgIH0pOyBcbiAgfVxuXG4gICBwdWJsaXNoVXBkYXRlcygpIHtcbiAgICB0aGlzLl9hbGxZb3dscy5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgICBpZihhLmRhdGUgPCBiLmRhdGUpIHJldHVybiAtMTtcbiAgICAgICAgaWYoYS5kYXRlID4gYi5kYXRlKSByZXR1cm4gMTtcbiAgICAgIHJldHVybiAwO1xuICAgIH0pXG4gICAgdGhpcy55b3dscy5uZXh0KFsuLi50aGlzLl9hbGxZb3dsc10pO1xuICB9XG5cbiAgcHVibGlzaENoYXRVcGRhdGVzKCkge1xuICAgIHRoaXMuX2FsbENoYXRzLnNvcnQoZnVuY3Rpb24oYSwgYil7XG4gICAgICAgIGlmKGEuZGF0ZSA+IGIuZGF0ZSkgcmV0dXJuIC0xO1xuICAgICAgICBpZihhLmRhdGUgPCBiLmRhdGUpIHJldHVybiAxO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSlcbiAgICB0aGlzLmNoYXRzLm5leHQoWy4uLnRoaXMuX2FsbENoYXRzXSk7XG4gIH1cblxuICBwdWJsaXNoVXNlclVwZGF0ZXMoKSB7XG4gICAgdGhpcy5fYWxsVXNlcnMuc29ydChmdW5jdGlvbihhLGIpe1xuICAgICAgaWYoYS5kYXRlID4gYi5kYXRlKSByZXR1cm4gLTE7XG4gICAgICBpZihhLmRhdGUgPCBiLmRhdGUpIHJldHVybiAxO1xuICAgIHJldHVybiAwO1xuICAgIH0pXG4gICAgdGhpcy51c2Vycy5uZXh0KFsuLi50aGlzLl9hbGxVc2Vyc10pO1xuICB9XG5cbiAgaGFuZGxlRXJyb3JzKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IubWVzc2FnZSk7XG4gIH1cbn0iXX0=