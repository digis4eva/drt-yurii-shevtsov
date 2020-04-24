import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Course } from './types/course';
import { environment } from '../../environments/environment'

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private localCourses: Course[] = [];
  public courses: Subject<Course[]> = new ReplaySubject<Course[]>(1);

  constructor(private http: HttpClient) {
  }

  private static getArrayWithReplacedCourse = (courses, course) => {
    if (!course || !course.id) return courses;

    const index = courses.findIndex(c => c.id === course.id);
    const coursesShallowCopy = courses.slice();
    coursesShallowCopy[index] = course;
    return coursesShallowCopy;
  }

  public getCourses(query: string = ''): Observable<Course[]> {
    return this.http.get<Course[]>(`${baseUrl}/courses`, { params: { q: query } }).pipe(
      tap(courses => {
        this.localCourses = courses;
        this.courses.next(this.localCourses);
      })
    );
  }

  public createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${baseUrl}/courses`, course).pipe(
      tap(course => {
        this.localCourses = [course, ...this.localCourses];
        this.courses.next(this.localCourses);
      })
    );
  }

  public editCourse(course: Course): Observable<Course> {
    const courseId = course.id;
    return this.http.put<Course>(`${baseUrl}/courses/${courseId}`, course).pipe(
      tap(course => {
        this.localCourses = CoursesService.getArrayWithReplacedCourse(this.localCourses, course);
        this.courses.next(this.localCourses);
      })
    );
  }

  public deleteCourse(courseId: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/courses/${courseId}`).pipe(
      tap(() => {
        this.localCourses = this.localCourses.filter(c => c.id !== courseId);
        this.courses.next(this.localCourses);
      })
    );
  }

  public getCourseById(courseId: number): Observable<Course> {
    const localCourse = this.localCourses.find(c => c.id === courseId);

    if (localCourse) {
      return of(localCourse);
    } else {
      return this.http.get<Course>(`${baseUrl}/courses/${courseId}`);
    }
  }
}
