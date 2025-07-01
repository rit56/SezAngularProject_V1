import { ChangeDetectionStrategy, Component, inject, Input, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, catchError, debounceTime, distinctUntilChanged, map, of, switchMap, tap, } from 'rxjs';

import { IDataTableHeader, SearchCriteria, ApiService, DeleteModalComponent } from 'src/app';
import { PaginatorComponent } from '..';
import { TableComponent } from "../table/table.component";

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, PaginatorComponent, TableComponent],
  providers: [DatePipe],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent implements OnInit {
  private modalService = inject(NgbModal);
  private apiService = inject(ApiService);

  @Input() headers!: IDataTableHeader[];
  @Input() idKey!: string;
  @Input() url!: string;

  searchCriteria$ = new BehaviorSubject<SearchCriteria>({ page: 1, size: 5, reloadCount: 0});
  records = signal<any[] | null>(null);
  totalPage = signal<number>(0);
  isFetching = signal<boolean>(true)


  ngOnInit(): void {
    this.fetchRecords();
  }

  fetchRecords() {
    this.searchCriteria$.pipe(
      debounceTime(500),
      map(() => this.getParams()),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
      tap(() => this.isFetching.set(true)),
      switchMap((params) => this.getListData(params))
    ).subscribe({
      next: (response: any) => {
        var starindex = (this.searchCriteria$.value.page - 1) * this.searchCriteria$.value.size;
        var endIndex = starindex + this.searchCriteria$.value.size;
        var recordsToLoad = response.data?.slice(starindex, endIndex) || [];
        this.records.set(recordsToLoad);
        response.totalCount = response.data?.length || 0;
        if(response.totalCount) {
          this.totalPage.set(Math.ceil(response.totalCount / this.searchCriteria$.value.size));
        }
        this.isFetching.set(false);
      },
    });
  }

  getListData(params: SearchCriteria) {
    return this.apiService.get(this.url, params).pipe(catchError(() => of([])))
  }

  getParams() {
    return {
      ...this.searchCriteria$.getValue(),
    };
  }

  search(value: string) {
    this.searchCriteria$.next({ ...this.searchCriteria$.getValue(), page: 1, search: value, });
  }

  pageChange(page: number) {
    this.searchCriteria$.next({ ...this.searchCriteria$.getValue(), page });
  }

  pageSizeChange(size: number) {
    this.searchCriteria$.next({ ...this.searchCriteria$.getValue(), page: 1, size, });
  }

  reload() {
    this.searchCriteria$.next({ ...this.searchCriteria$.getValue(), reloadCount: +this.searchCriteria$.getValue()["reloadCount"]! + 1 });
  }

  deleteRecord({ record, header, name }: { record: any, header: IDataTableHeader, name: string }) {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.data = { url: header.deleteApiUrl, record, idKey: this.idKey, name };
    modalRef.result.then((result) => result && this.fetchRecords());
  }
}
