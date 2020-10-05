import path, { resolve } from 'path';
import fetch from 'isomorphic-fetch';

const turnPizzasIntoPages = async ({ graphql, actions }) => {
  const pizzaTemplate = path.resolve('./src/templates/Item.js');

  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
};

const turnToppingsIntoPages = async ({ graphql, actions }) => {
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');

  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
};

const fetchBeersAndTurnIntoNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const res = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await res.json();

  beers.forEach((beer) => {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  });
};

const turnSlicemastersIntoPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);
  data.slicemasters.nodes.forEach((slicemaster) => {
    actions.createPage({
      component: resolve('./src/templates/Slicemaster.js'),
      path: `/slicemaster/${slicemaster.slug.current}`,
      context: {
        name: slicemaster.person,
        slug: slicemaster.slug.current,
      },
    });
  });

  // 3. Figure out how many pages there are based on how many slicemasters there are, and how many per page!
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  console.log(
    `There are ${data.slicemasters.totalCount} total people. And we have ${pageCount} pages with ${pageSize} per page`
  );
  // 4. Loop from 1 to n and create the pages for them
  Array.from({ length: pageCount }).forEach((_, i) => {
    console.log(`Creating page ${i}`);
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      // This data is pass to the template when we create it
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
};

export const sourceNodes = async (params) => {
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
};

export const createPages = async (params) => {
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);
};
