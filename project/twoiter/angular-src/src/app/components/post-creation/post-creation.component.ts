import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-post-creation',
  templateUrl: './post-creation.component.html',
  styleUrls: ['./post-creation.component.css']
})
export class PostCreationComponent implements OnInit {
  posterId: string;
  content: string = "";

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (profile) => {
        this.posterId = profile.user._id;
      },
      error: (err) => { 
        console.log(err); 
        return false; }     
    });
  }

  onPostSubmit(): void {
    const post = {
      posterId: this.posterId,
      content: this.content
    }

    if (this.authService.loggedIn()) {
      if (this.content.trim().length == 0) {
        this.flashMessage.show('Invalid post content', {cssClass: 'alert-danger', timeout: 3000});
      } else {
        this.postService.createPost(post).subscribe(res => {
          if (res.success) {
            this.flashMessage.show(res.msg, {cssClass: 'alert-success', timeout: 3000});
            this.postService.newPostCreated.next(true);
            this.content = '';
          } else {
            this.flashMessage.show(res.msg, {cssClass: 'alert-danger', timeout: 3000});
          }
        });      
      }  
    }    
  }
}
