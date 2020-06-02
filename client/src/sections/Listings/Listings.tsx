import React from 'react';
import { server } from '../../lib/api';
import { ListingData } from './types'

const LISTINGS = `
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {

  const fetchListings = async () => {
    const { data } =
     await server.fetch<ListingData>( {query:LISTINGS} );
    console.log(data);
  }
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={fetchListings}>Query Listings!</button>
    </div>
  )
}