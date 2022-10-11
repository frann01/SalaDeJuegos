import { Component, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './services/auth.service';
import { NavigationStart, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnDestroy{

  title = 'Sala De Juegos';
  subscription: any;
  browserRefresh: any;
  constructor(private toastr: ToastrService,private router: Router,public authSvc: AuthService, private af:AngularFireAuth) 
  {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.browserRefresh = !router.navigated;
      }
    });
    
    if(!this.browserRefresh)
    {
      this.af.signOut()
    }
  }

  async ngOnInit() 
  {
    console.log("Init")
    this.authSvc.cargarUsuarios()
    await this.authSvc.RecuperarUsuario()
  }

  ngOnDestroy() {

  }

  mostrarChat=false;

  LogOut()
  {
    this.authSvc.LogOut()
    this.router.navigate(['']);
  } 

  onActivate(event) {
 
    window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
     });
 
    document.body.scrollTop = 0;
    document.querySelector('body').scrollTo(0,0)

 }

}


