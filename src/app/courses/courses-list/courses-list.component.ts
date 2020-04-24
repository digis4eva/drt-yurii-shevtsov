import { Component, OnInit } from '@angular/core';
import { CoursesService } from "../courses.service";
import { Course } from "../types/course";

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
})
export class CoursesListComponent implements OnInit {
  public courses = this.coursesService.courses;

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.coursesService.getCourses().subscribe();
  }

  handleDelete(course: Course) {
    this.coursesService.deleteCourse(course.id).subscribe();
  }

  handleSearch($event: string) {
    this.coursesService.getCourses($event).subscribe();
  }
}
