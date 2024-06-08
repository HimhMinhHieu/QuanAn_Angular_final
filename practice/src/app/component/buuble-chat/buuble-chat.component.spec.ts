import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuubleChatComponent } from './buuble-chat.component';

describe('BuubleChatComponent', () => {
  let component: BuubleChatComponent;
  let fixture: ComponentFixture<BuubleChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuubleChatComponent]
    });
    fixture = TestBed.createComponent(BuubleChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
