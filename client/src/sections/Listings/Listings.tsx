import React, { useState, useEffect } from 'react';
import { server } from '../../lib/api';
import {
  Listing,
  ListingData,
  DeleteListingData,
  DeleteListingVariables
} from './types'

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

const DELETELISTING = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`

interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {

  const [listings, setListings] = useState<
    Listing[] | null
  >(null);

  useEffect(() => {
    fetchListings();
  },[]);

  const fetchListings = async () => {
    const { data } =
      await server.fetch<ListingData>( {query:LISTINGS} );

    setListings(data.listings)
  }

  const deleteListings = async (id: string) => {
    const { data } =
      await server.fetch<DeleteListingData, DeleteListingVariables>( {
        query: DELETELISTING,
        variables: {
          id
        }
      } );
    console.log(data);
    fetchListings();
  }

  const listingsList = <ul>
    {listings?.map( listing => {
      return <li key={listing.id}>
        {listing.title}
        <button
         onClick={() => deleteListings(listing.id)}
        >
          Delete
        </button>
      </li>
    })}
  </ul>
  return (
    <div>
      <h1>{title}</h1>
      {listingsList}
    </div>
  )
}