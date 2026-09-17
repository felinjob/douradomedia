/**
 * Motor reativo de Temas - Observer
 * Altera o data-theme no elemento :root baseado no atributo data-theme-section
 */
const initThemeObserver = () => {
  const root = document.documentElement;
  const sections = document.querySelectorAll<HTMLElement>('[data-theme-section]');

  if (sections.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Se a seção estiver ocupando grande parte da visão
      if (entry.isIntersecting) {
        const theme = entry.target.getAttribute('data-theme-section');
        if (theme) {
          root.setAttribute('data-theme', theme);
        }
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '0px'
  });

  sections.forEach((sec) => observer.observe(sec));
};

document.addEventListener('DOMContentLoaded', initThemeObserver);
document.addEventListener('astro:page-load', initThemeObserver);
