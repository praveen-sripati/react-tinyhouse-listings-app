import React from 'react';
import { server, useQuery } from '../../lib/api';
import {
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

  const {
    data,
    loading,
    error,
    refetch
  } = useQuery<ListingData>(LISTINGS);

  const deleteListings = async (id: string) => {
    const { data } =
      await server.fetch<DeleteListingData, DeleteListingVariables>( {
        query: DELETELISTING,
        variables: {
          id
        }
      } );
    console.log(data);
    refetch();
  }

  const listings = data?.listings;

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

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h2>Uh oh! Something went wrong - please try again later :(</h2>
  }

  return (
    <div>
      <h1>{title}</h1>
      {listingsList}
    </div>
  )
}