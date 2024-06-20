import { Store } from '@ngrx/store';
import { Component, OnInit, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { authUserSelector } from './Reducer/MyUserState/auth.selectors';
import {
  animate,
  animateChild,
  group,
  keyframes,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ChildrenOutletContexts } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnimations', [
      transition('test => FoodDetailPageOff', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }),
        ]),
        query(':enter', [style({ left: '100%' })], { optional: true }),
        query(':leave', animateChild(), { optional: true }),
        group([
          query(
            ':leave',
            [animate('300ms ease-out', style({ left: '-100%' }))],
            { optional: true }
          ),
          query(':enter', [animate('300ms ease-out', style({ left: '0%' }))], {
            optional: true,
          }),
        ]),
      ]),
      transition('FoodDetailPageOff => *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }),
        ]),
        query(':enter', [style({ left: '100%' })], { optional: true }),
        query(':leave', animateChild(), { optional: true }),
        group([
          query(
            ':leave',
            [animate('300ms ease-out', style({ left: '100%' }))],
            { optional: true }
          ),
          query(':enter', [animate('300ms ease-out', style({ left: '0' }))], {
            optional: true,
          }),
        ]),
      ]),
      transition('CartOff => *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }),
        ]),
        query(':enter', [style({ left: '100%' })], { optional: true }),
        query(':leave', animateChild(), { optional: true }),
        group([
          query(
            ':leave',
            [animate('300ms ease-out', style({ left: '100%' }))],
            { optional: true }
          ),
          query(':enter', [animate('300ms ease-out', style({ left: '0' }))], {
            optional: true,
          }),
        ]),
      ]),
      transition('test => CartOff', [
        style({ transform: 'translateY(10000%)' }),
        animate(
          '400ms cubic-bezier(0.64, 0.4, 0.12, 0.97)',
          style({
            transform: 'translateY(0%)',
          })
        ),
      ]),
      transition(':leave', [
        animate(
          '400ms cubic-bezier(0.64, 0.4, 0.12, 0.97)',
          style({
            transform: 'translateY(-1000%)',
          })
        ),
      ]),
      transition('test => OfferOffline', [
        style({ transform: 'translateY(10000%)' }),
        animate(
          '400ms cubic-bezier(0.64, 0.4, 0.12, 0.97)',
          style({
            transform: 'translateY(0%)',
          })
        ),
      ]),
      transition(':leave', [
        animate(
          '400ms cubic-bezier(0.64, 0.4, 0.12, 0.97)',
          style({
            transform: 'translateY(-1000%)',
          })
        ),
      ]),
      transition('OfferOffline => *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }),
        ]),
        query(':enter', [style({ left: '100%' })], { optional: true }),
        query(':leave', animateChild(), { optional: true }),
        group([
          query(
            ':leave',
            [animate('300ms ease-out', style({ left: '100%' }))],
            { optional: true }
          ),
          query(':enter', [animate('300ms ease-out', style({ left: '0' }))], {
            optional: true,
          }),
        ]),
      ]),
      transition('OfferDetail => *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }),
        ]),
        query(':enter', [style({ left: '100%' })], { optional: true }),
        query(':leave', animateChild(), { optional: true }),
        group([
          query(
            ':leave',
            [animate('300ms ease-out', style({ left: '100%' }))],
            { optional: true }
          ),
          query(':enter', [animate('300ms ease-out', style({ left: '0' }))], {
            optional: true,
          }),
        ]),
      ]),
      transition('OfferOffline => OfferDetail', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }),
        ]),
        query(':enter', [style({ left: '100%' })], { optional: true }),
        query(':leave', animateChild(), { optional: true }),
        group([
          query(
            ':leave',
            [animate('300ms ease-out', style({ left: '-100%' }))],
            { optional: true }
          ),
          query(':enter', [animate('300ms ease-out', style({ left: '0%' }))], {
            optional: true,
          }),
        ]),
      ]),
      // transition('* <=> *', [
      //   style({ position: 'relative' }),
      //   query(
      //     ':enter, :leave',
      //     [
      //       style({
      //         position: 'absolute',
      //         top: 0,
      //         left: 0,
      //         width: '100%',
      //       }),
      //     ],
      //     { optional: true }
      //   ),
      //   query(':enter', [style({ left: '-100%' })], { optional: true }),
      //   query(':leave', animateChild(), { optional: true }),
      //   group([
      //     query(
      //       ':leave',
      //       [animate('200ms ease-out', style({ left: '100%', opacity: 0 }))],
      //       {
      //         optional: true,
      //       }
      //     ),
      //     query(':enter', [animate('300ms ease-out', style({ left: '0%' }))], {
      //       optional: true,
      //     }),
      //     query('@*', animateChild(), { optional: true }),
      //   ]),
      // ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  contexts = inject(ChildrenOutletContexts);
  ngOnInit() {}
  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
