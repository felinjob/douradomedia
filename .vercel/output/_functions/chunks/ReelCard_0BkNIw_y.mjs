import { D as createAstro, _ as addAttribute, c as renderComponent, d as renderSlot, h as maybeRenderHead, m as renderTemplate, n as templateEnter, r as templateExit } from "./server_Dm9vjhzq.mjs";
import { t as createComponent } from "./compiler_f7x0-SKD.mjs";
import { i as renderScript } from "./HudBadge_CLLuj0zq.mjs";
import { n as $$Image } from "./_astro_assets_DNc3ASxG.mjs";
//#region src/assets/placeholder.png
var placeholder_default = new Proxy({
	"src": "/_astro/placeholder.5vcyeoBI.png",
	"width": 1,
	"height": 1,
	"format": "png"
}, { get(target, name, receiver) {
	if (name === "clone") return structuredClone(target);
	if (name === "fsPath") return "C:/Users/felin/Documents/dourado-portfolio/src/assets/placeholder.png";
	return target[name];
} });
//#endregion
//#region src/components/media/HeroPlayer.astro
createAstro("https://brunodourado.vercel.app");
var $$HeroPlayer = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HeroPlayer;
	const { videoUrl = "/assets/hero-placeholder.mp4", posterImg = placeholder_default, title = "Hero Video" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="relative w-full h-screen min-h-[600px] flex flex-col justify-center items-center overflow-hidden"><!-- Overlay Gradient e Linha Central --><div class="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-transparent via-transparent to-transparent"></div><!-- Contêiner do Vídeo Principal --><div class="absolute inset-0 w-full h-full z-10 flex items-center justify-center"><!-- Contêiner do Vídeo Principal (Full Screen) --><div class="absolute inset-0 z-0">${renderComponent($$result, "Image", $$Image, {
		"src": posterImg,
		"alt": title,
		"class": "w-full h-full object-cover opacity-60",
		"format": "avif",
		"fallbackFormat": "webp",
		"loading": "eager",
		"decoding": "sync"
	})}</div><!-- HTML5 Video --><video${addAttribute(videoUrl, "src")} autoplay muted loop playsinline class="absolute inset-0 w-full h-full object-cover z-10 opacity-70 mix-blend-screen" aria-hidden="true"></video><!-- Overlay Gradient Inferior para transição suave com a página --><div class="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-black via-black/20 to-transparent"></div><!-- Crosshair central sutil --><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 opacity-20 pointer-events-none z-20 flex items-center justify-center"><div class="w-[1px] h-full bg-white"></div><div class="absolute w-full h-[1px] bg-white"></div></div><!-- Content Area centralizada --><div class="relative z-30 flex flex-col items-center justify-center text-center h-full p-8 md:p-16 w-full pt-32">${renderSlot($$result, $$slots["default"])}</div></div></section>`;
}, "C:/Users/felin/Documents/dourado-portfolio/src/components/media/HeroPlayer.astro", void 0);
//#endregion
//#region src/components/media/LiteYouTube.astro
createAstro("https://brunodourado.vercel.app");
var $$LiteYouTube = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$LiteYouTube;
	const { videoId, title, aspect = "16/9" } = Astro.props;
	const posterUrl = `https://i.ytimg.com/vi_webp/${videoId}/maxresdefault.webp`;
	return renderTemplate`${renderComponent($$result, "lite-youtube", "lite-youtube", {
		"data-videoid": videoId,
		"data-title": title,
		"class": "relative block w-full bg-black cursor-pointer group hud-border overflow-hidden",
		"style": `aspect-ratio: ${aspect};`,
		"aria-label": `Play video: ${title}`,
		"tabindex": "0"
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<img${addAttribute(posterUrl, "src")}${addAttribute(title, "alt")} loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"><div class="absolute inset-0 flex items-center justify-center pointer-events-none z-20"><div class="border border-accent bg-bg-primary/80 text-accent px-4 py-2 font-mono text-sm tracking-widest uppercase transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[0.95] group-hover:bg-accent/10 group-hover:border-accent/80">▶ PLAY YT_HQ</div></div>` })}${renderScript($$result, "C:/Users/felin/Documents/dourado-portfolio/src/components/media/LiteYouTube.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/felin/Documents/dourado-portfolio/src/components/media/LiteYouTube.astro", void 0);
//#endregion
//#region src/components/media/LiteVimeo.astro
createAstro("https://brunodourado.vercel.app");
var $$LiteVimeo = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$LiteVimeo;
	const { videoId, title, aspect = "16/9", posterUrl = "/assets/placeholder.png" } = Astro.props;
	return renderTemplate`${renderComponent($$result, "lite-vimeo", "lite-vimeo", {
		"data-videoid": videoId,
		"data-title": title,
		"class": "relative block w-full bg-black cursor-pointer group hud-border overflow-hidden",
		"style": `aspect-ratio: ${aspect};`,
		"aria-label": `Play vimeo: ${title}`,
		"tabindex": "0"
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<img${addAttribute(posterUrl, "src")}${addAttribute(title, "alt")} loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"><div class="absolute inset-0 flex items-center justify-center pointer-events-none z-20"><div class="border border-accent bg-bg-primary/80 text-accent px-4 py-2 font-mono text-sm tracking-widest uppercase transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[0.95] group-hover:bg-accent/10 group-hover:border-accent/80">▶ PLAY VIMEO_PRO</div></div>` })}${renderScript($$result, "C:/Users/felin/Documents/dourado-portfolio/src/components/media/LiteVimeo.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/felin/Documents/dourado-portfolio/src/components/media/LiteVimeo.astro", void 0);
//#endregion
//#region src/components/media/ReelCard.astro
createAstro("https://brunodourado.vercel.app");
var $$ReelCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ReelCard;
	const { title, duration = "00:15", posterUrl = "/assets/placeholder.png", reelId = "fake_reel" } = Astro.props;
	return renderTemplate`${renderComponent($$result, "tactical-reel", "tactical-reel", {
		"data-reelid": reelId,
		"data-poster": posterUrl,
		"class": "reel-card-wrapper relative block w-full max-w-[380px] bg-black cursor-pointer hud-border overflow-hidden group mx-auto",
		"style": "aspect-ratio: 9/16;"
	}, { "default": ($$result) => renderTemplate`<template id="reel-template">${templateEnter($$result)}<style>
      :host {
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
        background: #000;
        overflow: hidden;
      }
      .poster {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.8;
        transition: opacity 0.3s;
      }
      :host(:hover) .poster {
        opacity: 1;
      }
      .overlay {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 16px;
        background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
        pointer-events: none;
      }
      .title {
        font-family: sans-serif;
        font-weight: bold;
        color: #fff;
        margin: 0 0 8px 0;
        font-size: 1.1rem;
      }
      .meta {
        font-family: monospace;
        color: #00E5FF;
        font-size: 0.75rem;
        letter-spacing: 0.1em;
      }
      .play-btn {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid #FFB300;
        background: rgba(0,0,0,0.8);
        color: #FFB300;
        padding: 10px 18px;
        font-family: monospace;
        font-size: 0.8rem;
        text-transform: uppercase;
        pointer-events: none;
        transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 20;
      }
      :host(:hover) .play-btn {
        padding: 8px 16px;
        background: rgba(255, 179, 0, 0.1);
      }
      .crop-mark {
        position: absolute;
        width: 16px;
        height: 16px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        z-index: 15;
        pointer-events: none;
        transition: transform 0.3s;
      }
      .top-left { top: 0; left: 0; border-right: none; border-bottom: none; }
      .top-right { top: 0; right: 0; border-left: none; border-bottom: none; }
      .bottom-left { bottom: 0; left: 0; border-right: none; border-top: none; }
      .bottom-right { bottom: 0; right: 0; border-left: none; border-top: none; }
      
      :host(:hover) .top-left { transform: translate(-2px, -2px); }
      :host(:hover) .top-right { transform: translate(2px, -2px); }
      :host(:hover) .bottom-left { transform: translate(-2px, 2px); }
      :host(:hover) .bottom-right { transform: translate(2px, 2px); }
      iframe {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        border: 0;
        z-index: 10;
        background: #000;
      }
      
      /* Block interaction if inactive */
      :host-context(.is-inactive) .play-btn {
        display: none;
      }
    </style>${maybeRenderHead($$result)}<img class="poster w-full h-full object-cover pointer-events-none"${addAttribute(posterUrl, "src")}${addAttribute(title, "alt")} loading="lazy" decoding="async"><div class="crop-mark top-left"></div><div class="crop-mark top-right"></div><div class="crop-mark bottom-left"></div><div class="crop-mark bottom-right"></div><div class="overlay"><h3 class="title"></h3><span class="meta"></span></div><div class="play-btn">▶ REEL</div>${templateExit($$result)}</template><span class="sr-only reel-title hidden">${title}</span><span class="sr-only reel-meta hidden">DUR: ${duration} | ID: ${reelId}</span>` })}${renderScript($$result, "C:/Users/felin/Documents/dourado-portfolio/src/components/media/ReelCard.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/felin/Documents/dourado-portfolio/src/components/media/ReelCard.astro", void 0);
//#endregion
export { $$HeroPlayer as i, $$LiteVimeo as n, $$LiteYouTube as r, $$ReelCard as t };
