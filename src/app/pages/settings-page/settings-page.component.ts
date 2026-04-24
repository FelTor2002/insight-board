import { Component, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { I18nService, Language } from '../../core/i18n.service';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css'
})
export class SettingsPageComponent {
  readonly i18n = inject(I18nService);

  get text() {
    return this.i18n.text().settings;
  }

  get language(): Language {
    return this.i18n.language();
  }

  get locale(): string {
    return this.i18n.locale();
  }

  setLanguage(language: Language): void {
    this.i18n.setLanguage(language);
  }
}

