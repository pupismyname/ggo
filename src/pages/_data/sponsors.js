require('dotenv').config();
const { Client } = require('@notionhq/client');
const slugify = require('slugify');

const year = '2024';

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

module.exports = (async () => {
  const sponsorships = await notion.databases.query({
    database_id: '718fe32638324c308e83ce3e9e881735',
    filter: { and: [ { property: 'Year', title: { equals: year } } ] },
  });
  const sponsors = {
    year,
    order: [ 'corporate', 'platinum', 'gold', 'silver', 'bronze', 'torch', 'friends' ],
    categories: {
      corporate: { level: 1, title: 'Corporate Sponsors', amount: '$10,000 or more' },
      platinum:  { level: 2, title: 'Platinum Sponsors',  amount:   '$5000 – $9999' },
      gold:      { level: 3, title: 'Gold Sponsors',      amount:   '$2500 – $4999' },
      silver:    { level: 4, title: 'Silver Sponsors',    amount:   '$1000 – $2499' },
      bronze:    { level: 5, title: 'Bronze Sponsors',    amount:     '$500 – $999' },
      torch:     { level: 6, title: 'Torch Club',         amount:     '$100 – $499' },
      friends:   { level: 7, title: 'Friends',            amount:       '$25 – $99' },
    },
  };
  sponsorships.results.forEach((sponsorship) => {
    const level = sponsorship.properties;
    const slug = slugify(level.Level.select.name, { lower: true });
    sponsors.categories[slug].sponsors = level.Sponsor.relation.map((sponsor, i) => {
      return {
        location: level.Location.rollup.array[i].rich_text[0]?.plain_text,
        url: level.URL.rollup.array[i].url,
        image: level.Image.rollup.array[i].rich_text[0]?.plain_text,
        name: level.Name.rollup.array[i].title[0].plain_text,
      };
    });
  });
  return sponsors;
})();
