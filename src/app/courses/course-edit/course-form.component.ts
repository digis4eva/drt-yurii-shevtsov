import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { switchMap } from "rxjs/operators";
import { CoursesService } from "../courses.service";

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  public courseForm = this.formBuilder.group({
    id: [undefined],
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    duration: [1, [Validators.required, Validators.min(1)]],
    durationUnit: ['', Validators.required],
    description: ['']
  })
  public isSubmitting = false;
  private isEdit = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private coursesService: CoursesService ) { }

  ngOnInit(): void {
    this.route.data.subscribe(({ isEdit }) => {
      this.isEdit = isEdit;

      if (this.isEdit) {
        this.route.params
          .pipe(switchMap(({ id }) => this.coursesService.getCourseById(id)))
          .subscribe(course => {
            this.courseForm.patchValue({
              id: course.id,
              title: course.title,
              duration: course.duration,
              durationUnit: course['duration-unit'],
              description: course.description
            })
          });
      }
    })
  }

  handleSubmit() {
    Object.values(this.courseForm.controls).forEach(c => c.markAsTouched());

    if (this.courseForm.invalid) return;

    this.isSubmitting = true;

    const value = this.courseForm.value;
    const requestCourse = {
      id: value.id,
      title: value.title,
      duration: value.duration,
      'duration-unit': value.durationUnit,
      description: value.description
    };

    const observable = this.isEdit
      ? this.coursesService.editCourse(requestCourse)
      : this.coursesService.createCourse(requestCourse);

    observable.subscribe(() => {
      this.isSubmitting = false;
      this.router.navigate(['/courses']);
    });
  }
}
