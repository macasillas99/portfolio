import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { AppComponent } from './app.component';
import { ProjectsComponent, HomeComponent, ResumeComponent, AboutComponent, NotFoundComponent } from './pages';
import { routes } from './app.routes';

describe('Portfolio', () => {
  beforeEach(() => TestBed.configureTestingModule({providers:[provideRouter(routes)]}));
  it('provides four keyboard-reachable navigation links and a skip link', () => {
    const fixture=TestBed.createComponent(AppComponent);fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('nav a').length).toBe(4);
    expect(fixture.nativeElement.querySelector('.skip-link').getAttribute('href')).toBe('#main-content');
  });
  for (const [path,component,text] of [
    ['/',HomeComponent,'Hi, I’m Maxine.'],['/resume',ResumeComponent,'Maxine Casillas'],
    ['/about',AboutComponent,'Behind the interface.'],['/projects',ProjectsComponent,'Work from the journey.'],
    ['/unknown',NotFoundComponent,'This page drifted off course.']
  ] as const) {
    it(`renders direct navigation to ${path}`, async () => {
      const harness=await RouterTestingHarness.create();
      await harness.navigateByUrl(path,component);
      expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(text);
    });
  }
  it('filters projects through the actual filter button and restores all results', () => {
    const fixture=TestBed.createComponent(ProjectsComponent);fixture.detectChanges();
    const buttons=fixture.nativeElement.querySelectorAll('button');
    buttons[3].click();fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('article').length).toBe(1);
    expect(fixture.nativeElement.querySelector('article h2').textContent).toBe('bioSite');
    expect(buttons[3].getAttribute('aria-pressed')).toBe('true');
    buttons[0].click();fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('article').length).toBe(3);
  });
  it('provides distinct source links and expandable mission notes for each project', () => {
    const fixture=TestBed.createComponent(ProjectsComponent);fixture.detectChanges();
    const links=[...fixture.nativeElement.querySelectorAll('article a')] as HTMLAnchorElement[];
    expect(new Set(links.map(a=>a.href)).size).toBe(3);
    expect(links.every(a=>a.href.startsWith('https://github.com/macasillas99/') && a.rel.includes('noopener'))).toBe(true);
    expect(fixture.nativeElement.querySelectorAll('details summary').length).toBe(3);
  });
  it('offers a downloadable PDF résumé', () => {
    const fixture=TestBed.createComponent(ResumeComponent);fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('a[download]').getAttribute('href')).toBe('maxine-casillas-resume.pdf');
  });
  it('provides recovery links from an unknown route', () => {
    const fixture=TestBed.createComponent(NotFoundComponent);fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.actions a').length).toBe(2);
  });
});
