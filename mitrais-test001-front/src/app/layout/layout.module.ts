import { NgModule } from '@angular/core';
import { AppRoutingModule } from '.././app-routing.module';

import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule, AppRoutingModule
  ],
  exports: [
  	LayoutComponent
  ]
})
export class LayoutModule {}