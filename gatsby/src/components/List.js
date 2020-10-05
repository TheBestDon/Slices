import { Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
`;

const ItemStyles = styled.div`
  display: grid;
  /* Take your row sizing not from the ItemStyles div, but from the GridStyles grid */
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
  }
`;

const SingleItem = ({ item }) => (
  <ItemStyles>
    <Link to={`/pizza/${item.slug.current}`}>
      <h2>
        <span className="mark">{item.name}</span>
      </h2>
    </Link>
    <p>{item.toppings.map((t) => t.name).join(', ')}</p>
    <Img fluid={item.image.asset.fluid} alt={item.name} />
  </ItemStyles>
);
const List = ({ items }) => (
  <GridStyles>
    {items.map((item) => (
      <SingleItem key={item.id} item={item} />
    ))}
  </GridStyles>
);

export default List;
