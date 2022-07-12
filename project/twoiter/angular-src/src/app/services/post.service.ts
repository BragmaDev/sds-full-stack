import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public newPostCreated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  getPosts() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });  
    return this.http.get('http://localhost:8080/posts/get', {headers})
      .pipe(map((res: any) => res));
  }

  createPost(post: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });  
    return this.http.post('http://localhost:8080/posts/create', post, {headers})
      .pipe(map((res: any) => res));
  }
}
