import { AfterViewInit, ChangeDetectorRef, Component, DestroyRef, inject, signal, ViewChild } from '@angular/core';
import { FormControl,  FormGroup,  ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { merge, startWith, switchMap, map, catchError, of as observableOf } from 'rxjs';

import { ServiceInList } from '../service.model';
import { ServicesService } from '../services.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-briefingcon-index',
  standalone: true,
  imports: [
    MatTableModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatCheckboxModule,
    MatDatepickerModule,
    MatSelectModule,
    MatPaginator, 
    MatSort, 
    MatButtonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './service-index.component.html',
  styleUrl: './service-index.component.css'
})
export class ServiceIndexComponent implements AfterViewInit {

  private servicesService = inject(ServicesService);
  private changeDetectorRef = inject(ChangeDetectorRef);
  displayedColumns: string[] = ['id', 'data', 'turno', 'notturno', 'username'];
  dataSource: ServiceInList[] = [];
  loading = signal<boolean>(false);
  resultsLength = 0;
  formFilter = new FormGroup({
    filterId: new FormControl(),
    filterDate: new FormControl(),
    filterTurn: new FormControl(),
    filterNightly: new FormControl(),
    filterUsername: new FormControl()
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    console.log(this.formFilter);
    //merge() ascolta a: sort change, paginator page change, filter change
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading.set(true);
          return this.servicesService.services(
            this.paginator.pageIndex+1,
            this.paginator.pageSize,
            this.formFilter.value.filterId || 0,
            this.formFilter.value.filterDate || null,
            this.formFilter.value.filterTurn || '',
            this.formFilter.value.filterNightly || '',
            this.formFilter.value.filterUsername || ''
          );
        }),
        map(data => {
          this.loading.set(false);
          this.resultsLength = data.count;
          return data.result;
        }),
        catchError((ex) => {
          this.loading.set(false);
          return observableOf([]);
        })
      )
      .subscribe(data => (this.dataSource = data));      
    this.changeDetectorRef.detectChanges();
  }

  applyFilter() {
    this.paginator.pageIndex = 0;
    this.ngAfterViewInit();
  }

  resetFilter(){
    this.paginator.pageIndex = 0;
    this.formFilter.reset();
    this.ngAfterViewInit();
  }

}