import { Component } from '@angular/core';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular9crud';
  allUsers: Object;
  userObj: any = {
    'name': '',
    'mobile': '',
    'email': '',
    'password': '',
    // 'id': ''
  }
  isEdit = false;
  constructor(private commonService: CommonService) {

  }
  ngOnInit() {
    this.getLatestUser();
  }
  addUser(formObj) {
    console.log("click add user")
    console.log(formObj)
    this.commonService.createUser(formObj).subscribe(() => {
      console.log("user added")
      this.getLatestUser();
    })
  }
  getLatestUser() {
    this.commonService.getAllUser().subscribe((response) => {
      this.allUsers = response;
    })
  }
  editUser(user) {
    this.isEdit = true;
    this.userObj = user;
  }
  deleteUser(user) {
    this.commonService.deleteUser(user).subscribe(() => {
      this.getLatestUser();
    })
  }
  updateUser() {
    this.isEdit = !this.isEdit;
    this.commonService.updateUser(this.userObj).subscribe(() => {
      this.getLatestUser();
    })
  }
}
