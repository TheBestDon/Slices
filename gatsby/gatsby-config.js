import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
  siteMetadata: {
    title: `Slicks Slices`,
    siteUrl: 'http://doncloud.guru',
    description: 'Shopping demo site',
    twitter: '@donas04',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'thfcclu8',
        dataset: 'production',
        token: process.env.SANITY_TOKEN,
        watchMode: true,
      },
    },
  ],
};
