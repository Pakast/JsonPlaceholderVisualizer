import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { catchError, ignoreElements, Observable, of } from 'rxjs';

import { Post } from './post';
import { PostComponent } from './post/post.component';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './posts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent {
  posts$: Observable<Post[]> = this.postsService.getPosts();
  error$ = this.posts$.pipe(
    ignoreElements(),
    catchError(() => of(true))
  );

  constructor(private postsService: PostsService) {}
}
