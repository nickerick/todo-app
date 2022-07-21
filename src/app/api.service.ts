import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoTask } from './todotask';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  rootURL = 'http://localhost:3000/users';

  getUser(username: string) {
    return this.http.get(this.rootURL + '/' + username, { responseType: 'json' });
  }

  addUser(user: any) {
    return this.http.post(this.rootURL + '/username', {user});
  }

  editTasks(tasks: TodoTask[], username: string) {
    return this.http.patch(this.rootURL + '/' + username, {tasks}).subscribe();
  }

}