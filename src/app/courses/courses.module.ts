import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseRowComponent } from './course-row/course-row.component';
import { CourseSearchComponent } from './course-search/course-search.component';
import { CourseFormComponent } from './course-edit/course-form.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesListComponent,
    children: [
      { path: 'id/:id', component: CourseFormComponent, data: { isEdit: true } },
      { path: 'new', component: CourseFormComponent, data: { isEdit: false } }
    ]
  }
];

@NgModule({
  declarations: [
    CoursesListComponent,
    CourseRowComponent,
    CourseSearchComponent,
    CourseFormComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CoursesModule { }
