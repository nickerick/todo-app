import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TodoTask } from '../todotask';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private cookieService: CookieService, private router: Router, private route: ActivatedRoute, private apiService: ApiService) { 
    this.username = this.route.snapshot.paramMap.get('username');
    this.tasks = [];
    this.apiService.getUser(String(this.username))
      .subscribe((data: any) => { this.tasks = data[0].tasks; console.log(this.tasks)});
  }

  ngOnInit(): void {
    if (this.cookieService.get('loggedIn') !== 'true') {
      this.router.navigate(['/login']);
    }

  }

  username: string | null;
  description: string = '';
  tasks: TodoTask[];

  addTask(): void {
    if (this.description.length > 0) {
      this.tasks.push({ description: this.description, done: false })
      this.apiService.editTasks(this.tasks, String(this.username));
    }

    this.description = '';
  } 

  markDone(i: number): void {
    this.tasks[i].done = !this.tasks[i].done;
    this.apiService.editTasks(this.tasks, String(this.username));
  }

  deleteTask(i: number): void {
    this.tasks.splice(i, 1);
    this.apiService.editTasks(this.tasks, String(this.username));
  }

}
