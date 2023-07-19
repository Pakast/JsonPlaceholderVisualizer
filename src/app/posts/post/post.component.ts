import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';

import { Post } from '../post';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnChanges {
  @Input() post!: Post;

  displayValues: string[] = [];
  displayIndex = 0;

  ngOnChanges(changes: SimpleChanges): void {
    const post: SimpleChange = changes['post'];
    if (post) {
      this.displayValues = [
        post.currentValue.title,
        `userId: ${post.currentValue.userId}`,
        `id: ${post.currentValue.id}`,
        post.currentValue.body,
      ];
    }
  }

  displayNextProperty(): void {
    this.displayIndex++;
    if (this.displayIndex >= this.displayValues.length) {
      this.displayIndex = 0;
    }
  }
}
