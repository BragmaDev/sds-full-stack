import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Post[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  pageCount: number;
  onOldestPage: boolean;

  constructor(private postService: PostService, private authService: AuthService) { 
    this.postService.newPostCreated.subscribe(value => {
      if (value) { this.getPosts(); }
    });
  }

  ngOnInit() {
    this.getPosts();
    this.getPageCount();
  }

  getPosts(): void {
    this.postService.getPosts(this.pageNumber, this.pageSize).subscribe(res => {
      if (res.success) {
        this.posts = res.posts;
        // add formatted timestamp and poster's username to post objects
        this.posts.forEach(post => {
          this.setPosterByPosterId(post);
          post.formattedTimestamp = this.formatTimestamp(post.createdAt);
        });
      } else {
        console.log(res.msg);
      }
    });
  }

  // get number of total pages
  getPageCount(): void {
    this.postService.getTotalPostsCount().subscribe(res => {
      if (res.success) {
        this.pageCount = (res.count / this.pageSize);
        this.checkOnOldestPage();
      } else {
        console.log(res.msg);
      }
    });
  }

  setPosterByPosterId(post: Post): void {
    this.authService.getUsernameById(post.posterId).subscribe(res => {
      post.poster = res.username;
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

  changePage(previous: boolean): void {
    if (previous && this.pageNumber < this.pageCount) {
      this.pageNumber += 1;
      this.checkOnOldestPage();
      this.getPosts();
    } else if (!previous && this.pageNumber != 1) {
      this.pageNumber -= 1;
      this.checkOnOldestPage();
      this.getPosts();
    }
  }

  // check if the current page is the oldest
  checkOnOldestPage(): void {
    this.pageNumber >= this.pageCount ? this.onOldestPage = true : this.onOldestPage = false;
  }
}
