import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate, query, stagger, group } from '@angular/animations'; // Added query, stagger, group

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('hide', style({
        opacity: 0,
        transform: 'translateY(50px)'
      })),
      transition('hide => show', animate('700ms ease-out')),
      transition('show => hide', animate('700ms ease-out'))
    ]),
    trigger('heroAnimation', [
      state('show', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('hide', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      transition('hide => show', animate('1000ms ease-out')),
    ]),
    trigger('staggerFadeIn', [ // New trigger for staggered text
      transition('hide => show', [ // Animate when state changes from hide to show
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms', [ // Stagger each item by 100ms
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ]),
      transition('show => hide', [ // Animate out
        query(':leave', [
          stagger('50ms', [
            animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(20px)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class AboutComponent implements OnInit {

  showContent: string = 'hide'; // State for the main content section
  showHero: string = 'hide';     // State for the hero section content
  heroBackgroundPosition: string = 'center 0px'; // For parallax effect

  constructor(public el: ElementRef) { } // Make el public to access nativeElement

  ngOnInit(): void {
    // Trigger hero animation immediately on init
    this.showHero = 'show';
    // Initial scroll check to ensure content animates if already in view on load
    this.checkScroll();
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const aboutSectionElement = this.el.nativeElement.querySelector('.about-section');
    if (!aboutSectionElement) return; // Guard against element not found

    const componentPosition = aboutSectionElement.offsetTop;
    const scrollPosition = window.pageYOffset + window.innerHeight;

    // For main content scroll animation
    if (scrollPosition > componentPosition + 100) { // Adjust offset as needed
      this.showContent = 'show';
    } else {
      this.showContent = 'hide'; // Hide if scrolled back up
    }

    // For hero parallax background effect
    const heroElement = this.el.nativeElement.querySelector('.about-hero');
    if (heroElement) {
      const heroRect = heroElement.getBoundingClientRect();
      const scrollY = window.pageYOffset;
      // Calculate a slower scroll rate for the background
      // This makes the background move less than the foreground
      const parallaxSpeed = 0.3; // Adjust this value for desired parallax intensity
      const backgroundY = -(scrollY * parallaxSpeed);
      this.heroBackgroundPosition = `center ${backgroundY}px`;
    }
  }
}
