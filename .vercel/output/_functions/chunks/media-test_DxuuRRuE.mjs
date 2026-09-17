import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { c as renderComponent, h as maybeRenderHead, m as renderTemplate } from "./server_Dm9vjhzq.mjs";
import { t as createComponent } from "./compiler_f7x0-SKD.mjs";
import { n as $$TacticalContainer, r as $$BaseLayout, t as $$HudBadge } from "./HudBadge_CLLuj0zq.mjs";
import { i as $$HeroPlayer, n as $$LiteVimeo, r as $$LiteYouTube, t as $$ReelCard } from "./ReelCard_0BkNIw_y.mjs";
//#region src/pages/media-test.astro
var media_test_exports = /* @__PURE__ */ __exportAll({
	default: () => $$MediaTest,
	file: () => $$file,
	url: () => $$url
});
var $$MediaTest = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Media Engine Test" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "HeroPlayer", $$HeroPlayer, { "title": "Cinematic Showreel" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="relative z-30">${renderComponent($$result, "HudBadge", $$HudBadge, {
		"text": "HERO MODULE",
		"variant": "tactical",
		"class": "mb-4"
	})}<h1 class="font-display text-4xl md:text-6xl font-black text-white">Media Engine Test</h1><p class="text-white/80 max-w-lg mt-4 font-mono text-sm">Zero CLS. Shadow DOM isolation. Facade pattern.<br>Native HTML5 video underneath HUD calibration lines.</p></div>` })}<main class="py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-16"><section>${renderComponent($$result, "HudBadge", $$HudBadge, {
		"text": "WIDESCREEN FACADES",
		"variant": "default",
		"class": "mb-8"
	})}<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">${renderComponent($$result, "TacticalContainer", $$TacticalContainer, {}, { "default": ($$result) => renderTemplate`<h2 class="font-display text-2xl mb-4 text-text-primary">YouTube Lite</h2>${renderComponent($$result, "LiteYouTube", $$LiteYouTube, {
		"videoId": "eRsGyueVLvQ",
		"title": "Sintel - Third Party Render"
	})}` })}${renderComponent($$result, "TacticalContainer", $$TacticalContainer, {}, { "default": ($$result) => renderTemplate`<h2 class="font-display text-2xl mb-4 text-text-primary">Vimeo Pro Lite</h2>${renderComponent($$result, "LiteVimeo", $$LiteVimeo, {
		"videoId": "76979871",
		"title": "Vimeo Facade Test"
	})}` })}</div></section><section>${renderComponent($$result, "HudBadge", $$HudBadge, {
		"text": "SHADOW DOM REELS",
		"variant": "organic",
		"class": "mb-8"
	})}${renderComponent($$result, "TacticalContainer", $$TacticalContainer, { "class": "bg-black/50" }, { "default": ($$result) => renderTemplate`<div class="flex flex-col md:flex-row gap-8 justify-center items-center">${renderComponent($$result, "ReelCard", $$ReelCard, {
		"title": "UNDERWATER DIVE",
		"duration": "00:15",
		"reelId": "Cq3_example"
	})}${renderComponent($$result, "ReelCard", $$ReelCard, {
		"title": "MACRO CULINARY",
		"duration": "00:22",
		"reelId": "Cq4_example"
	})}</div>` })}</section></main>` })}`;
}, "C:/Users/felin/Documents/dourado-portfolio/src/pages/media-test.astro", void 0);
var $$file = "C:/Users/felin/Documents/dourado-portfolio/src/pages/media-test.astro";
var $$url = "/media-test";
//#endregion
//#region \0virtual:astro:page:src/pages/media-test@_@astro
var page = () => media_test_exports;
//#endregion
export { page };
