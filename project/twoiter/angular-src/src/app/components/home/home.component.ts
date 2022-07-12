import { Component, OnInit } from '@angular/core';
import { Timestamp } from 'rxjs/internal/types';
import { Post } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Post[] = [];

  constructor(private postService: PostService) { 
    this.postService.newPostCreated.subscribe(value => {
      if (value) { this.getPosts(); }
    });
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts().subscribe(res => {
      if (res.success) {
        this.posts = res.posts;
      } else {
        console.log(res.msg);
      }
    });
  }

  formatTimestamp(ts: number): string {
    const date = new Date(ts);
    const formattedDate = date.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
    return formattedDate;
  }

}
