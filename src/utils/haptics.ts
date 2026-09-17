/**
 * Utilitário de Feedback Háptico
 * Possui fallback gracioso se não for suportado pelo dispositivo/navegador.
 */
export function triggerHaptic(duration = 50): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator && typeof navigator.vibrate === 'function') {
    try {
      navigator.vibrate(duration);
    } catch (err) {
      // Falha silenciosa para manter degradação graciosa
    }
  }
}
