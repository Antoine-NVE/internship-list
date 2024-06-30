import { Component, OnInit } from '@angular/core';
import { CompanyFormComponent } from '../company-form/company-form.component';
import {
    Company,
    CompanyStatus,
    NewCompany,
} from '../../../models/company.model';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../../services/company.service';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-company-add',
    standalone: true,
    imports: [CompanyFormComponent, CommonModule, RouterLink],
    templateUrl: './company-add.component.html',
    styleUrl: './company-add.component.css',
})
export class CompanyAddComponent {
    constructor(
        private companyService: CompanyService,
        private router: Router
    ) {}

    handleCompany(company: NewCompany) {
        this.companyService.create(company).subscribe({
            next: (message) => this.router.navigate(['']),
            error: (error) => console.error(error),
        });
    }
}
