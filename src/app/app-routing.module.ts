import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { GalleryComponent } from './gallery/gallery.component';
import { QualitycontrolComponent} from './qualitycontrol/qualitycontrol.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path:'about',component: AboutComponent},
  {path:'contact', component: ContactComponent},
  {path:'gallery', component: GalleryComponent},
  { path: 'quality-control', component: QualitycontrolComponent },
  
];

@NgModule({
 imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
