import { Injectable, Inject, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme: 'light-theme' | 'dark-theme' = 'light-theme';
  private isBrowser: boolean;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const storedTheme = localStorage.getItem('theme') as 'dark-theme' | 'light-theme' | null;
      if (storedTheme) {
        this.setTheme(storedTheme);
      } else {
        this.setTheme(this.currentTheme);
      }
    }
  }

  setTheme(theme: 'light-theme' | 'dark-theme') {
    if (!this.isBrowser) return;

    this.renderer.removeClass(document.body, this.currentTheme);
    this.renderer.addClass(document.body, theme);
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
    this.setTheme(newTheme);
  }

  getTheme(): 'light-theme' | 'dark-theme' {
    return this.currentTheme;
  }

  isDark(): boolean {
    return this.currentTheme === 'dark-theme';
  }
}
