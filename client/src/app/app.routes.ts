import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { CompanyAddComponent } from './components/company/company-add/company-add.component';
import { CompanyEditComponent } from './components/company/company-edit/company-edit.component';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'entreprise/:id', component: CompanyEditComponent },
    { path: 'entreprise', component: CompanyAddComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
