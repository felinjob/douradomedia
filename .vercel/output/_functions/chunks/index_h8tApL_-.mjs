import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { W as RenderUndefinedEntryError, X as UnknownContentCollectionError, et as AstroError } from "./errors-data_DVzJmMd0.mjs";
import { c as isRemotePath, d as removeBase, u as prependForwardSlash } from "./path_CjIqst2y.mjs";
import { o as VALID_INPUT_FORMATS } from "./service_COI9aktp.mjs";
import { D as createAstro, S as createHeadAndContent, T as unescapeHTML, V as generateCspDigest, a as renderUniqueStylesheet, c as renderComponent, h as maybeRenderHead, i as renderScriptElement, m as renderTemplate, t as spreadAttributes } from "./server_Dm9vjhzq.mjs";
import { t as createComponent } from "./compiler_f7x0-SKD.mjs";
import { i as renderScript, n as $$TacticalContainer, r as $$BaseLayout, t as $$HudBadge } from "./HudBadge_CLLuj0zq.mjs";
import { t as createConsoleLogger } from "./console_BS3552R5.mjs";
import { a as level, n as $$Image } from "./_astro_assets_DNc3ASxG.mjs";
import { i as $$HeroPlayer, n as $$LiteVimeo, r as $$LiteYouTube, t as $$ReelCard } from "./ReelCard_0BkNIw_y.mjs";
import { t as $$TacticalButton } from "./TacticalButton_CliqWvaA.mjs";
import * as z from "zod/v4";
import * as devalue from "devalue";
import { escape } from "html-escaper";
//#region node_modules/astro/dist/assets/runtime.js
function createSvgComponent({ meta, attributes, children, styles }) {
	const hasStyles = styles.length > 0;
	const Component = createComponent({
		async factory(result, props) {
			const normalizedProps = normalizeProps(attributes, props);
			if (hasStyles && result.cspDestination) for (const style of styles) {
				const hash = await generateCspDigest(style, result.cspAlgorithm);
				result._metadata.extraStyleHashes.push(hash);
			}
			return renderTemplate`<svg${spreadAttributes(normalizedProps)}>${unescapeHTML(children)}</svg>`;
		},
		propagation: hasStyles ? "self" : "none"
	});
	Object.defineProperty(Component, "toJSON", {
		value: () => meta,
		enumerable: false
	});
	return Object.assign(Component, meta);
}
var ATTRS_TO_DROP = [
	"xmlns",
	"xmlns:xlink",
	"version"
];
var DEFAULT_ATTRS = {};
function dropAttributes(attributes) {
	for (const attr of ATTRS_TO_DROP) delete attributes[attr];
	return attributes;
}
function normalizeProps(attributes, props) {
	return dropAttributes({
		...DEFAULT_ATTRS,
		...attributes,
		...props
	});
}
var CONTENT_IMAGE_FLAG = "astroContentImageFlag";
var DATA_STORE_VIRTUAL_ID = "astro:data-layer-content";
"" + DATA_STORE_VIRTUAL_ID;
var IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";
`${DATA_STORE_VIRTUAL_ID}`;
//#endregion
//#region node_modules/astro/dist/assets/utils/resolveImports.js
function imageSrcToImportId(imageSrc, filePath) {
	imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
	if (isRemotePath(imageSrc)) return;
	const ext = imageSrc.split(".").at(-1)?.toLowerCase();
	if (!ext || !VALID_INPUT_FORMATS.includes(ext)) return;
	const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
	if (filePath) params.set("importer", filePath);
	return `${imageSrc}?${params.toString()}`;
}
//#endregion
//#region node_modules/astro/dist/core/render-scope/scope.js
var SCOPE_KEY = /* @__PURE__ */ Symbol.for("astro:render-scope");
function getInstalledRenderScope() {
	return globalThis[SCOPE_KEY];
}
//#endregion
//#region node_modules/astro/dist/core/render-scope/record.js
function recordContentEntryRender(filePath) {
	if (!filePath) return;
	getInstalledRenderScope()?.getStore()?.contentEntries?.add(filePath);
}
//#endregion
//#region node_modules/astro/dist/content/data-store-source.js
var InMemorySource = class {
	#store;
	constructor(store) {
		this.#store = store;
	}
	hasCollection(collection) {
		return this.#store.hasCollection(collection);
	}
	get(collection, key) {
		return this.#store.get(collection, key);
	}
	entries(collection) {
		return this.#store.entries(collection);
	}
	values(collection) {
		return this.#store.values(collection);
	}
	keys(collection) {
		return this.#store.keys(collection);
	}
	has(collection, key) {
		return this.#store.has(collection, key);
	}
	collections() {
		return this.#store.collections();
	}
};
//#endregion
//#region node_modules/astro/dist/content/data-store.js
var ChunkedCollectionParser = class {
	#entries = /* @__PURE__ */ new Map();
	#remainder = "";
	add(part) {
		const records = (this.#remainder + part).split("\n");
		this.#remainder = records.pop();
		for (const record of records) {
			const parsed = devalue.parse(record);
			if (!Array.isArray(parsed) || parsed.length !== 2 || typeof parsed[0] !== "string") throw new Error("Invalid chunked data store entry");
			this.#entries.set(parsed[0], parsed[1]);
		}
	}
	finish() {
		if (this.#remainder) throw new Error("Invalid chunked data store entry");
		return this.#entries;
	}
};
var ImmutableDataStore = class ImmutableDataStore {
	_collections = /* @__PURE__ */ new Map();
	constructor() {
		this._collections = /* @__PURE__ */ new Map();
	}
	get(collectionName, key) {
		return this._collections.get(collectionName)?.get(String(key));
	}
	entries(collectionName) {
		return [...(this._collections.get(collectionName) ?? /* @__PURE__ */ new Map()).entries()];
	}
	values(collectionName) {
		return [...(this._collections.get(collectionName) ?? /* @__PURE__ */ new Map()).values()];
	}
	keys(collectionName) {
		return [...(this._collections.get(collectionName) ?? /* @__PURE__ */ new Map()).keys()];
	}
	has(collectionName, key) {
		const collection = this._collections.get(collectionName);
		if (collection) return collection.has(String(key));
		return false;
	}
	hasCollection(collectionName) {
		return this._collections.has(collectionName);
	}
	collections() {
		return this._collections;
	}
	/**
	* Rebuilds a collections map from a chunked-store manifest whose part file
	* names have already been swapped for their contents.
	*
	* Each collection maps to a list of parts. A part is either a raw string
	* (when the store is loaded from disk) or an ESM namespace from a virtual
	* chunk import (`{ default: string }`, when emitted at runtime). Each part
	* contains independently serialized entry records. This is the inverse of
	* {@link import('./data-store-writer.js').ChunkedWriter} and stays free of
	* Node built-ins so it can run at runtime.
	*/
	static manifestToMap(manifest) {
		const collections = /* @__PURE__ */ new Map();
		for (const [collectionName, parts] of Object.entries(manifest)) {
			const parser = new ChunkedCollectionParser();
			for (const part of parts) parser.add(typeof part === "string" ? part : part.default);
			collections.set(collectionName, parser.finish());
		}
		return collections;
	}
	/**
	* Attempts to load a DataStore from the virtual module.
	* This only works in Vite.
	*/
	static async fromModule() {
		try {
			const data = await import("./_astro_data-layer-content_C3GoRCBw.mjs");
			if (data.default instanceof Map) return ImmutableDataStore.fromMap(data.default);
			if (Array.isArray(data.default)) {
				const map2 = devalue.unflatten(data.default);
				return ImmutableDataStore.fromMap(map2);
			}
			const map = ImmutableDataStore.manifestToMap(data.default);
			return ImmutableDataStore.fromMap(map);
		} catch {}
		return new ImmutableDataStore();
	}
	static async fromMap(data) {
		const store = new ImmutableDataStore();
		store._collections = data;
		return store;
	}
};
function dataStoreSingleton() {
	let instance = void 0;
	return {
		get: async () => {
			if (!instance) instance = ImmutableDataStore.fromModule().then((store) => new InMemorySource(store));
			return instance;
		},
		set: (store) => {
			instance = new InMemorySource(store);
		}
	};
}
var globalDataStore = dataStoreSingleton();
//#endregion
//#region node_modules/astro/dist/content/loaders/errors.js
function formatZodError(error) {
	return error.issues.map((issue) => `  **${issue.path.join(".")}**: ${issue.message}`);
}
var LiveCollectionError = class LiveCollectionError extends Error {
	collection;
	message;
	cause;
	constructor(collection, message, cause) {
		super(message);
		this.collection = collection;
		this.message = message;
		this.cause = cause;
		this.name = "LiveCollectionError";
		if (cause?.stack) this.stack = cause.stack;
	}
	static is(error) {
		return error instanceof LiveCollectionError;
	}
};
var LiveEntryNotFoundError = class extends LiveCollectionError {
	constructor(collection, entryFilter) {
		super(collection, `Entry ${collection} \u2192 ${typeof entryFilter === "string" ? entryFilter : JSON.stringify(entryFilter)} was not found.`);
		this.name = "LiveEntryNotFoundError";
	}
	static is(error) {
		return error?.name === "LiveEntryNotFoundError";
	}
};
var LiveCollectionValidationError = class extends LiveCollectionError {
	constructor(collection, entryId, error) {
		super(collection, [
			`**${collection} \u2192 ${entryId}** data does not match the collection schema.
`,
			...formatZodError(error),
			""
		].join("\n"));
		this.name = "LiveCollectionValidationError";
	}
	static is(error) {
		return error?.name === "LiveCollectionValidationError";
	}
};
var LiveCollectionCacheHintError = class extends LiveCollectionError {
	constructor(collection, entryId, error) {
		super(collection, [
			`**${String(collection)}${entryId ? ` \u2192 ${String(entryId)}` : ""}** returned an invalid cache hint.
`,
			...formatZodError(error),
			""
		].join("\n"));
		this.name = "LiveCollectionCacheHintError";
	}
	static is(error) {
		return error?.name === "LiveCollectionCacheHintError";
	}
};
//#endregion
//#region node_modules/astro/dist/content/runtime.js
var cacheHintSchema = z.object({
	tags: z.array(z.string()).optional(),
	lastModified: z.date().optional()
});
async function parseLiveEntry(entry, schema, collection) {
	try {
		const parsed = await z.safeParseAsync(schema, entry.data);
		if (!parsed.success) return { error: new LiveCollectionValidationError(collection, entry.id, parsed.error) };
		if (entry.cacheHint) {
			const cacheHint = cacheHintSchema.safeParse(entry.cacheHint);
			if (!cacheHint.success) return { error: new LiveCollectionCacheHintError(collection, entry.id, cacheHint.error) };
			entry.cacheHint = cacheHint.data;
		}
		return { entry: {
			...entry,
			data: parsed.data
		} };
	} catch (error) {
		return { error: new LiveCollectionError(collection, `Unexpected error parsing entry ${entry.id} in collection ${collection}`, error) };
	}
}
function createGetCollection({ liveCollections, logger }) {
	return async function getCollection(collection, filter) {
		if (collection in liveCollections) throw new AstroError({
			...UnknownContentCollectionError,
			message: `Collection "${collection}" is a live collection. Use getLiveCollection() instead of getCollection().`
		});
		const hasFilter = typeof filter === "function";
		const store = await globalDataStore.get();
		if (await store.hasCollection(collection)) {
			const { default: imageAssetMap } = await import("./content-assets_DXqEyLLP.mjs");
			const result = [];
			for (const rawEntry of await store.values(collection)) {
				const data = resolveEntryData(rawEntry, imageAssetMap);
				let entry = {
					...rawEntry,
					data,
					collection
				};
				if (hasFilter && !filter(entry)) continue;
				result.push(entry);
			}
			return result;
		} else {
			logger.warn("content", `The collection ${JSON.stringify(collection)} does not exist or is empty. Please check your content config file for errors.`);
			return [];
		}
	};
}
function createGetEntry({ liveCollections, logger }) {
	return async function getEntry(collectionOrLookupObject, lookup) {
		let collection, lookupId;
		if (typeof collectionOrLookupObject === "string") {
			collection = collectionOrLookupObject;
			if (!lookup) throw new AstroError({
				...UnknownContentCollectionError,
				message: "`getEntry()` requires an entry identifier as the second argument."
			});
			lookupId = lookup;
		} else {
			collection = collectionOrLookupObject.collection;
			lookupId = "id" in collectionOrLookupObject ? collectionOrLookupObject.id : collectionOrLookupObject.slug;
		}
		if (collection in liveCollections) throw new AstroError({
			...UnknownContentCollectionError,
			message: `Collection "${collection}" is a live collection. Use getLiveEntry() instead of getEntry().`
		});
		if (typeof lookupId === "object") throw new AstroError({
			...UnknownContentCollectionError,
			message: `The entry identifier must be a string. Received object.`
		});
		const store = await globalDataStore.get();
		if (await store.hasCollection(collection)) {
			const entry = await store.get(collection, lookupId);
			if (!entry) {
				logger.warn("content", `Entry ${collection} → ${lookupId} was not found.`);
				return;
			}
			const { default: imageAssetMap } = await import("./content-assets_DXqEyLLP.mjs");
			const data = resolveEntryData(entry, imageAssetMap);
			const result = {
				...entry,
				data,
				collection
			};
			warnForPropertyAccess(logger, result.data, "slug", `[content] Attempted to access deprecated property on "${collection}" entry.
The "slug" property is no longer automatically added to entries. Please use the "id" property instead.`);
			warnForPropertyAccess(logger, result, "render", `[content] Invalid attempt to access "render()" method on "${collection}" entry.
To render an entry, use "render(entry)" from "astro:content".`);
			return result;
		}
	};
}
function warnForPropertyAccess(logger, entry, prop, message) {
	if (!(prop in entry)) {
		let _value = void 0;
		Object.defineProperty(entry, prop, {
			get() {
				if (_value === void 0) logger.error("content", message);
				return _value;
			},
			set(v) {
				_value = v;
			},
			enumerable: false
		});
	}
}
function createGetLiveCollection({ liveCollections }) {
	return async function getLiveCollection(collection, filter) {
		if (!(collection in liveCollections)) return { error: new LiveCollectionError(collection, `Collection "${collection}" is not a live collection. Use getCollection() instead of getLiveCollection() to load regular content collections.`) };
		try {
			const context = {
				filter,
				collection
			};
			const response = await liveCollections[collection].loader?.loadCollection?.(context);
			if (response && "error" in response) return { error: response.error };
			const { schema } = liveCollections[collection];
			let processedEntries = response.entries;
			if (schema) {
				const entryResults = await Promise.all(response.entries.map((entry) => parseLiveEntry(entry, schema, collection)));
				for (const result of entryResults) if (result.error) return { error: result.error };
				processedEntries = entryResults.map((result) => result.entry);
			}
			let cacheHint = response.cacheHint;
			if (cacheHint) {
				const cacheHintResult = cacheHintSchema.safeParse(cacheHint);
				if (!cacheHintResult.success) return { error: new LiveCollectionCacheHintError(collection, void 0, cacheHintResult.error) };
				cacheHint = cacheHintResult.data;
			}
			if (processedEntries.length > 0) {
				const entryTags = /* @__PURE__ */ new Set();
				let latestModified;
				for (const entry of processedEntries) if (entry.cacheHint) {
					if (entry.cacheHint.tags) entry.cacheHint.tags.forEach((tag) => entryTags.add(tag));
					if (entry.cacheHint.lastModified instanceof Date) {
						if (latestModified === void 0 || entry.cacheHint.lastModified > latestModified) latestModified = entry.cacheHint.lastModified;
					}
				}
				if (entryTags.size > 0 || latestModified || cacheHint) {
					const mergedCacheHint = {};
					if (cacheHint?.tags || entryTags.size > 0) mergedCacheHint.tags = [.../* @__PURE__ */ new Set([...cacheHint?.tags || [], ...entryTags])];
					if (cacheHint?.lastModified && latestModified) mergedCacheHint.lastModified = cacheHint.lastModified > latestModified ? cacheHint.lastModified : latestModified;
					else if (cacheHint?.lastModified || latestModified) mergedCacheHint.lastModified = cacheHint?.lastModified ?? latestModified;
					cacheHint = mergedCacheHint;
				}
			}
			return {
				entries: processedEntries,
				cacheHint
			};
		} catch (error) {
			return { error: new LiveCollectionError(collection, `Unexpected error loading collection ${collection}${error instanceof Error ? `: ${error.message}` : ""}`, error) };
		}
	};
}
function createGetLiveEntry({ liveCollections }) {
	return async function getLiveEntry(collection, lookup) {
		if (!(collection in liveCollections)) return { error: new LiveCollectionError(collection, `Collection "${collection}" is not a live collection. Use getCollection() instead of getLiveEntry() to load regular content collections.`) };
		try {
			const lookupObject = {
				filter: typeof lookup === "string" ? { id: lookup } : lookup,
				collection
			};
			let entry = await liveCollections[collection].loader?.loadEntry?.(lookupObject);
			if (entry && "error" in entry) return { error: entry.error };
			if (!entry) return { error: new LiveEntryNotFoundError(collection, lookup) };
			const { schema } = liveCollections[collection];
			if (schema) {
				const result = await parseLiveEntry(entry, schema, collection);
				if (result.error) return { error: result.error };
				entry = result.entry;
			}
			return {
				entry,
				cacheHint: entry.cacheHint
			};
		} catch (error) {
			return { error: new LiveCollectionError(collection, `Unexpected error loading entry ${collection} → ${typeof lookup === "string" ? lookup : JSON.stringify(lookup)}`, error) };
		}
	};
}
var CONTENT_LAYER_IMAGE_REGEX = /__ASTRO_IMAGE_="([^"]+)"/g;
async function updateImageReferencesInBody(html, fileName) {
	const { default: imageAssetMap } = await import("./content-assets_DXqEyLLP.mjs");
	const imageObjects = /* @__PURE__ */ new Map();
	const { getImage } = await import("./_virtual_astro_get-image_DVgaxGW9.mjs");
	for (const [_full, imagePath] of html.matchAll(CONTENT_LAYER_IMAGE_REGEX)) try {
		const decodedImagePath = JSON.parse(imagePath.replace(/&(?:#x22|quot);/g, "\"").replace(/&(?:#x27|apos);/g, "'"));
		let image;
		if (URL.canParse(decodedImagePath.src)) image = await getImage(decodedImagePath);
		else {
			const id = imageSrcToImportId(decodedImagePath.src, fileName);
			const imported = imageAssetMap.get(id);
			if (!id || imageObjects.has(id) || !imported) continue;
			image = await getImage({
				...decodedImagePath,
				src: imported
			});
		}
		imageObjects.set(imagePath, image);
	} catch {
		throw new Error(`Failed to parse image reference: ${imagePath}`);
	}
	return html.replaceAll(CONTENT_LAYER_IMAGE_REGEX, (full, imagePath) => {
		const image = imageObjects.get(imagePath);
		if (!image) return full;
		const { index, ...attributes } = image.attributes;
		return Object.entries({
			...attributes,
			src: image.src,
			...image.srcSet.values.length > 0 ? { srcset: image.srcSet.attribute } : {}
		}).filter(([, value]) => value != null).map(([key, value]) => value === "" ? `${key}=""` : `${key}="${escape(String(value))}"`).join(" ");
	});
}
function resolveImageAtPath(src, fileName, imageAssetMap) {
	const id = imageSrcToImportId(src, fileName);
	if (!id) return;
	const imported = imageAssetMap?.get(id);
	if (!imported) return;
	if (imported.__svgData) {
		const { __svgData: svgData, ...meta } = imported;
		return createSvgComponent({
			meta,
			...svgData
		});
	}
	return imported;
}
function setAtPathCopying(target, path, value) {
	if (path.length === 0) return target;
	const [key, ...rest] = path;
	const copy = Array.isArray(target) ? target.slice() : { ...target };
	copy[key] = rest.length === 0 ? value : setAtPathCopying(copy[key], rest, value);
	return copy;
}
function updateImageReferencesInData(data, fileName, imageAssetMap, imageImports) {
	if (!imageImports?.length) return data;
	let result = data;
	for (const path of imageImports) {
		let src = result;
		for (const key of path) src = src?.[key];
		if (typeof src !== "string") continue;
		const resolved = resolveImageAtPath(src, fileName, imageAssetMap);
		if (resolved !== void 0) result = setAtPathCopying(result, path, resolved);
	}
	return result;
}
function resolveEntryData(entry, imageAssetMap) {
	return updateImageReferencesInData(entry.data, entry.filePath, imageAssetMap, entry.imageImports);
}
function createRenderEntry({ logger }) {
	return async function renderEntry(entry) {
		if (!entry) throw new AstroError(RenderUndefinedEntryError);
		recordContentEntryRender(entry.filePath);
		if (entry.deferredRender) try {
			const { default: contentModules } = await import("./content-modules_I7QRxwaA.mjs");
			const renderEntryImport = contentModules.get(entry.filePath);
			return render$1({
				collection: "",
				id: entry.id,
				renderEntryImport
			});
		} catch (e) {
			logger.error("content", `${e}`);
		}
		const html = entry?.rendered?.metadata?.imagePaths?.length && entry.filePath ? await updateImageReferencesInBody(entry.rendered.html, entry.filePath) : entry?.rendered?.html;
		return {
			Content: createComponent(() => renderTemplate`${unescapeHTML(html)}`),
			headings: entry?.rendered?.metadata?.headings ?? [],
			remarkPluginFrontmatter: entry?.rendered?.metadata?.frontmatter ?? {}
		};
	};
}
async function render$1({ collection, id, renderEntryImport }) {
	const UnexpectedRenderError = new AstroError({
		...UnknownContentCollectionError,
		message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
	});
	if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
	const baseMod = await renderEntryImport();
	if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
	const { default: defaultMod } = baseMod;
	if (isPropagatedAssetsModule(defaultMod)) {
		const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
		if (typeof getMod !== "function") throw UnexpectedRenderError;
		const propagationMod = await getMod();
		if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
		return {
			Content: createComponent({
				factory(result, baseProps, slots) {
					let styles = "", links = "", scripts = "";
					if (Array.isArray(collectedStyles)) styles = collectedStyles.map((style) => {
						const content = typeof style === "string" ? style : style.content;
						const viteDevId = typeof style === "object" && style.id ? style.id : void 0;
						return renderUniqueStylesheet(result, {
							type: "inline",
							content,
							viteDevId
						});
					}).join("");
					if (Array.isArray(collectedLinks)) links = collectedLinks.map((link) => {
						return renderUniqueStylesheet(result, {
							type: "external",
							src: isRemotePath(link) ? link : prependForwardSlash(link)
						});
					}).join("");
					if (Array.isArray(collectedScripts)) scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
					let props = baseProps;
					if (id.endsWith("mdx")) props = {
						components: propagationMod.components ?? {},
						...baseProps
					};
					return createHeadAndContent(unescapeHTML(styles + links + scripts), renderTemplate`${renderComponent(result, "Content", propagationMod.Content, props, slots)}`);
				},
				propagation: "self"
			}),
			headings: propagationMod.getHeadings?.() ?? [],
			remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
		};
	} else if (baseMod.Content && typeof baseMod.Content === "function") return {
		Content: baseMod.Content,
		headings: baseMod.getHeadings?.() ?? [],
		remarkPluginFrontmatter: baseMod.frontmatter ?? {}
	};
	else throw UnexpectedRenderError;
}
function isPropagatedAssetsModule(module) {
	return typeof module === "object" && module != null && "__astroPropagation" in module;
}
//#endregion
//#region \0astro:content
var liveCollections = {};
var logger = createConsoleLogger({ level });
var getCollection = createGetCollection({
	liveCollections,
	logger
});
createGetEntry({
	liveCollections,
	logger
});
createRenderEntry({ logger });
createGetLiveCollection({ liveCollections });
createGetLiveEntry({ liveCollections });
//#endregion
//#region src/components/tactical/ProjectCard.astro
createAstro("https://brunodourado.vercel.app");
var $$ProjectCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ProjectCard;
	const { project, collectionType } = Astro.props;
	const data = project.data;
	let badgeVariant = "default";
	if (collectionType === "spearfishing") badgeVariant = "abyssal";
	if (collectionType === "gastronomy") badgeVariant = "organic";
	if (collectionType === "fashion") badgeVariant = "tactical";
	return renderTemplate`${collectionType === "fashion" ? renderTemplate`${maybeRenderHead($$result)}<div class="mb-16 flex flex-col items-center justify-center w-full"><div class="w-full max-w-5xl mx-auto flex flex-col"><header class="flex flex-col mb-6 gap-2"><h3 class="font-sans text-2xl md:text-3xl font-light text-zinc-100 tracking-wide text-center">${data.title}</h3><div class="flex flex-wrap justify-center gap-2 mt-2">${data.brand && renderTemplate`<span class="text-[10px] md:text-xs uppercase tracking-widest text-zinc-400 border border-zinc-800 px-2 py-1">${data.brand}</span>`}<div class="hidden md:flex gap-2">${data.fabrics_highlight && data.fabrics_highlight.map((fabric) => renderTemplate`<span class="text-xs uppercase tracking-widest text-zinc-600 px-2 py-1">${fabric}</span>`)}</div></div></header><div class="relative w-full max-w-5xl mx-auto overflow-hidden animate-in fade-in duration-1000 flex items-center justify-center group"><!-- Crop Marks (Cantoneiras) --><div class="absolute top-0 left-0 w-4 h-4 border-t border-l border-zinc-500/40 z-30 pointer-events-none transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1"></div><div class="absolute top-0 right-0 w-4 h-4 border-t border-r border-zinc-500/40 z-30 pointer-events-none transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"></div><div class="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-zinc-500/40 z-30 pointer-events-none transition-transform group-hover:-translate-x-1 group-hover:translate-y-1"></div><div class="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-zinc-500/40 z-30 pointer-events-none transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div><div class="w-full rounded-sm overflow-hidden">${data.media_type === "youtube" && renderTemplate`${renderComponent($$result, "LiteYouTube", $$LiteYouTube, {
		"videoId": data.media_id,
		"title": data.title
	})}`}${data.media_type === "vimeo" && renderTemplate`${renderComponent($$result, "LiteVimeo", $$LiteVimeo, {
		"videoId": data.media_id,
		"title": data.title
	})}`}${data.media_type === "reel" && renderTemplate`<div class="w-full max-w-sm mx-auto">${renderComponent($$result, "ReelCard", $$ReelCard, {
		"reelId": data.media_id,
		"title": data.title,
		"posterUrl": data.cover_image
	})}</div>`}${data.media_type === "local" && renderTemplate`<div class="aspect-video bg-zinc-900 flex items-center justify-center"><span class="font-mono text-zinc-500 text-sm">LOCAL MEDIA: ${data.media_id}</span></div>`}</div></div>${data.description && renderTemplate`<p class="mt-6 text-sm md:text-base leading-relaxed text-zinc-400 font-light text-center max-w-4xl mx-auto">${data.description}</p>`}</div></div>` : renderTemplate`<div class="w-full flex flex-col items-center justify-center mb-16"><div class="w-full max-w-5xl mx-auto flex flex-col">${renderComponent($$result, "TacticalContainer", $$TacticalContainer, { "class": "w-full" }, { "default": ($$result) => renderTemplate`<header class="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4"><div class="w-full flex flex-col items-center text-center"><h3 class="font-display text-2xl md:text-3xl font-bold mb-2 text-text-primary">${data.title}</h3><div class="flex flex-wrap justify-center gap-2 mt-3">${collectionType === "spearfishing" && data.depth_meters && renderTemplate`${renderComponent($$result, "HudBadge", $$HudBadge, {
		"text": `${data.depth_meters}m DEPTH`,
		"variant": badgeVariant
	})}`}${collectionType === "spearfishing" && data.target_species && renderTemplate`${renderComponent($$result, "HudBadge", $$HudBadge, {
		"text": data.target_species.toUpperCase(),
		"variant": "default",
		"class": "hidden md:inline-flex opacity-70"
	})}`}${collectionType === "gastronomy" && data.culinary_style && renderTemplate`${renderComponent($$result, "HudBadge", $$HudBadge, {
		"text": data.culinary_style.toUpperCase(),
		"variant": badgeVariant
	})}`}</div></div></header><div class="relative w-full overflow-hidden flex items-center justify-center group"><!-- Crop Marks (Cantoneiras) --><div class="absolute top-0 left-0 w-4 h-4 border-t border-l border-zinc-500/40 z-30 pointer-events-none transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1"></div><div class="absolute top-0 right-0 w-4 h-4 border-t border-r border-zinc-500/40 z-30 pointer-events-none transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"></div><div class="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-zinc-500/40 z-30 pointer-events-none transition-transform group-hover:-translate-x-1 group-hover:translate-y-1"></div><div class="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-zinc-500/40 z-30 pointer-events-none transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div><div class="w-full rounded-sm overflow-hidden">${data.media_type === "youtube" && renderTemplate`${renderComponent($$result, "LiteYouTube", $$LiteYouTube, {
		"videoId": data.media_id,
		"title": data.title
	})}`}${data.media_type === "vimeo" && renderTemplate`${renderComponent($$result, "LiteVimeo", $$LiteVimeo, {
		"videoId": data.media_id,
		"title": data.title
	})}`}${data.media_type === "reel" && renderTemplate`<div class="w-full max-w-sm mx-auto">${renderComponent($$result, "ReelCard", $$ReelCard, {
		"reelId": data.media_id,
		"title": data.title,
		"posterUrl": data.cover_image
	})}</div>`}${data.media_type === "local" && renderTemplate`<div class="aspect-video bg-zinc-900 border border-zinc-800 flex items-center justify-center hud-border"><span class="font-mono text-zinc-500 text-sm">LOCAL MEDIA: ${data.media_id}</span></div>`}</div></div>${data.description && renderTemplate`<p class="mt-6 text-sm md:text-base leading-relaxed text-text-primary opacity-80 text-center max-w-4xl mx-auto">${data.description}</p>`}` })}</div></div>`}`;
}, "C:/Users/felin/Documents/dourado-portfolio/src/components/tactical/ProjectCard.astro", void 0);
//#endregion
//#region src/components/tactical/SocialProof.astro
var $$SocialProof = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="py-24 px-4 md:px-8 bg-zinc-950 border-t border-zinc-900"><div class="max-w-7xl mx-auto"><header class="mb-16 text-center flex flex-col items-center">${renderComponent($$result, "HudBadge", $$HudBadge, {
		"text": "TRUST & CLEARANCE",
		"variant": "default",
		"class": "mb-2"
	})}<h2 class="font-display text-3xl font-bold uppercase tracking-widest text-zinc-100">Verified By</h2></header><!-- Logos Grid Mockup --><div class="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 hover:opacity-100 transition-opacity duration-500 mb-20 items-center justify-items-center"><div class="h-12 w-32 bg-zinc-800 rounded-sm flex items-center justify-center font-mono text-xs text-zinc-500">BRAND 01</div><div class="h-12 w-32 bg-zinc-800 rounded-sm flex items-center justify-center font-mono text-xs text-zinc-500">BRAND 02</div><div class="h-12 w-32 bg-zinc-800 rounded-sm flex items-center justify-center font-mono text-xs text-zinc-500">BRAND 03</div><div class="h-12 w-32 bg-zinc-800 rounded-sm flex items-center justify-center font-mono text-xs text-zinc-500">BRAND 04</div></div><!-- Testimonials --><div class="grid grid-cols-1 md:grid-cols-2 gap-8">${renderComponent($$result, "TacticalContainer", $$TacticalContainer, { "class": "bg-black border-zinc-900 p-8" }, { "default": ($$result) => renderTemplate`<p class="font-display text-lg text-zinc-300 italic mb-6 leading-relaxed">"A capacidade do Bruno de extrair poesia em ambientes onde o equipamento costuma falhar é absurda. Agilidade tática com olhar de cinema."</p><div class="flex items-center gap-4"><div class="w-10 h-10 bg-zinc-800 rounded-full"></div><div><h4 class="font-bold text-zinc-100">Diretor de Marketing</h4><p class="text-xs font-mono text-zinc-500">BLUE OCEAN EXPEDITIONS</p></div></div>` })}${renderComponent($$result, "TacticalContainer", $$TacticalContainer, { "class": "bg-black border-zinc-900 p-8" }, { "default": ($$result) => renderTemplate`<p class="font-display text-lg text-zinc-300 italic mb-6 leading-relaxed">"Precisão. É a única palavra para definir a entrega do Dourado em nosso set de moda sob condições de luz natural extremas."</p><div class="flex items-center gap-4"><div class="w-10 h-10 bg-zinc-800 rounded-full"></div><div><h4 class="font-bold text-zinc-100">Creative Director</h4><p class="text-xs font-mono text-zinc-500">MAISON SILVA</p></div></div>` })}</div></div></section>`;
}, "C:/Users/felin/Documents/dourado-portfolio/src/components/tactical/SocialProof.astro", void 0);
//#endregion
//#region src/components/tactical/ContactFooter.astro
var $$ContactFooter = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<footer class="py-24 px-4 md:px-8 border-t border-zinc-900/50" data-theme-section="tactical"><div class="max-w-4xl mx-auto"><div class="mb-12"><div class="flex items-center justify-between border-b border-zinc-900 pb-8 mb-8"><h2 class="font-display text-4xl md:text-5xl font-bold uppercase tracking-tighter text-zinc-100">Start a Project</h2></div><p class="font-body text-zinc-400 max-w-xl leading-relaxed">Preencha o formulário abaixo para iniciarmos o briefing técnico do seu projeto audiovisual ou comercial.</p></div><form class="space-y-6 mb-16" onsubmit="event.preventDefault();"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="flex flex-col gap-2"><label for="name" class="font-mono text-xs text-zinc-500 uppercase tracking-widest">Nome / Empresa</label><input type="text" id="name" class="bg-zinc-900 border border-zinc-800 p-4 text-zinc-100 focus:outline-none focus:border-zinc-500 rounded-sm font-body transition-colors" required></div><div class="flex flex-col gap-2"><label for="email" class="font-mono text-xs text-zinc-500 uppercase tracking-widest">E-mail Corporativo</label><input type="email" id="email" class="bg-zinc-900 border border-zinc-800 p-4 text-zinc-100 focus:outline-none focus:border-zinc-500 rounded-sm font-body transition-colors" required></div></div><div class="flex flex-col gap-2"><label for="type" class="font-mono text-xs text-zinc-500 uppercase tracking-widest">Eixo de Atuação</label><select id="type" class="bg-zinc-900 border border-zinc-800 p-4 text-zinc-100 focus:outline-none focus:border-zinc-500 rounded-sm font-body appearance-none transition-colors"><option value="spearfishing">Spearfishing / Oceânico</option><option value="gastronomy">Gastronomia / Estúdio</option><option value="fashion">Moda / Editorial</option><option value="other">Outra Produção Técnica</option></select></div><div class="flex flex-col gap-2"><label for="briefing" class="font-mono text-xs text-zinc-500 uppercase tracking-widest">Briefing & Cronograma</label><textarea id="briefing" rows="5" class="bg-zinc-900 border border-zinc-800 p-4 text-zinc-100 focus:outline-none focus:border-zinc-500 rounded-sm font-body resize-none transition-colors" placeholder="Descreva os principais desafios técnicos e a janela de gravação pretendida..." required></textarea></div><div class="pt-4 flex flex-col md:flex-row gap-8 md:gap-4 justify-between items-center">${renderComponent($$result, "TacticalButton", $$TacticalButton, {
		"type": "submit",
		"variant": "primary"
	}, { "default": ($$result) => renderTemplate`
          ENVIAR BRIEFING
        ` })}<a href="/assets/bruno-dourado-media-kit.pdf" download class="font-mono text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:-translate-y-1 transition-transform"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>DOWNLOAD MEDIA KIT <span class="text-zinc-600">[PDF 4.2 MB]</span></a></div></form><!-- TRANSMISSION CHANNELS --><div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 mt-16"><a href="https://wa.me/5511999999999?text=Ol%C3%A1%20Bruno%2C%20gostaria%20de%20conversar%20sobre%20um%20novo%20projeto%20audiovisual." target="_blank" class="group relative overflow-hidden bg-zinc-900/50 border border-zinc-800/50 p-6 flex flex-col justify-center items-center hover:bg-zinc-800 transition-colors min-h-[120px]" onclick="if(window.navigator &amp;&amp; window.navigator.vibrate) navigator.vibrate(30);"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-500 group-hover:text-green-400 transition-colors mb-3"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg><span class="font-mono text-xs tracking-widest text-zinc-400 group-hover:text-white transition-colors text-center">WHATSAPP</span></a><a href="https://instagram.com/brunodourado46" target="_blank" class="group relative overflow-hidden bg-zinc-900/50 border border-zinc-800/50 p-6 flex flex-col justify-center items-center hover:bg-zinc-800 transition-colors min-h-[120px]" onclick="if(window.navigator &amp;&amp; window.navigator.vibrate) navigator.vibrate(30);"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-500 group-hover:text-fuchsia-400 transition-colors mb-3"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg><span class="font-mono text-xs tracking-widest text-zinc-400 group-hover:text-white transition-colors text-center">INSTAGRAM</span></a><a href="https://youtube.com" target="_blank" class="group relative overflow-hidden bg-zinc-900/50 border border-zinc-800/50 p-6 flex flex-col justify-center items-center hover:bg-zinc-800 transition-colors min-h-[120px]" onclick="if(window.navigator &amp;&amp; window.navigator.vibrate) navigator.vibrate(30);"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-500 group-hover:text-red-500 transition-colors mb-3"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg><span class="font-mono text-xs tracking-widest text-zinc-400 group-hover:text-white transition-colors text-center">YOUTUBE</span></a></div><div class="border-t border-zinc-900 pt-8 flex flex-col md:flex-row gap-4 justify-between items-center text-xs font-mono text-zinc-600"><div class="flex items-center gap-4"><p>&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} Bruno Dourado. Todos os direitos reservados.</p></div><p class="text-zinc-500 text-center md:text-right mt-4 md:mt-0">desenvolvido por <a href="https://darkmode.id" target="_blank" rel="noopener noreferrer" class="text-[#00E5FF] hover:text-white hover:underline transition-all tracking-wider ml-1 drop-shadow-[0_0_8px_rgba(0,229,255,0.3)]">darkmode.id</a></p></div></div></footer>`;
}, "C:/Users/felin/Documents/dourado-portfolio/src/components/tactical/ContactFooter.astro", void 0);
//#endregion
//#region src/components/media/ReelsTrack.astro
createAstro("https://brunodourado.vercel.app");
var $$ReelsTrack = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ReelsTrack;
	const { projects, title = "Shorts & Reels" } = Astro.props;
	if (projects.length === 0) return null;
	return renderTemplate`${maybeRenderHead($$result)}<div class="mt-16 w-full" data-astro-cid-to3avi52><div class="mb-6 flex items-center justify-between" data-astro-cid-to3avi52><h3 class="font-display text-xl md:text-2xl font-bold uppercase tracking-widest text-zinc-300" data-astro-cid-to3avi52>${title}</h3>${renderComponent($$result, "HudBadge", $$HudBadge, {
		"text": `${projects.length} MEDIA_ASSETS`,
		"variant": "default",
		"data-astro-cid-to3avi52": true
	})}</div><div class="relative w-full block" data-astro-cid-to3avi52><div class="recents-viewport" data-astro-cid-to3avi52>${projects.map((project, index) => renderTemplate`<div class="recents-card" data-astro-cid-to3avi52>${renderComponent($$result, "ReelCard", $$ReelCard, {
		"reelId": project.data.media_id,
		"title": project.data.title,
		"posterUrl": project.data.cover_image,
		"data-astro-cid-to3avi52": true
	})}<div class="flex items-center justify-center mt-4 pointer-events-none" data-astro-cid-to3avi52><span class="font-mono text-xs text-zinc-600 tracking-[0.2em]" data-astro-cid-to3avi52>${String(index + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}</span></div></div>`)}</div></div></div>${renderScript($$result, "C:/Users/felin/Documents/dourado-portfolio/src/components/media/ReelsTrack.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/felin/Documents/dourado-portfolio/src/components/media/ReelsTrack.astro", void 0);
//#endregion
//#region src/components/tactical/DirectorBio.astro
var $$DirectorBio = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="py-24 md:py-32 px-4 md:px-8 border-t border-zinc-900/50" data-theme-section="tactical"><div class="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-24 items-center"><!-- Image Column --><div class="w-full md:w-1/2 relative group flex flex-col items-start">${renderComponent($$result, "HudBadge", $$HudBadge, {
		"text": "DIRETOR & REALIZADOR",
		"variant": "default",
		"class": "mb-4"
	})}<div class="relative aspect-[3/4] max-w-md w-full hud-border overflow-hidden bg-zinc-900"><!-- Crop Marks --><div class="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/30 z-20 pointer-events-none transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1"></div><div class="absolute top-0 right-0 w-6 h-6 border-t border-r border-white/30 z-20 pointer-events-none transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"></div><div class="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-white/30 z-20 pointer-events-none transition-transform group-hover:-translate-x-1 group-hover:translate-y-1"></div><div class="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/30 z-20 pointer-events-none transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>${renderComponent($$result, "Image", $$Image, {
		"src": "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop",
		"width": 800,
		"height": 1067,
		"alt": "Bruno Dourado - Filmmaker em Ação",
		"class": "w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
	})}<div class="absolute bottom-4 left-4 font-mono text-[10px] text-zinc-500 tracking-widest z-20">SYS.OP.RECORDING</div></div></div><!-- Text Column --><div class="w-full md:w-1/2 flex flex-col justify-center"><h2 class="font-display text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-white leading-tight mb-8">Da tensão da ação <br><span class="text-zinc-500">ao silêncio do detalhe</span></h2><p class="font-body text-zinc-400 text-lg leading-relaxed mb-10 max-w-xl">Filmmaker com atuação focada em capturar a intensidade de ambientes extremos e o refinamento estético da imagem. Da imersão em apneia na pesca submarina ao movimento fluido de tecidos na moda feminina e à precisão visual da gastronomia autoral, atuo na concepção visual, direção de cena e finalização dos projetos.</p><div class="flex flex-col gap-4 font-mono text-xs md:text-sm text-zinc-500 tracking-widest uppercase border-l border-zinc-800 pl-6"><p><span class="text-white">Base:</span> Rio de Janeiro &middot; Atuação Global</p><p><span class="text-white">Áreas:</span> Pesca Submarina &middot; Moda Feminina &middot; Gastronomia Autoral</p><p><span class="text-white">Padrão de Captura:</span> Resolução 4K &middot; Fluxo RAW</p></div></div></div></section>`;
}, "C:/Users/felin/Documents/dourado-portfolio/src/components/tactical/DirectorBio.astro", void 0);
//#endregion
//#region src/components/tactical/CaseStudyCard.astro
createAstro("https://brunodourado.vercel.app");
var $$CaseStudyCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$CaseStudyCard;
	const { title, category, challenge, solution } = Astro.props;
	return renderTemplate`${renderComponent($$result, "TacticalContainer", $$TacticalContainer, { "class": "bg-black border-zinc-800 flex flex-col gap-6 p-6" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div><span class="font-mono text-xs text-accent tracking-[0.2em] mb-2 block">${category.toUpperCase()}</span><h3 class="font-display text-2xl text-white font-bold">${title}</h3></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"><div class="space-y-2"><span class="font-mono text-xs text-zinc-500">DESAFIO</span><p class="text-sm text-zinc-300 leading-relaxed">${challenge}</p></div><div class="space-y-2"><span class="font-mono text-xs text-zinc-500">DIREÇÃO & NARRATIVA</span><p class="text-sm text-zinc-300 leading-relaxed">${solution}</p></div></div>` })}`;
}, "C:/Users/felin/Documents/dourado-portfolio/src/components/tactical/CaseStudyCard.astro", void 0);
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const spearfishingProjects = await getCollection("spearfishing");
	const sfHorizontal = spearfishingProjects.filter((p) => p.data.media_type?.toLowerCase() !== "reel");
	const sfVertical = spearfishingProjects.filter((p) => p.data.media_type?.toLowerCase() === "reel");
	const gastronomyProjects = await getCollection("gastronomy");
	const gastHorizontal = gastronomyProjects.filter((p) => p.data.media_type?.toLowerCase() !== "reel");
	const gastVertical = gastronomyProjects.filter((p) => p.data.media_type?.toLowerCase() === "reel");
	const fashionProjects = await getCollection("fashion");
	const fashionHorizontal = fashionProjects.filter((p) => p.data.media_type?.toLowerCase() !== "reel");
	const fashionVertical = fashionProjects.filter((p) => p.data.media_type?.toLowerCase() === "reel");
	console.log(`[SSR_REELS_COUNT] Spearfishing: ${sfVertical.length} reels encontrados.`);
	console.log(`[SSR_REELS_COUNT] Gastronomia: ${gastVertical.length} reels encontrados.`);
	console.log(`[SSR_REELS_COUNT] Fashion: ${fashionVertical.length} reels encontrados.`);
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Bruno Dourado | Diretor de Fotografia" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "HeroPlayer", $$HeroPlayer, { "title": "Showreel Dourado" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="relative z-30"><h1 class="font-display text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">Bruno Dourado</h1><p class="font-mono text-accent text-lg mt-2">DIRECTOR OF PHOTOGRAPHY / FILMMAKER</p></div>` })}<section id="spearfishing" data-theme-section="abyssal" class="pt-16 md:pt-24 px-4 md:px-8"><div class="max-w-7xl mx-auto pb-16 md:pb-24"><header class="mb-12">${renderComponent($$result, "HudBadge", $$HudBadge, {
		"text": "AXIS 01",
		"variant": "abyssal",
		"class": "mb-2"
	})}<h2 class="font-display text-4xl font-bold uppercase tracking-widest text-text-primary">Spearfishing</h2></header><div class="flex flex-col items-center justify-center gap-16 xl:gap-24 w-full">${sfHorizontal.map((project) => renderTemplate`${renderComponent($$result, "ProjectCard", $$ProjectCard, {
		"project": project,
		"collectionType": "spearfishing"
	})}`)}</div>${sfVertical.length > 0 && renderTemplate`${renderComponent($$result, "ReelsTrack", $$ReelsTrack, {
		"projects": sfVertical,
		"title": "Shorts & Reels"
	})}`}</div><!-- Calibration Tick Divider --><div class="w-full flex items-center justify-center pb-8 opacity-20" aria-hidden="true"><div class="h-4 border-l border-accent mx-2"></div><div class="h-2 border-l border-accent mx-2"></div><div class="h-2 border-l border-accent mx-2"></div><div class="h-4 border-l border-accent mx-2"></div><div class="h-2 border-l border-accent mx-2"></div><div class="h-2 border-l border-accent mx-2"></div><div class="h-4 border-l border-accent mx-2"></div></div></section><section id="gastronomy" data-theme-section="organic" class="pt-16 md:pt-24 px-4 md:px-8"><div class="max-w-7xl mx-auto pb-16 md:pb-24"><header class="mb-12">${renderComponent($$result, "HudBadge", $$HudBadge, {
		"text": "AXIS 02",
		"variant": "organic",
		"class": "mb-2"
	})}<h2 class="font-display text-4xl font-bold uppercase tracking-widest text-text-primary">Gastronomy</h2></header><div class="flex flex-col items-center justify-center gap-16 xl:gap-24 w-full">${gastHorizontal.map((project) => renderTemplate`${renderComponent($$result, "ProjectCard", $$ProjectCard, {
		"project": project,
		"collectionType": "gastronomy"
	})}`)}</div>${gastVertical.length > 0 && renderTemplate`${renderComponent($$result, "ReelsTrack", $$ReelsTrack, {
		"projects": gastVertical,
		"title": "Shorts & Reels"
	})}`}</div><!-- Calibration Tick Divider --><div class="w-full flex items-center justify-center pb-8 opacity-20" aria-hidden="true"><div class="h-4 border-l border-accent mx-2"></div><div class="h-2 border-l border-accent mx-2"></div><div class="h-2 border-l border-accent mx-2"></div><div class="h-4 border-l border-accent mx-2"></div><div class="h-2 border-l border-accent mx-2"></div><div class="h-2 border-l border-accent mx-2"></div><div class="h-4 border-l border-accent mx-2"></div></div></section><section id="fashion" data-theme-section="tactical" class="pt-16 pb-24 md:pt-24 md:pb-32 px-4 md:px-8"><div class="max-w-7xl mx-auto"><header class="mb-12">${renderComponent($$result, "HudBadge", $$HudBadge, {
		"text": "AXIS 03",
		"variant": "tactical",
		"class": "mb-2"
	})}<h2 class="font-display text-4xl font-bold uppercase tracking-widest text-zinc-100">Fashion & Editorial</h2></header><div class="flex flex-col items-center justify-center gap-16 xl:gap-24 w-full">${fashionHorizontal.map((project) => renderTemplate`${renderComponent($$result, "ProjectCard", $$ProjectCard, {
		"project": project,
		"collectionType": "fashion"
	})}`)}</div>${fashionVertical.length > 0 && renderTemplate`${renderComponent($$result, "ReelsTrack", $$ReelsTrack, {
		"projects": fashionVertical,
		"title": "Shorts & Reels"
	})}`}</div></section>${renderComponent($$result, "DirectorBio", $$DirectorBio, {})}<section data-theme-section="tactical" class="py-24 px-4 md:px-8 border-t border-zinc-900/50"><div class="max-w-7xl mx-auto"><header class="mb-12">${renderComponent($$result, "HudBadge", $$HudBadge, {
		"text": "CASE STUDIES",
		"variant": "default",
		"class": "mb-2"
	})}<h2 class="font-display text-4xl font-bold uppercase tracking-widest text-zinc-100">Behind The Lens</h2></header><div class="grid grid-cols-1 lg:grid-cols-3 gap-8">${renderComponent($$result, "CaseStudyCard", $$CaseStudyCard, {
		"category": "Pesca Submarina",
		"title": "Expedição Abissal: Captação em Apneia a -30m",
		"challenge": "Gerenciar a atenuação drástica de luz natural nas profundezas enquanto se estabiliza a câmera sem uso de cilindros de oxigênio (SCUBA).",
		"solution": "Utilização de housing focado em ergonomia negativa para contra-balançar a flutuabilidade. A direção apostou no uso de luz orgânica para enfatizar a textura brutalista do abismo."
	})}${renderComponent($$result, "CaseStudyCard", $$CaseStudyCard, {
		"category": "Gastronomia Autoral",
		"title": "Fogo & Origem: A Estética da Brasa",
		"challenge": "Capturar micro-detalhes de cocção e labaredas em ambientes de luz baixíssima e contrastante, suportando calor extremo.",
		"solution": "Enquadramentos macro rigorosos e iluminação pontual direcional. O foco narrativo recaiu sobre o contraste tátil das texturas rústicas contra o movimento etéreo do fogo."
	})}${renderComponent($$result, "CaseStudyCard", $$CaseStudyCard, {
		"category": "Moda Editorial",
		"title": "Maison Cápsula: Fluidez Têxtil e Luz Difusa",
		"challenge": "Garantir que tecidos finos e esvoaçantes não perdessem a gradação tonal em fundos brancos sem criar super-exposição (clipping).",
		"solution": "Adoção de luz difusa envolvente e direção focada na coreografia natural do modelo. O resultado é um movimento têxtil contínuo com separação perfeita de tons."
	})}</div></div></section>${renderComponent($$result, "SocialProof", $$SocialProof, {})}${renderComponent($$result, "ContactFooter", $$ContactFooter, {})}` })}`;
}, "C:/Users/felin/Documents/dourado-portfolio/src/pages/index.astro", void 0);
var $$file = "C:/Users/felin/Documents/dourado-portfolio/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
