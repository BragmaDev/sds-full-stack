import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });  
    return this.http.get('http://localhost:8080/posts/get', {headers})
      .pipe(map((res: any) => res));
  }
}
