import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { User } from '../model/user';
import { UserService} from '../services/users.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
})
export class UserComponent implements OnInit {

  users: User[];
  newUser: User;
  editUser: User;
  searchCriteria: string;
  
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.newUser = User.CreateDefault();
    this.editUser = User.CreateDefault();
    this.searchCriteria = '';
    this.getUsers();
  }

  deleteUser(user:User)
  {
    this.userService.deleteUser(user)
    .subscribe(
      data => {
        this.users.splice(this.users.indexOf(user), 1);
        console.log("User deleted!");
      })
  }
  
  insertUser() {
    this.userService
    .insertNewUser(this.newUser)
    .subscribe(
      data => {
         this.newUser._id = data.id;
         this.users.push(this.newUser);
         this.newUser = User.CreateDefault();
    
         console.log("Added user.");
      }
    )
  }

  updateUser(user:User) {
    this.userService
    .updateUser(this.newUser)
    .subscribe(
      data => {
         var index = this.users.findIndex(item => item._id === this.editUser._id);
         this.users[index] = this.editUser;
         this.editUser = User.CreateDefault();
    
         console.log("Added user.");
      }
    )
  }

  getUsers(){
    this.userService.getUsers(this.searchCriteria)
    .subscribe(
      data => {
         this.users = [];
         data.forEach(
           element => {
             var newUser = new User(element._id, 
                                element.name, 
                                element.age,
                                element.location,
                                element.blog);
             this.users.push(newUser);
           })
      })
  }

  clearSearch(){
    this.searchCriteria = '';
    this.getUsers();
  }

  setEditUser(user: User){
    this.editUser = new User(user._id, user.name, user.age, user.location, user.blog);
  }
}
