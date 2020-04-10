import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageContentManagmentComponent } from './page-content-managment.component';

describe('PageContentManagmentComponent', () => {
  let component: PageContentManagmentComponent;
  let fixture: ComponentFixture<PageContentManagmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageContentManagmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageContentManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
