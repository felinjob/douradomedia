export interface MediaMetadata {
  id: string;
  platform: 'youtube' | 'vimeo' | 'instagram';
  posterUrl?: string;
  title?: string;
  duration?: string;
}

/**
 * Catálogo de segurança local para quando serviços externos falharem ou para testes offline.
 */
export const FallbackCatalog: Record<string, MediaMetadata> = {
  'default-yt': {
    id: 'default-yt',
    platform: 'youtube',
    title: 'Showreel (Fallback)',
    duration: '01:30'
  },
  'default-vimeo': {
    id: 'default-vimeo',
    platform: 'vimeo',
    title: 'Director\'s Cut (Fallback)',
    duration: '02:45'
  },
  'default-reel': {
    id: 'default-reel',
    platform: 'instagram',
    title: 'BTS (Fallback)',
    duration: '00:15'
  }
};
