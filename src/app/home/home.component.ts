import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations'; // Added animation imports

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('sectionFadeIn', [
      state('show', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('hide', style({
        opacity: 0,
        transform: 'translateY(50px)'
      })),
      transition('hide => show', animate('800ms ease-out')),
      transition('show => hide', animate('600ms ease-out'))
    ]),
    trigger('itemStaggerFadeIn', [
      transition('hide => show', [
        query('.list .item, .tag, .content-box h1, .content-box p, .content-box .btn-primary, .image-box img',
          [
            style({ opacity: 0, transform: 'translateY(30px)' }),
            stagger('100ms', [
              animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
          ], { optional: true })
      ])
    ]),
    trigger('sliderContentAnimation', [ 
      transition(':enter', [ 
        query('h1, p, .btn-primary', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('150ms', [
            animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class HomeComponent implements OnInit { 

  current = 0;
  slides = [
    {
    img: '	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQosKyJIfh77BwsJ6_xPZD-0eO3LCF05gzo1g&s',
    title: 'WELCOME TO TANMAG',
    desc: 'Leading the future of magnesite mining with innovation and sustainability.'
  },
  {
    img: 'https://tanmag.org/design/images/about-slider/1-ab.jpg',
    title: 'MINING EXCELLENCE',
    desc: 'Advanced techniques for high-quality magnesite extraction.'
  },
  {
    img: 'https://tanmag.org/design/images/qq1.png',
    title: 'SUSTAINABLE DEVELOPMENT',
    desc: 'Committed to environmental preservation and community growth.'
  }
  ];

  infoSectionState: string = 'hide';
  tanmagSectionState: string = 'hide';

  constructor(private el: ElementRef) { }

  ngOnInit() {
    setInterval(() => this.next(), 5000);
    this.checkScroll(); 
  }

  next() {
    this.current = (this.current + 1) % this.slides.length;
  }

  prev() {
    this.current = (this.current - 1 + this.slides.length) % this.slides.length;
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    // Info Section Animation
    const infoSection = this.el.nativeElement.querySelector('.info-section');
    if (infoSection) {
      const infoSectionPosition = infoSection.offsetTop;
      const scrollPosition = window.pageYOffset + window.innerHeight;
      if (scrollPosition > infoSectionPosition + 150) { // Adjust offset as needed
        this.infoSectionState = 'show';
      } else {
        this.infoSectionState = 'hide';
      }
    }

   
    const tanmagSection = this.el.nativeElement.querySelector('.tanmag-section');
    if (tanmagSection) {
      const tanmagSectionPosition = tanmagSection.offsetTop;
      const scrollPosition = window.pageYOffset + window.innerHeight;
      if (scrollPosition > tanmagSectionPosition + 150) { // Adjust offset as needed
        this.tanmagSectionState = 'show';
      } else {
        this.tanmagSectionState = 'hide';
      }
    }
  }
}

