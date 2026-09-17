import { D as createAstro, T as unescapeHTML, _ as addAttribute, c as renderComponent, d as renderSlot, g as renderHead, h as maybeRenderHead, m as renderTemplate, v as createRenderInstruction } from "./server_Dm9vjhzq.mjs";
import { t as createComponent } from "./compiler_f7x0-SKD.mjs";
//#region node_modules/astro/dist/runtime/server/render/script.js
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
//#endregion
//#region src/components/core/SeoHead.astro
createAstro("https://brunodourado.vercel.app");
var $$SeoHead = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SeoHead;
	const { title, description = "Portfólio de Bruno Dourado. Diretor de Fotografia especializado em ambientes inóspitos, Pesca Submarina, Alta Gastronomia e Moda Editorial.", image = "/assets/og-cover.png" } = Astro.props;
	const canonicalURL = new URL(Astro.url.pathname, Astro.site || "https://brunodourado.vercel.app");
	const schema = {
		"@context": "https://schema.org",
		"@graph": [{
			"@type": "Person",
			"@id": `${canonicalURL}#person`,
			"name": "Bruno Dourado",
			"jobTitle": "Director of Photography / Filmmaker",
			"url": canonicalURL,
			"sameAs": ["https://instagram.com/brunodourado", "https://vimeo.com/brunodourado"],
			"knowsAbout": [
				"Cinematography",
				"Spearfishing",
				"Gastronomy",
				"Fashion Editorial",
				"Underwater Filming"
			]
		}, {
			"@type": "WebSite",
			"@id": `${canonicalURL}#website`,
			"url": canonicalURL,
			"name": "Bruno Dourado - DOP",
			"description": description,
			"publisher": { "@id": `${canonicalURL}#person` }
		}]
	};
	return renderTemplate`<!-- Global Metadata --><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro.generator, "content")}><!-- Canonical URL --><link rel="canonical"${addAttribute(canonicalURL, "href")}><!-- Primary Meta Tags --><title>${title}</title><meta name="title"${addAttribute(title, "content")}><meta name="description"${addAttribute(description, "content")}><meta name="theme-color" content="#000000"><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(canonicalURL, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(new URL(image, Astro.url), "content")}><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(canonicalURL, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image"${addAttribute(new URL(image, Astro.url), "content")}><!-- Schema.org JSON-LD --><script type="application/ld+json">${unescapeHTML(JSON.stringify(schema))}<\/script>`;
}, "C:/Users/felin/Documents/dourado-portfolio/src/components/core/SeoHead.astro", void 0);
//#endregion
//#region src/components/tactical/SectionDock.astro
var $$SectionDock = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div id="dock-wrapper" class="fixed bottom-6 left-1/2 z-50 pointer-events-auto" style="transform: translateX(-50%) translateY(0) scale(1); opacity: 1; transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;" data-astro-cid-v526elzj><nav class="pointer-events-auto bg-black/40 backdrop-blur-md border border-zinc-900/60 rounded-full p-1 flex items-center gap-1 shadow-lg" id="section-dock" data-astro-cid-v526elzj><a href="#spearfishing" aria-label="Ir para Pesca Submarina" class="dock-btn group relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:bg-zinc-800/50 active:scale-95" data-target="spearfishing" data-astro-cid-v526elzj><!-- Spearfishing Icon (Crosshair / Harpoon) --><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-500 group-[.active]:text-cyan-400 group-hover:text-cyan-300 transition-colors" data-astro-cid-v526elzj><circle cx="12" cy="12" r="10" data-astro-cid-v526elzj></circle><line x1="22" y1="12" x2="18" y2="12" data-astro-cid-v526elzj></line><line x1="6" y1="12" x2="2" y2="12" data-astro-cid-v526elzj></line><line x1="12" y1="6" x2="12" y2="2" data-astro-cid-v526elzj></line><line x1="12" y1="22" x2="12" y2="18" data-astro-cid-v526elzj></line><circle cx="12" cy="12" r="2" data-astro-cid-v526elzj></circle></svg></a><a href="#gastronomy" aria-label="Ir para Gastronomia" class="dock-btn group relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:bg-zinc-800/50 active:scale-95" data-target="gastronomy" data-astro-cid-v526elzj><!-- Gastronomy Icon (Flame) --><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-500 group-[.active]:text-orange-500 group-hover:text-orange-400 transition-colors" data-astro-cid-v526elzj><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" data-astro-cid-v526elzj></path></svg></a><a href="#fashion" aria-label="Ir para Moda" class="dock-btn group relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:bg-zinc-800/50 active:scale-95" data-target="fashion" data-astro-cid-v526elzj><!-- Fashion Icon (Needle / Thread) --><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-500 group-[.active]:text-zinc-200 group-hover:text-zinc-300 transition-colors" data-astro-cid-v526elzj><path d="M14.5 2a2.5 2.5 0 0 0-5 0v9a2.5 2.5 0 0 1 5 0V2z" data-astro-cid-v526elzj></path><path d="M12 13.5V22" data-astro-cid-v526elzj></path></svg></a><div class="w-px h-6 bg-zinc-800/60 mx-1" data-astro-cid-v526elzj></div><a href="https://wa.me/5511999999999?text=Ol%C3%A1%20Bruno%2C%20vi%20o%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20um%20or%C3%A7amento." target="_blank" rel="noopener noreferrer" aria-label="Contato via WhatsApp" class="dock-btn group relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:bg-zinc-800/50 active:scale-95" data-astro-cid-v526elzj><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-400 group-hover:text-zinc-100 transition-colors" data-astro-cid-v526elzj><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" data-astro-cid-v526elzj></path></svg></a></nav></div>${renderScript($$result, "C:/Users/felin/Documents/dourado-portfolio/src/components/tactical/SectionDock.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/felin/Documents/dourado-portfolio/src/components/tactical/SectionDock.astro", void 0);
//#endregion
//#region src/layouts/BaseLayout.astro
createAstro("https://brunodourado.vercel.app");
var $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BaseLayout;
	const { title = "Tactical AV Platform", description } = Astro.props;
	return renderTemplate`<html lang="pt-BR" data-theme="tactical"><head>${renderComponent($$result, "SeoHead", $$SeoHead, {
		"title": title,
		"description": description
	})}${renderHead($$result)}</head><body class="min-h-screen selection:bg-accent selection:text-black">${renderSlot($$result, $$slots["default"])}${renderComponent($$result, "SectionDock", $$SectionDock, {})}${renderScript($$result, "C:/Users/felin/Documents/dourado-portfolio/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "C:/Users/felin/Documents/dourado-portfolio/src/layouts/BaseLayout.astro", void 0);
//#endregion
//#region src/components/tactical/TacticalContainer.astro
createAstro("https://brunodourado.vercel.app");
var $$TacticalContainer = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$TacticalContainer;
	const { class: className = "" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(`@container hud-border relative p-4 md:p-8 bg-black/20 backdrop-blur-sm ${className}`, "class")}><!-- Marcadores técnicos HUD --><div class="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent opacity-50" aria-hidden="true"></div><div class="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent opacity-50" aria-hidden="true"></div>${renderSlot($$result, $$slots["default"])}</div>`;
}, "C:/Users/felin/Documents/dourado-portfolio/src/components/tactical/TacticalContainer.astro", void 0);
//#endregion
//#region src/components/tactical/HudBadge.astro
createAstro("https://brunodourado.vercel.app");
var $$HudBadge = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HudBadge;
	const { text, variant = "default", class: className = "" } = Astro.props;
	const variantClasses = {
		abyssal: "bg-cyan-900/30 text-cyan-400 border-cyan-800",
		organic: "bg-orange-900/30 text-orange-400 border-orange-800",
		tactical: "bg-yellow-900/30 text-yellow-400 border-yellow-800",
		default: "bg-zinc-800/50 text-zinc-300 border-zinc-700"
	};
	const colors = variantClasses[variant] || variantClasses.default;
	return renderTemplate`${maybeRenderHead($$result)}<span${addAttribute(`inline-flex items-center px-2 py-1 text-[10px] font-mono tracking-widest uppercase border ${colors} ${className}`, "class")}>${text}</span>`;
}, "C:/Users/felin/Documents/dourado-portfolio/src/components/tactical/HudBadge.astro", void 0);
//#endregion
export { renderScript as i, $$TacticalContainer as n, $$BaseLayout as r, $$HudBadge as t };
