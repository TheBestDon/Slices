import { useEffect, useState } from 'react';

const gql = String.raw;

const deets = `
name
_id
image {
  asset {
    url
    metadata {
      lqip
    }
  }
}`;

export const useLatestData = (params) => {
  const [hotSlices, setHotSlices] = useState();
  const [slicemasters, setSlimasters] = useState();

  useEffect(() => {
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
               ${deets}
              }
              hotslices {
               ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setHotSlices(res.data.StoreSettings.hotslices);
        setSlimasters(res.data.StoreSettings.slicemaster);
      });
    return () => {};
  }, []);
  return {
    hotSlices,
    slicemasters,
  };
};
