import { Component, OnInit } from '@angular/core';
import { CompanyFormComponent } from '../company-form/company-form.component';
import { Company, CompanyStatus } from '../../models/company.model';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../services/company.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-company-add',
    standalone: true,
    imports: [CompanyFormComponent, CommonModule, RouterLink],
    templateUrl: './company-add.component.html',
    styleUrl: './company-add.component.css',
})
export class CompanyAddComponent {}
