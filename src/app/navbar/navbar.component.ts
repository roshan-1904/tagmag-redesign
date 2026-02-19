import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  scrolled: boolean = false; 
  isMenuOpen: boolean = false; 

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goAbout() {
    this.router.navigate(['/about']);
    this.isMenuOpen = false; 
  }

  goContact() {
    this.router.navigate(['/contact']);
    this.isMenuOpen = false; 
  }
  gotogallery() {
    this.router.navigate(['/gallery']);
    this.isMenuOpen = false; 
  }
  gotoqualitycontrol() {
    this.router.navigate(['/quality-control']);
    this.isMenuOpen = false; 
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.pageYOffset > 50;
  }
}
