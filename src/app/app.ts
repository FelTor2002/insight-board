import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { I18nService, Language } from './core/i18n.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly i18n = inject(I18nService);

  get text() {
    return this.i18n.text();
  }

  get language(): Language {
    return this.i18n.language();
  }

  setLanguage(language: Language): void {
    this.i18n.setLanguage(language);
  }
}
