import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Post } from '../post';
import { PostComponent } from './post.component';

const testPost: Post = {
  title: 'test title',
  userId: 2,
  id: 3,
  body: 'test body',
};

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let testElement: HTMLDivElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PostComponent],
    });
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    testElement = fixture.nativeElement.querySelector('#post');

    fixture.componentRef.setInput('post', testPost);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the title', () => {
    expect(testElement.innerText).toBe(testPost.title);
  });

  it('after 1 click shows the userId', () => {
    testElement.click();
    fixture.detectChanges();
    expect(testElement.innerText).toBe(`userId: ${testPost.userId}`);
  });

  it('after 2 clicks shows the id', () => {
    testElement.click();
    testElement.click();
    fixture.detectChanges();
    expect(testElement.innerText).toBe(`id: ${testPost.id}`);
  });

  it('after 3 clicks shows the body', () => {
    testElement.click();
    testElement.click();
    testElement.click();
    fixture.detectChanges();
    expect(testElement.innerText).toBe(testPost.body);
  });

  it('after 4 clicks shows the title again', () => {
    testElement.click();
    testElement.click();
    testElement.click();
    testElement.click();
    fixture.detectChanges();
    expect(testElement.innerText).toBe(testPost.title);
  });
});
