import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  scrolled: boolean = false; // New property to track scroll state
  isMenuOpen: boolean = false; // New property to control mobile menu visibility

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goAbout() {
    this.router.navigate(['/about']);
    this.isMenuOpen = false; // Close menu after navigation
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Check if the user has scrolled beyond a certain point (e.g., 50px)
    this.scrolled = window.pageYOffset > 50;
  }
}
