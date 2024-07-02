import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { CompanyAddComponent } from './components/company/company-add/company-add.component';
import { CompanyEditComponent } from './components/company/company-edit/company-edit.component';
import { ContactAddComponent } from './components/contact/contact-add/contact-add.component';
import { ContactEditComponent } from './components/contact/contact-edit/contact-edit.component';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'contact/:id', component: ContactEditComponent },
    { path: 'entreprise/:id/contact', component: ContactAddComponent },
    { path: 'entreprise/:id', component: CompanyEditComponent },
    { path: 'entreprise', component: CompanyAddComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
