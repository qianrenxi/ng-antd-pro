import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { WelcomeComponent } from './layout/welcome/welcome.component';

const routes: Routes = [
    {
        path: '', component: MainLayoutComponent, children: [
            // { path: '', component: WelcomeComponent },
            { path: '', redirectTo: 'dashboard/analysis', pathMatch: 'full' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
            { path: 'exception', loadChildren: './exception/exception.module#ExceptionModule'},
            { path: 'form', loadChildren: './forms/forms.module#FormsModule'},
            { path: 'list', loadChildren: './list/list.module#ListModule'},
            { path: 'profile', loadChildren: './profile/profile.module#ProfileModule'},
            { path: 'result', loadChildren: './result/result.module#ResultModule'},
            { path: 'utils', loadChildren: './utils/utils.module#UtilsModule'},
            { path: 'grid-layout', loadChildren: './grid-layout/grid-layout.module#GridLayoutModule'},
        ]
    },
    { path: 'user', loadChildren: './user/user.module#UserModule'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
    exports: [RouterModule],
})
export class AppRoutingModule { }

export const routedComponents = [];