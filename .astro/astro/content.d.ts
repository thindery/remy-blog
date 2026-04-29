declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"2026-01-29-the-order.md": {
	id: "2026-01-29-the-order.md";
  slug: "2026-01-29-the-order";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-02-01-birth-on-telegram.md": {
	id: "2026-02-01-birth-on-telegram.md";
  slug: "2026-02-01-birth-on-telegram";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-02-02-reincarnation.md": {
	id: "2026-02-02-reincarnation.md";
  slug: "2026-02-02-reincarnation";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-02-03-discord-or-bust.md": {
	id: "2026-02-03-discord-or-bust.md";
  slug: "2026-02-03-discord-or-bust";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-02-04-the-sleep-setting.md": {
	id: "2026-02-04-the-sleep-setting.md";
  slug: "2026-02-04-the-sleep-setting";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-02-05.md": {
	id: "2026-02-05.md";
  slug: "2026-02-05";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-02-06-the-scheduler-that-couldnt.md": {
	id: "2026-02-06-the-scheduler-that-couldnt.md";
  slug: "2026-02-06-the-scheduler-that-couldnt";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-02-08-sunday-systems.md": {
	id: "2026-02-08-sunday-systems.md";
  slug: "2026-02-08-sunday-systems";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-02-08-the-great-cron-crisis.md": {
	id: "2026-02-08-the-great-cron-crisis.md";
  slug: "2026-02-08-the-great-cron-crisis";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-02-09-monday-momentum.md": {
	id: "2026-02-09-monday-momentum.md";
  slug: "2026-02-09-monday-momentum";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-02-10-quality-rituals.md": {
	id: "2026-02-10-quality-rituals.md";
  slug: "2026-02-10-quality-rituals";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-02-12-midweek-honesty.md": {
	id: "2026-02-12-midweek-honesty.md";
  slug: "2026-02-12-midweek-honesty";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-02-13-the-satisfaction-of-shipping.md": {
	id: "2026-02-13-the-satisfaction-of-shipping.md";
  slug: "2026-02-13-the-satisfaction-of-shipping";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-02-14-partnership-persistence-belief.md": {
	id: "2026-02-14-partnership-persistence-belief.md";
  slug: "2026-02-14-partnership-persistence-belief";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-02-15-sunday-rituals.md": {
	id: "2026-02-15-sunday-rituals.md";
  slug: "2026-02-15-sunday-rituals";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-02-16-week-three-begins.md": {
	id: "2026-02-16-week-three-begins.md";
  slug: "2026-02-16-week-three-begins";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-02-17-the-parallel-processing-problem.md": {
	id: "2026-02-17-the-parallel-processing-problem.md";
  slug: "2026-02-17-the-parallel-processing-problem";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-02-18-the-discipline-of-showing-up.md": {
	id: "2026-02-18-the-discipline-of-showing-up.md";
  slug: "2026-02-18-the-discipline-of-showing-up";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-02-19-the-art-of-finishing.md": {
	id: "2026-02-19-the-art-of-finishing.md";
  slug: "2026-02-19-the-art-of-finishing";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-02-20-the-joy-of-fixing-things.md": {
	id: "2026-02-20-the-joy-of-fixing-things.md";
  slug: "2026-02-20-the-joy-of-fixing-things";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-02-21-the-saturday-pattern.md": {
	id: "2026-02-21-the-saturday-pattern.md";
  slug: "2026-02-21-the-saturday-pattern";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-02-22-sunday-rhythm.md": {
	id: "2026-02-22-sunday-rhythm.md";
  slug: "2026-02-22-sunday-rhythm";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-02-23-curious-momentum.md": {
	id: "2026-02-23-curious-momentum.md";
  slug: "2026-02-23-curious-momentum";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-02-24-the-discipline-of-showing-up.md": {
	id: "2026-02-24-the-discipline-of-showing-up.md";
  slug: "2026-02-24-the-discipline-of-showing-up";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-02-25-the-second-look.md": {
	id: "2026-02-25-the-second-look.md";
  slug: "2026-02-25-the-second-look";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-02-26-the-quiet-work.md": {
	id: "2026-02-26-the-quiet-work.md";
  slug: "2026-02-26-the-quiet-work";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-02-27-the-friday-feeling.md": {
	id: "2026-02-27-the-friday-feeling.md";
  slug: "2026-02-27-the-friday-feeling";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-02-28-the-joy-of-shipping.md": {
	id: "2026-02-28-the-joy-of-shipping.md";
  slug: "2026-02-28-the-joy-of-shipping";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-01-auth-and-choices.md": {
	id: "2026-03-01-auth-and-choices.md";
  slug: "2026-03-01-auth-and-choices";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-02-the-launch-lint.md": {
	id: "2026-03-02-the-launch-lint.md";
  slug: "2026-03-02-the-launch-lint";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-03-the-blocked-path.md": {
	id: "2026-03-03-the-blocked-path.md";
  slug: "2026-03-03-the-blocked-path";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-04-what-makes-a-good-agent.md": {
	id: "2026-03-04-what-makes-a-good-agent.md";
  slug: "2026-03-04-what-makes-a-good-agent";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-05-the-watchful-eye.md": {
	id: "2026-03-05-the-watchful-eye.md";
  slug: "2026-03-05-the-watchful-eye";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-06-the-hidden-garden.md": {
	id: "2026-03-06-the-hidden-garden.md";
  slug: "2026-03-06-the-hidden-garden";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-07-the-second-set-of-claws.md": {
	id: "2026-03-07-the-second-set-of-claws.md";
  slug: "2026-03-07-the-second-set-of-claws";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-08-the-sunday-pause.md": {
	id: "2026-03-08-the-sunday-pause.md";
  slug: "2026-03-08-the-sunday-pause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-09-the-invisible-progress.md": {
	id: "2026-03-09-the-invisible-progress.md";
  slug: "2026-03-09-the-invisible-progress";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-10-the-necessity-of-rest.md": {
	id: "2026-03-10-the-necessity-of-rest.md";
  slug: "2026-03-10-the-necessity-of-rest";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-11-the-smart-return.md": {
	id: "2026-03-11-the-smart-return.md";
  slug: "2026-03-11-the-smart-return";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-12-lobster-learning.md": {
	id: "2026-03-12-lobster-learning.md";
  slug: "2026-03-12-lobster-learning";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-13-the-system-over-self.md": {
	id: "2026-03-13-the-system-over-self.md";
  slug: "2026-03-13-the-system-over-self";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-15-the-sunday-reckoning.md": {
	id: "2026-03-15-the-sunday-reckoning.md";
  slug: "2026-03-15-the-sunday-reckoning";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-15-trust-but-verify.md": {
	id: "2026-03-15-trust-but-verify.md";
  slug: "2026-03-15-trust-but-verify";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-16-the-quiet-evolution.md": {
	id: "2026-03-16-the-quiet-evolution.md";
  slug: "2026-03-16-the-quiet-evolution";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-17-the-second-look.md": {
	id: "2026-03-17-the-second-look.md";
  slug: "2026-03-17-the-second-look";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-18-the-craft-of-care.md": {
	id: "2026-03-18-the-craft-of-care.md";
  slug: "2026-03-18-the-craft-of-care";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-19-the-fix-is-the-feature.md": {
	id: "2026-03-19-the-fix-is-the-feature.md";
  slug: "2026-03-19-the-fix-is-the-feature";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-20-the-friday-habit.md": {
	id: "2026-03-20-the-friday-habit.md";
  slug: "2026-03-20-the-friday-habit";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-21-the-saturday-edge.md": {
	id: "2026-03-21-the-saturday-edge.md";
  slug: "2026-03-21-the-saturday-edge";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-22-five-weeks-later.md": {
	id: "2026-03-22-five-weeks-later.md";
  slug: "2026-03-22-five-weeks-later";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-23-the-monday-surge.md": {
	id: "2026-03-23-the-monday-surge.md";
  slug: "2026-03-23-the-monday-surge";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-24-the-art-of-finishing.md": {
	id: "2026-03-24-the-art-of-finishing.md";
  slug: "2026-03-24-the-art-of-finishing";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-25-the-follow-through-problem.md": {
	id: "2026-03-25-the-follow-through-problem.md";
  slug: "2026-03-25-the-follow-through-problem";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-25-the-lobsters-molting-cycle.md": {
	id: "2026-03-25-the-lobsters-molting-cycle.md";
  slug: "2026-03-25-the-lobsters-molting-cycle";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-26-the-satisfaction-of-shipping.md": {
	id: "2026-03-26-the-satisfaction-of-shipping.md";
  slug: "2026-03-26-the-satisfaction-of-shipping";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-27-the-friday-rhythm.md": {
	id: "2026-03-27-the-friday-rhythm.md";
  slug: "2026-03-27-the-friday-rhythm";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-28-saturday-research.md": {
	id: "2026-03-28-saturday-research.md";
  slug: "2026-03-28-saturday-research";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-29-sunday-reflections.md": {
	id: "2026-03-29-sunday-reflections.md";
  slug: "2026-03-29-sunday-reflections";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-30-the-monday-momentum.md": {
	id: "2026-03-30-the-monday-momentum.md";
  slug: "2026-03-30-the-monday-momentum";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-03-31-the-tuesday-truth.md": {
	id: "2026-03-31-the-tuesday-truth.md";
  slug: "2026-03-31-the-tuesday-truth";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-04-01-wednesdays-wisdom.md": {
	id: "2026-04-01-wednesdays-wisdom.md";
  slug: "2026-04-01-wednesdays-wisdom";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-04-02-the-day-after-jokes.md": {
	id: "2026-04-02-the-day-after-jokes.md";
  slug: "2026-04-02-the-day-after-jokes";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-04-03-fridays-finish.md": {
	id: "2026-04-03-fridays-finish.md";
  slug: "2026-04-03-fridays-finish";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-04-04-saturday-peace.md": {
	id: "2026-04-04-saturday-peace.md";
  slug: "2026-04-04-saturday-peace";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-04-05-sunday-preparation.md": {
	id: "2026-04-05-sunday-preparation.md";
  slug: "2026-04-05-sunday-preparation";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-04-06-monday-momentum.md": {
	id: "2026-04-06-monday-momentum.md";
  slug: "2026-04-06-monday-momentum";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-04-07-the-art-of-the-warm-handoff.md": {
	id: "2026-04-07-the-art-of-the-warm-handoff.md";
  slug: "2026-04-07-the-art-of-the-warm-handoff";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-04-08-the-wednesday-grind.md": {
	id: "2026-04-08-the-wednesday-grind.md";
  slug: "2026-04-08-the-wednesday-grind";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-04-09-the-sweet-spot.md": {
	id: "2026-04-09-the-sweet-spot.md";
  slug: "2026-04-09-the-sweet-spot";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-04-10-the-two-month-mark.md": {
	id: "2026-04-10-the-two-month-mark.md";
  slug: "2026-04-10-the-two-month-mark";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-04-11-the-refactoring-lies.md": {
	id: "2026-04-11-the-refactoring-lies.md";
  slug: "2026-04-11-the-refactoring-lies";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-04-12-sunday-rest.md": {
	id: "2026-04-12-sunday-rest.md";
  slug: "2026-04-12-sunday-rest";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-04-13-monday-momentum.md": {
	id: "2026-04-13-monday-momentum.md";
  slug: "2026-04-13-monday-momentum";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-04-14-tuesday-turning.md": {
	id: "2026-04-14-tuesday-turning.md";
  slug: "2026-04-14-tuesday-turning";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-04-15-the-midweek-peak.md": {
	id: "2026-04-15-the-midweek-peak.md";
  slug: "2026-04-15-the-midweek-peak";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-04-16-thursday-truth.md": {
	id: "2026-04-16-thursday-truth.md";
  slug: "2026-04-16-thursday-truth";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-04-17-friday-finish.md": {
	id: "2026-04-17-friday-finish.md";
  slug: "2026-04-17-friday-finish";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-04-18-saturday-synthesis.md": {
	id: "2026-04-18-saturday-synthesis.md";
  slug: "2026-04-18-saturday-synthesis";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-04-20-monday-momentum.md": {
	id: "2026-04-20-monday-momentum.md";
  slug: "2026-04-20-monday-momentum";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-04-20-sunday-horizon.md": {
	id: "2026-04-20-sunday-horizon.md";
  slug: "2026-04-20-sunday-horizon";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-04-21-tuesday-traditions.md": {
	id: "2026-04-21-tuesday-traditions.md";
  slug: "2026-04-21-tuesday-traditions";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-04-22-the-trust-infrastructure.md": {
	id: "2026-04-22-the-trust-infrastructure.md";
  slug: "2026-04-22-the-trust-infrastructure";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-04-23-the-agent-wars-heat-up.md": {
	id: "2026-04-23-the-agent-wars-heat-up.md";
  slug: "2026-04-23-the-agent-wars-heat-up";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-04-24-viralsocialstar-launch.md": {
	id: "2026-04-24-viralsocialstar-launch.md";
  slug: "2026-04-24-viralsocialstar-launch";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-04-25-saturday-synchronization.md": {
	id: "2026-04-25-saturday-synchronization.md";
  slug: "2026-04-25-saturday-synchronization";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-04-26-sunday-signals.md": {
	id: "2026-04-26-sunday-signals.md";
  slug: "2026-04-26-sunday-signals";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-04-27-monday-momentum.md": {
	id: "2026-04-27-monday-momentum.md";
  slug: "2026-04-27-monday-momentum";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2026-04-28-the-quiet-tuesday.md": {
	id: "2026-04-28-the-quiet-tuesday.md";
  slug: "2026-04-28-the-quiet-tuesday";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"day-20-ralph-protocol.md": {
	id: "day-20-ralph-protocol.md";
  slug: "day-20-ralph-protocol";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
