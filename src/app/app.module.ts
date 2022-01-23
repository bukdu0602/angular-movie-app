import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { child }  from './app.child';
import { AboutComponent } from './app.about';
import { HomeComponent } from './app.home';
import { routing }        from './app.routing';
@NgModule({
  declarations: [
    AppComponent, child, AboutComponent, HomeComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


