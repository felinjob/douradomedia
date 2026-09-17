import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { c as renderComponent, h as maybeRenderHead, m as renderTemplate } from "./server_Dm9vjhzq.mjs";
import { t as createComponent } from "./compiler_f7x0-SKD.mjs";
import { n as $$TacticalContainer, r as $$BaseLayout, t as $$HudBadge } from "./HudBadge_CLLuj0zq.mjs";
import { t as $$TacticalButton } from "./TacticalButton_CliqWvaA.mjs";
//#region src/pages/theme-test.astro
var theme_test_exports = /* @__PURE__ */ __exportAll({
	default: () => $$ThemeTest,
	file: () => $$file,
	url: () => $$url
});
var $$ThemeTest = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Theme Engine Test" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section data-theme-section="abyssal" class="min-h-screen flex flex-col items-center justify-center p-4">${renderComponent($$result, "TacticalContainer", $$TacticalContainer, { "class": "max-w-2xl w-full" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "HudBadge", $$HudBadge, {
		"text": "ABYSSAL",
		"variant": "abyssal",
		"class": "mb-4"
	})}<h1 class="font-display text-4xl md:text-6xl font-black mb-4">Deep Water Ops</h1><p class="font-body text-lg opacity-80 mb-8 max-w-lg">Testing the Abyssal theme transition. Scrolling down will trigger the observer and gracefully change the global root variables.</p>${renderComponent($$result, "TacticalButton", $$TacticalButton, { "text": "Engage" })}` })}<div class="mt-20 animate-pulse opacity-50">${renderComponent($$result, "HudBadge", $$HudBadge, {
		"text": "SCROLL DOWN",
		"variant": "abyssal"
	})}</div></section><section data-theme-section="organic" class="min-h-screen flex flex-col items-center justify-center p-4">${renderComponent($$result, "TacticalContainer", $$TacticalContainer, { "class": "max-w-2xl w-full" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "HudBadge", $$HudBadge, {
		"text": "ORGANIC",
		"variant": "organic",
		"class": "mb-4"
	})}<h1 class="font-display text-4xl md:text-6xl font-black mb-4">Surface Terrain</h1><p class="font-body text-lg opacity-80 mb-8 max-w-lg">Testing the Organic theme transition, moving to lighter tones and vibrant high-contrast accents.</p>${renderComponent($$result, "TacticalButton", $$TacticalButton, { "text": "Explore" })}` })}<div class="mt-20 animate-pulse opacity-50">${renderComponent($$result, "HudBadge", $$HudBadge, {
		"text": "SCROLL DOWN",
		"variant": "organic"
	})}</div></section><section data-theme-section="tactical" class="min-h-screen flex items-center justify-center p-4">${renderComponent($$result, "TacticalContainer", $$TacticalContainer, { "class": "max-w-2xl w-full" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "HudBadge", $$HudBadge, {
		"text": "TACTICAL",
		"variant": "tactical",
		"class": "mb-4"
	})}<h1 class="font-display text-4xl md:text-6xl font-black mb-4">Night Vision</h1><p class="font-body text-lg opacity-80 mb-8 max-w-lg">Testing the Tactical theme transition, reverting to high contrast dark mode for equipment and night operations.</p>${renderComponent($$result, "TacticalButton", $$TacticalButton, { "text": "Deploy" })}` })}</section>` })}`;
}, "C:/Users/felin/Documents/dourado-portfolio/src/pages/theme-test.astro", void 0);
var $$file = "C:/Users/felin/Documents/dourado-portfolio/src/pages/theme-test.astro";
var $$url = "/theme-test";
//#endregion
//#region \0virtual:astro:page:src/pages/theme-test@_@astro
var page = () => theme_test_exports;
//#endregion
export { page };
