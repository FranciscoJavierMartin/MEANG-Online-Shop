import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './@admin/pages/admin.module';
import { PublicModule } from './@public/pages/public.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GraphqlModule } from '@graphql/modules/graphql.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AdminModule,
    PublicModule,
    AppRoutingModule,
    FontAwesomeModule,
    GraphqlModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
