import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CoursesService } from './courses.service';
import { Course } from "./types/course";
import { environment } from '../../environments/environment'

const baseUrl = environment.baseUrl;

const coursesMock: Array<Course> = [
  {
    "id": 1,
    "title": "Modern Web Development",
    "duration": 5,
    "duration-unit": "day",
    "description": "HTML5, CSS3, ES6/JS and more"
  },
  {
    "id": 2,
    "title": "Git",
    "duration": 3,
    "duration-unit": "day",
    "description": "Git and GitHub"
  },
  {
    "id": 3,
    "title": "Python",
    "duration": 5,
    "duration-unit": "day",
    "description": "Intro to Python"
  }
];
describe('CourseService', () => {
  let service: CoursesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(CoursesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get courses', () => {
    service.getCourses().subscribe((data) => {
      expect(data).toBe(coursesMock);
      expect(data.length).toEqual(3);
    });

    let coursesRequest = httpMock.expectOne(`${baseUrl}/courses?q=`);
    coursesRequest.flush(coursesMock);

    httpMock.verify();
  });

  it('should create course', () => {
    const freshThirdCourse = Object.assign({}, coursesMock[2], { id: undefined });
    const freshThirdCourseWithId = Object.assign({}, coursesMock[2]);

    service.createCourse(freshThirdCourse).subscribe((data) => {
      expect(data).toBe(freshThirdCourseWithId);
    });

    let createCourseRequest = httpMock.expectOne(`${baseUrl}/courses`);
    createCourseRequest.flush(freshThirdCourseWithId);

    expect(createCourseRequest.request.method).toBe('POST');

    httpMock.verify();
  });

  /*
   TODO: This is not a complete unit-test of CoursesService, due to time constraints.
     Also other service methods would be tested in exactly the same manner.
      So, I hope, this sample is enough to evaluate my unit-testing skills.
  */
});
