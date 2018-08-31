import {NgModule} from '@angular/core';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule,
  MatToolbarModule,
  MatTableModule,
  MatListModule,
  MatSortModule,
  MatPaginatorModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatToolbarModule,
    MatTableModule,
    MatListModule,
    MatSortModule,
    MatPaginatorModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatToolbarModule,
    MatTableModule,
    MatListModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class MaterialModule {
}
