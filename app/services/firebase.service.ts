import {Injectable, NgZone} from "@angular/core";
import {User, Yowl, Chat} from "../models";
import { BackendService } from "./backend.service";
import firebase = require("nativescript-plugin-firebase");
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/share';

@Injectable()
export class FirebaseService {
  constructor(
    private ngZone: NgZone,
  ){}


yowls: BehaviorSubject<Array<Yowl>> = new BehaviorSubject([]);
private _allYowls: Array<Yowl> = [];
chats: BehaviorSubject<Array<Yowl>> = new BehaviorSubject([]);
private _allChats: Array<Yowl> = [];
users: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
private _allUsers: Array<any> = []
private first_uid;
private second_uid;

  getMessage(){ 
    firebase.addOnMessageReceivedCallback(function (data ){
        alert(JSON.stringify(data));
    })
  }

  register(user: User) {
    return firebase.createUser({
      email: user.email,
      password: user.password
    }).then(
          function (result:any) {
            console.log(user.email);
            console.log("hhhh", JSON.stringify(result))
            firebase.push(
              "/Users",
              {
                "username": user.email,
                "uid": result.key
              }

            ).then(
              function(result: any) {
                return "saved";
              },
              function (errorMessage: any) {
                alert(errorMessage);
              }
            )
            return JSON.stringify(result);
          },
          function (errorMessage:any) {
            alert(errorMessage);
          }
      )
  }

  login(user: User) {
    return firebase.login({
      type: firebase.LoginType.PASSWORD,
      passwordOptions: {
        email: user.email,
        password: user.password
      }
    }).then((result: any) => {
          BackendService.token = result.uid;
          return JSON.stringify(result);
      }, (errorMessage: any) => {
        alert(errorMessage);
      });
  }

  logout(){
    BackendService.token = "";
    firebase.logout();    
  }
  
  resetPassword(email) {
    return firebase.resetPassword({
    email: email
    }).then((result: any) => {
          alert(JSON.stringify(result));
        },
        function (errorMessage:any) {
          alert(errorMessage);
        }
    ).catch(this.handleErrors);
  }  

 getYowls(): Observable<any> {
    return new Observable((observer: any) => {
      let path = 'Yowls';
      
        let onValueEvent = (snapshot: any) => {
          this.ngZone.run(() => {
            let results = this.handleSnapshot(snapshot.value);
             observer.next(results);
          });
        };
        firebase.addValueEventListener(onValueEvent, `/${path}`);
    }).share();              
  }

  handleSnapshot(data: any) {
    //empty array, then refill and filter
    this._allYowls = [];
    if (data) {
      for (let id in data) {        
        let result = (<any>Object).assign({id: id}, data[id]);
          this._allYowls.push(result);
      }
      this.publishUpdates();
    }
    return this._allYowls;
  }

  getChats( to_uid = "yuI6FRoOMaNZZRZgDk17taARKWp2" ): Observable<any> {
    return new Observable((observer: any) => {
      if(BackendService.token < to_uid) {
        this.first_uid = BackendService.token;
        this.second_uid = to_uid;
      }else {
        this.first_uid = to_uid;
        this.second_uid = BackendService.token;
      }
      console.log("alphabetically sorted", this.first_uid, this.second_uid);
      let path = this.first_uid + this.second_uid;      
        let onValueEvent = (snapshot: any) => {
          this.ngZone.run(() => {
            let results = this.handleChatSnapshot(snapshot.value);
            // console.log("",JSON.stringify(results));
             observer.next(results);
          });
        };
        firebase.addValueEventListener(onValueEvent, `/${path}`);
    }).share();              
  }

  handleChatSnapshot(data: any) {
    console.log(data);
    //empty array, then refill and filter
    this._allChats = [];
    if (data) {
      for (let id in data) {        
        let result = (<any>Object).assign({id: id}, data[id]);
          // console.log(JSON.stringify(result))
          this._allChats.push(result);
      }
      this.publishChatUpdates();
    }
    return this._allChats;
  }

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
  

  sendYowl(Yowl:any) {
    let yowl = Yowl;   
    return firebase.push(
        "/Yowls",
        { "name": "Mr. Growlllr", "username": "MrGrwwlr", "text": "Yooowwwwlll!", "UID": BackendService.token, "date": 0 - Date.now()}
      ).then(
        function (result:any) {
          return 'Yowwled!';
        },
        function (errorMessage:any) {
          console.log(errorMessage);
        }); 
  }

  chat(message:string, to_uid = "yuI6FRoOMaNZZRZgDk17taARKWp2") {
    //let chat = Chat; 

    console.log("tooooken", BackendService.token)
    if(BackendService.token < to_uid) {
      this.first_uid = BackendService.token;
      this.second_uid = to_uid;
    }else {
      this.first_uid = to_uid;
      this.second_uid = BackendService.token;
    }
    console.log("alphabetically sorted", this.first_uid, this.second_uid);
    let path = this.first_uid + this.second_uid;
    console.log(message)  
    return firebase.push(
      `/${path}`,
        { "message": message, "to": to_uid, "from": BackendService.token, "date": 0 - Date.now()}
      ).then(
        function (result:any) {
          return "chatted";
        },
        function (errorMessage:any) {
          console.log(errorMessage);
        }); 
  }

   publishUpdates() {
    this._allYowls.sort(function(a, b){
        if(a.date < b.date) return -1;
        if(a.date > b.date) return 1;
      return 0;
    })
    this.yowls.next([...this._allYowls]);
  }

  publishChatUpdates() {
    this._allChats.sort(function(a, b){
        if(a.date > b.date) return -1;
        if(a.date < b.date) return 1;
      return 0;
    })
    this.chats.next([...this._allChats]);
  }

  publishUserUpdates() {
    this._allUsers.sort(function(a,b){
      if(a.date > b.date) return -1;
      if(a.date < b.date) return 1;
    return 0;
    })
    this.users.next([...this._allUsers]);
  }

  handleErrors(error) {
    console.log(JSON.stringify(error));
    return Promise.reject(error.message);
  }
}