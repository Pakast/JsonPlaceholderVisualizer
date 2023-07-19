import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private httpClient: HttpClient) {}

  public getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(environment.apiUrl);
  }
}
