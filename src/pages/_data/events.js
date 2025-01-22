import 'dotenv/config';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import slugify from '@sindresorhus/slugify';
import Fetch from '@11ty/eleventy-fetch';
import markdownIt from 'markdown-it';

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

const n2m = new NotionToMarkdown({
  notionClient: notion,
  config: {
    separateChildPage: true, // default: false
  },
});

export default async () => {
  console.log('Getting events from Notion');
  const now = Date.now();
  const md = new markdownIt({
    html: true,
    breaks: true,
  });
  const eventPages = await Fetch(async () => {
		const eventsPage = await n2m.pageToMarkdown('18257322529080aaa209ea421c002240'); // events
    const eventsParsed = n2m.toMarkdownString(eventsPage);
    const eventPages = Object.keys(eventsParsed).map((title) => {
      const slug = slugify(title);
      const permalink = `/events/${slug}/`;
      const content = md.render(eventsParsed[title]);
      const eventPage = {
        title,
        slug,
        permalink,
        content,
      };
      return eventPage;
    });
    return eventPages;
	}, {
    duration: '1w',
    type: 'json',
  });
  console.log(`Finished getting events from Notion (${Date.now() - now}ms)`);
  return eventPages;
};
