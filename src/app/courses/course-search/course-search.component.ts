import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.css']
})
export class CourseSearchComponent implements OnInit {
  @Output() queryChange: EventEmitter<string> = new EventEmitter<string>();
  public searchForm: FormGroup = this.formBuilder.group({
    query: ['']
  })

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.searchForm.get('query').valueChanges.pipe(
      debounceTime(300)
    ).subscribe(value => this.queryChange.emit(value));
  }

}
