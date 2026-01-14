import "jquery";

declare global {
  interface JQuery {
    koiAnimation(options?: any): JQuery<HTMLElement>;
  }
}