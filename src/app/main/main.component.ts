import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'; // Import animation modules

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [ // Add animations metadata
    trigger('fadeInAnimation', [
      state('show', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('hide', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      transition('hide => show', animate('600ms ease-out')) // Animate in from hidden state
    ])
  ]
})
export class MainComponent implements OnInit {

  showMainContent: string = 'hide'; // State variable for animation

  constructor() { }

  ngOnInit(): void {
    this.showMainContent = 'show'; // Trigger animation on component load
  }

}

