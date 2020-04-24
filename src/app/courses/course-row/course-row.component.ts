import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from "../types/course";

@Component({
  selector: 'tr[app-course-row]',
  templateUrl: './course-row.component.html',
  styleUrls: ['./course-row.component.css']
})
export class CourseRowComponent implements OnInit {
  @Input() course: Course;
  @Output() courseDelete: EventEmitter<Course> = new EventEmitter<Course>();

  get courseDuration() {
    return `${this.course.duration} ${this.course['duration-unit']}${this.course.duration > 1 ? 's' : ''}`;
  }

  constructor() { }

  ngOnInit(): void {
  }

  handleDelete() {
    /*
      TODO: Due to time restrictions and inability to use existing bootstrap-angular bindings
       I'm using this simple confirmation method, instead of writing my own wrapper for bootstrap modals
    */
    if (window.confirm('Are you sure you want to delete this course?')) {
      this.courseDelete.emit(this.course);
    }
  }
}
