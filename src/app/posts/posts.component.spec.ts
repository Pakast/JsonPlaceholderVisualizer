import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { delay, Observable, of, throwError } from 'rxjs';

import { Post } from './post';
import { PostsComponent } from './posts.component';
import { PostsService } from './posts.service';

class MockPostsService {
  public getPosts(): Observable<Post[]> {
    return of([]);
  }
}

describe('PostsComponent', () => {
  let fixture: ComponentFixture<PostsComponent>;
  let postsService: PostsService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PostsComponent, HttpClientTestingModule],
      providers: [{ provide: PostsService, useClass: MockPostsService }],
    });
    postsService = TestBed.inject(PostsService);
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(PostsComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should call getPosts', () => {
    spyOn(postsService, 'getPosts').and.callThrough();
    fixture = TestBed.createComponent(PostsComponent);
    fixture.detectChanges();
    expect(postsService.getPosts).toHaveBeenCalledTimes(1);
  });

  it('should show error notification when posts cannot be loaded', () => {
    spyOn(postsService, 'getPosts').and.returnValue(
      throwError(() => new Error())
    );
    fixture = TestBed.createComponent(PostsComponent);
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('#error');
    expect(errorElement).toBeTruthy();
  });

  it('should not show error notification when posts are loaded', () => {
    fixture = TestBed.createComponent(PostsComponent);
    fixture.detectChanges();
    const errorElement = fixture.nativeElement.querySelector('#error');
    expect(errorElement).toBeFalsy();
  });

  it('should show loading notification when posts are loading', fakeAsync(() => {
    spyOn(postsService, 'getPosts').and.returnValue(of([]).pipe(delay(1)));
    fixture = TestBed.createComponent(PostsComponent);
    fixture.detectChanges();
    const loadingElement = fixture.nativeElement.querySelector('#loading');
    expect(loadingElement).toBeTruthy();
    tick(1);
  }));

  it('should not show loading notification when posts are loaded', () => {
    fixture = TestBed.createComponent(PostsComponent);
    fixture.detectChanges();
    const loadingElement = fixture.nativeElement.querySelector('#loading');
    expect(loadingElement).toBeFalsy();
  });
});
