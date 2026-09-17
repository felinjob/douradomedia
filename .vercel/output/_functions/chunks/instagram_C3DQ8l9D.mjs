import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
//#region src/utils/media-fallback.ts
/**
* Catálogo de segurança local para quando serviços externos falharem ou para testes offline.
*/
var FallbackCatalog = {
	"default-yt": {
		id: "default-yt",
		platform: "youtube",
		title: "Showreel (Fallback)",
		duration: "01:30"
	},
	"default-vimeo": {
		id: "default-vimeo",
		platform: "vimeo",
		title: "Director's Cut (Fallback)",
		duration: "02:45"
	},
	"default-reel": {
		id: "default-reel",
		platform: "instagram",
		title: "BTS (Fallback)",
		duration: "00:15"
	}
};
//#endregion
//#region src/pages/api/instagram.ts
var instagram_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async () => {
	const headers = {
		"Content-Type": "application/json",
		"Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200"
	};
	try {
		const token = process.env.INSTAGRAM_TOKEN;
		if (!token) {
			console.warn("[API/Instagram] INSTAGRAM_TOKEN ausente. Servindo fallback resiliente.");
			return new Response(JSON.stringify({ data: FallbackCatalog }), {
				status: 200,
				headers
			});
		}
		const res = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${token}`);
		if (!res.ok) {
			console.error(`[API/Instagram] Erro da Meta (${res.status}). Servindo fallback resiliente.`);
			return new Response(JSON.stringify({ data: FallbackCatalog }), {
				status: 200,
				headers
			});
		}
		const data = await res.json();
		return new Response(JSON.stringify(data), {
			status: 200,
			headers
		});
	} catch (error) {
		console.error("[API/Instagram] Exceção na rota. Servindo fallback resiliente.", error);
		return new Response(JSON.stringify({ data: FallbackCatalog }), {
			status: 200,
			headers
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/instagram@_@ts
var page = () => instagram_exports;
//#endregion
export { page };
