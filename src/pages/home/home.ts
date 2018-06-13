import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StubFactoryServiceProvider, Stubs } from '../../stubs/stub-factory-service/stub-factory-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private divContent: string;

  constructor(
    public navCtrl: NavController,
    private stubFactory: StubFactoryServiceProvider,
  ) {
    this.divContent = '';
  }

  reqeustUserInfo(userIndex: string) {
    this.divContent = 'Loading..';
    const usersStub = this.stubFactory.createStub(Stubs.Users);
    usersStub.setCustomConfigs({index: userIndex});
    usersStub.executeStub().then((data) => {
      this.divContent = JSON.stringify( data);
    }).catch((error) => {
      console.error(error.stack);
      this.divContent = error.userMessage || error.message;
    });
  }

}
