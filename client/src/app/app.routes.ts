import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { CompanyAddComponent } from './components/company-add/company-add.component';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'entreprise', component: CompanyAddComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
