import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent {
  postForm: FormGroup;
  imageFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private postsService: PostsService,
    private router: Router
  ) {
    this.postForm = this.formBuilder.group({
      title: new FormControl(''),
      body: new FormControl(''),
      featured_image: new FormControl(null),
    });
  }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0] as File;
  }

  onSubmit(postData: Post) {
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('body', postData.body);
    if (this.imageFile) {
      formData.append('featured_image', this.imageFile);
    }

    this.postsService.createPost(formData).subscribe((data: Post) => {
      console.log('New post created', data);
      this.postForm.reset();
      this.router.navigate(['/posts', data.id]);
    });
  }
}
