import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  profile: any;

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
     /*
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      console.log(this.profile);
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      console.log(this.profile);
      });
    } RAK1 */
  }

  ngOnInit() {
    this.auth.userProfileChange$.subscribe(name => this.profile = name);
  }
}
