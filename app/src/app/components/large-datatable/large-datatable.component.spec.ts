import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeDatatableComponent } from './large-datatable.component';

describe('LargeDatatableComponent', () => {
  let component: LargeDatatableComponent;
  let fixture: ComponentFixture<LargeDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LargeDatatableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
