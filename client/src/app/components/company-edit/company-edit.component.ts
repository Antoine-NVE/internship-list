import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company.model';
import { CompanyFormComponent } from '../company-form/company-form.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-company-edit',
    standalone: true,
    imports: [RouterLink, CompanyFormComponent, CommonModule],
    templateUrl: './company-edit.component.html',
    styleUrl: './company-edit.component.css',
})
export class CompanyEditComponent implements OnInit {
    public company!: Company;

    constructor(
        private route: ActivatedRoute,
        private companyService: CompanyService,
        private router: Router
    ) {}

    ngOnInit(): void {
        const id: string = this.route.snapshot.paramMap.get('id')!;

        this.companyService.readOne(id).subscribe({
            next: (company) => (this.company = company),
            error: (error) => this.router.navigate(['entreprise']),
        });
    }

    public handleCompany(company: Company) {
        this.companyService.update(company).subscribe({
            next: (message) => this.router.navigate(['']),
            error: (error) => console.error(error),
        });
    }
}
