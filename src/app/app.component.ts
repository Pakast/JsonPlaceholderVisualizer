import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PostsComponent } from './posts/posts.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PostsComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
