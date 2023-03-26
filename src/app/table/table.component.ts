import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddRowDialogComponent } from '../add-row-dialog/add-row-dialog.component';

export interface TableRow {
  name: string;
  children?: TableRow[];
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  dataSource: MatTableDataSource<TableRow> = new MatTableDataSource<TableRow>([]);

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openAddRowDialog(parentRow?: TableRow, index?: number): void {
    const dialogRef = this.dialog.open(AddRowDialogComponent, {
      width: '250px',
      data: { name: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newRow: TableRow = { name: result.name };
        if (parentRow) {
          if (!parentRow.children) {
            parentRow.children = [];
          }
          parentRow.children.push(newRow);
        } else if (index !== undefined) {
          this.dataSource.data.splice(index + 1, 0, newRow);
          this.dataSource.data = [...this.dataSource.data];
        } else {
          this.dataSource.data = [...this.dataSource.data, newRow];
        }
      }
    });
  }



  deleteRow(rowToDelete: TableRow): void {
    this.dataSource.data = this.dataSource.data.filter(row => row !== rowToDelete);
  }
}
