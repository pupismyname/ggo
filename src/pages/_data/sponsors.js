require('dotenv').config();
const { Client } = require('@notionhq/client');
const slugify = require('slugify');

const year = '2024';

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

module.exports = (async () => {
  console.log('Getting sponsors from Notion');
  const now = Date.now();
  const sponsorships = await notion.databases.query({
    database_id: 'ac4bb5ff14da44b9b7dd43dea82c9d53',
    page_size: 1000,
    filter: { and: [ { property: 'Year', title: { equals: year } } ] },
  });
  const sponsors = {
    year,
    order: [ 'corporate', 'platinum', 'gold', 'silver', 'bronze', 'torch', 'friends' ],
    categories: {
      corporate: { sponsors: [], title: 'Corporate Sponsors', amount: '$10,000 or more' },
      platinum:  { sponsors: [], title:  'Platinum Sponsors', amount:   '$5000 – $9999' },
      gold:      { sponsors: [], title:      'Gold Sponsors', amount:   '$2500 – $4999' },
      silver:    { sponsors: [], title:    'Silver Sponsors', amount:   '$1000 – $2499' },
      bronze:    { sponsors: [], title:    'Bronze Sponsors', amount:     '$500 – $999' },
      torch:     { sponsors: [], title:         'Torch Club', amount:     '$100 – $499' },
      friends:   { sponsors: [], title:            'Friends', amount:       '$25 – $99' },
    },
  };
  sponsorships.results.reverse().forEach((sponsorship) => {
    const props = sponsorship?.properties;
    if (!props.Level?.select?.name) return;
    const slug = slugify(sponsorship.properties.Level.select.name, { lower: true });
    if (!slug || !sponsors.categories[slug]) return;
    sponsors.categories[slug].sponsors.push({
      order: props.Order?.number,
      name: props.Name?.rollup?.array[0]?.title[0].plain_text,
      location: props.Location?.rollup?.array[0]?.rich_text[0]?.plain_text,
      url: props.URL?.rollup?.array[0]?.url,
      image: props.Image?.rollup?.array[0]?.rich_text[0]?.plain_text,
    });
  });
  Object.keys(sponsors.categories).forEach((categoryName) => {
    const category = sponsors.categories[categoryName];
    // The default order from Notion doesn't respect drag-and-drop ordering in the table view. I'm
    // actually not sure what determines the default sort. Because of this there is an "Order"
    // field that allows you can move items to the beginning or end of the list.
    // ---
    // - Positive order values come first, smallest to largest (1, 2, 300)
    // - Order values of null or 0 keep default order
    // - Negative order values come last, largest to smallest (-300, -2, -1)
    // Example: [ 1, 2, 300, null, null, null, -300, -2, -1 ]
    category.sponsors = category.sponsors.sort((a, b) => {
      const sideA = +a.order; // coerce null to 0
      const sideB = +b.order; // coerce null to 0
      if (sideA > 0 && sideB > 0 || sideA < 0 && sideB < 0) {
        return sideA - sideB;
      } else {
        return sideB - sideA;
      }
    });
  });
  console.log(`Finished getting sponsors from Notion (${Date.now() - now}ms)`);
  return sponsors;
})();
