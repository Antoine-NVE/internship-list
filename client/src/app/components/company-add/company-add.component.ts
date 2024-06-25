import { Component, OnInit } from '@angular/core';
import { CompanyFormComponent } from '../company-form/company-form.component';
import { Company, CompanyStatus } from '../../models/company.model';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../services/company.service';

@Component({
    selector: 'app-company-add',
    standalone: true,
    imports: [CompanyFormComponent, CommonModule],
    templateUrl: './company-add.component.html',
    styleUrl: './company-add.component.css',
})
export class CompanyAddComponent implements OnInit {
    // public company: Company = {
    //     _id: '667a821ddf761ffb7fa6666a',
    //     name: 'test',
    //     discovery: 'here',
    //     status: CompanyStatus.Waiting,
    //     contacts: [],
    // };

    public company!: Company;

    constructor(private companyService: CompanyService) {}

    ngOnInit(): void {
        this.companyService.readOne('667a821ddf761ffb7fa6666a').subscribe({
            next: (company) => (this.company = company),
            error: (error) => console.error(error),
        });
    }
}
