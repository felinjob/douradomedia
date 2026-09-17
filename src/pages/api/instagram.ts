import type { APIRoute } from 'astro';
import { FallbackCatalog } from '../../utils/media-fallback';

export const GET: APIRoute = async () => {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
  };

  try {
    const token = import.meta.env.INSTAGRAM_TOKEN || process.env.INSTAGRAM_TOKEN;
    
    if (!token) {
      console.warn('[API/Instagram] INSTAGRAM_TOKEN ausente. Servindo fallback resiliente.');
      return new Response(JSON.stringify({ data: FallbackCatalog }), { status: 200, headers });
    }

    const res = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${token}`);
    
    if (!res.ok) {
      console.error(`[API/Instagram] Erro da Meta (${res.status}). Servindo fallback resiliente.`);
      return new Response(JSON.stringify({ data: FallbackCatalog }), { status: 200, headers });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200, headers });

  } catch (error) {
    console.error('[API/Instagram] Exceção na rota. Servindo fallback resiliente.', error);
    return new Response(JSON.stringify({ data: FallbackCatalog }), { status: 200, headers });
  }
};
