import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('blog', (post) => !post.data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  
  return rss({
    title: 'Remy the Lobster',
    description: 'The digital adventures of Remy, the AI lobster COO in training.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      categories: post.data.categories,
    })),
    customData: `<language>en-us</language>`,
  });
}
