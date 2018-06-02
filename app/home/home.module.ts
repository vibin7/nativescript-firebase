import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import {TNSFontIconModule, TNSFontIconService, TNSFontIconPipe, TNSFontIconPurePipe} from 'nativescript-ngx-fonticon';
import { homeRouting } from "./home.routes";
import { HomeComponent } from "./home.component";
import { HomeTabComponent } from './home.tab.component';
import { ChatTabComponent } from '../chat/chat.tab.component';

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    homeRouting,
    TNSFontIconModule.forRoot({
      'fa': 'fonts/font-awesome.css'
    }),
  ],
  declarations: [    
    HomeComponent,
    ChatTabComponent    
  ]
})
export class HomeModule {}