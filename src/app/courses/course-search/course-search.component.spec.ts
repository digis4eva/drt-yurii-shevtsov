import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSearchComponent } from './course-search.component';

describe('CourseSearchComponent', () => {
  let component: CourseSearchComponent;
  let fixture: ComponentFixture<CourseSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSearchComponent ],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit queryChange', () => {
    jasmine.clock().install()
    const queryChangeSpy = spyOn<any>(component.queryChange, 'emit').and.callThrough();
    component.ngOnInit();
    return fixture.whenStable().then(() => {
      component.searchForm.get('query').setValue('foo');
      jasmine.clock().tick(500);
      return expect(queryChangeSpy).toHaveBeenCalled();
    });
  })
});
