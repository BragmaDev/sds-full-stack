import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public postsUpdated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private authService: AuthService) { }

  getPosts(pageNumber: number, pageSize: number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize); 
    return this.http.get('http://localhost:8080/posts/get', {headers, params})
      .pipe(map((res: any) => res));
  }

  getTotalPostsCount() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get('http://localhost:8080/posts/getcount', {headers})
      .pipe(map((res: any) => res));
  }

  createPost(post: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });  
    return this.http.post('http://localhost:8080/posts/create', post, {headers})
      .pipe(map((res: any) => res));
  }

  deletePost(id: string) {
    let headers = new HttpHeaders({
      'Authorization': this.authService.authToken,
      'Content-Type': 'application/json'
    });
    return this.http.delete(`http://localhost:8080/posts/delete/${id}`, {headers})
      .pipe(map((res: any) => res));
  }
}
