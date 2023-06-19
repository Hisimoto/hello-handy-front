import { LiveAnnouncer } from "@angular/cdk/a11y";
import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { Page } from "src/app/@core/dto/page";
import { Status } from "src/app/@core/dto/status.enum";
import { TemplateBriefDto } from "src/app/@core/dto/templateBriefDto";
import { TemplateDto } from "src/app/@core/dto/templateDto";
import { TemplateService } from "src/app/@core/services/template.service";
import { ConfirmationComponent } from "src/app/@theme/components/confirmation/confirmation.component";
import { TemplateComponent } from "../template/template.component";

@Component({
  selector: "app-requests",
  templateUrl: "./requests.component.html",
  styleUrls: ["./requests.component.scss"],
})
export class Requests implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  page = new Page();
  displayedColumns: string[] = [
    "name",
    "vorname",
    "email",
    "telefon",
    "hertseller",
    "modell",
    "preis",
    "status",
    "view",
    "infoClient",
    "infoComanda"
  ];
  dataSource = new MatTableDataSource();
  searchValue = new FormControl();
  searchValueID = new FormControl();

  constructor(
    private templateService: TemplateService,
    private _liveAnnouncer: LiveAnnouncer,

    private dialogService: MatDialog
  ) {
    this.page.page = 0;
    this.page.pageSize = 10;
  }

  ngOnInit() {
    this.loadData();
    this.searchValue.valueChanges
      .pipe(debounceTime(600), distinctUntilChanged())
      .subscribe(() => {
        this.page.page = 0;
        this.page.searchTerm = this.searchValue.value;
        this.loadData();
      });

    this.searchValueID.valueChanges
      .pipe(debounceTime(600), distinctUntilChanged())
      .subscribe(() => {
        if (this.searchValueID.value == "") {
          this.page.page = 0;
          this.loadData();
        } else {
          this.page.page = 0;
          this.getTemplateById(this.searchValueID.value);
        }
      });
      
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["activate"]?.previousValue) {
      this.loadData();
    }
    this.searchValue.setValue("");
    this.searchValueID.setValue("");
  }

  async loadData() {
    this.templateService.getRequests(this.page).subscribe((response: any) => {
      this.dataSource = response.content;
      
      this.page.totalElements = response.totalElements;
    });
  }

  getTemplateById(id: number) {
    this.templateService.getRequestById(id).subscribe((response: any) => {
      let newData= [response];
      this.dataSource = new MatTableDataSource(newData);
      console.log("databyID " + newData);
      this.page.totalElements = 1;
    });
  }

  getStatus(status: string) {
    if (status == Status.RESOLVED) {
      return "primary";
    } else {
      return "warn";
    }
  }

  resolve(id: string) {
    const dialogRef = this.dialogService.open(ConfirmationComponent, {
      data: {
        viewText: "Are you sure you want to resolve selected request?",
      },
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.templateService.resolveRequest(id).subscribe(() => {
          this.loadData();
        });
      }
    });
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce("Sorting cleared");
    }
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  async onPageClick(e: any) {
    this.page.page = e.pageIndex;
    this.page.pageSize = e.pageSize;
    this.loadData();
  }
  viewRequest(templateId: number, isView: boolean) {
    const dialogRef = this.dialogService.open(TemplateComponent, {
      data: { templateId, isView },
    });
    dialogRef.afterClosed().subscribe(() => {});
  }
  savePdfClient(id: string) {
    const printWindow = window.open('', '_blank', 'width=600,height=600');
      printWindow!.document.open();
      printWindow!.document.write(`
        <html>
          <head>
            <title>Print</title>
          </head>
          <body>
          <div>Vielen Dank für den Auftrag</div>
          <div>Auftragsnummer: ${id} </div>
          <div>Legen Sie dieses Ticket vor, um das Gerät zu erhalten.</div>
          </body>
        </html>
      `);
      printWindow!.document.close();
      printWindow!.print();
      printWindow!.close();
  }
  savePdfComanda(template: TemplateDto) {
    
    const printWindow = window.open('', '_blank', 'width=600,height=600');
      printWindow!.document.open();
      printWindow!.document.write(`
        <html>
          <head>
            <title>Print</title>
          </head>
          <body>
          <div>Gerätemodell: ${template.hertseller}  ${template.modell}</div>
          <div>Kunde: ${template.name}  ${template.vorname}</div>
          <div>Auftragsnummer: ${template.id}</div>
          <div>Preis: ${template.preis}</div>
          </body>
        </html>
      `);
      printWindow!.document.close();
      printWindow!.print();
      printWindow!.close();
  }
}
