import { NgModule } from '@angular/core';

// Module
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Component
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
    ],
    imports: [
        RouterModule,
        CommonModule
    ]
})

export class SharedModule { }
