import React from 'react';
import { List, Avatar, Button, Spin, Alert } from "antd";
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from 'react-apollo';
import { Listings as ListingData } from './__generated__/Listings';
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables
} from './__generated__/DeleteListing';
import './styles/Listings.css';
import { ListingsSkeleton } from './components';


const LISTINGS = gql`
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

const DELETE_LISTING = gql`
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

  const [
    deleteListing,
    {
      loading: deleteListingLoading,
      error: deleteListingError
    }
  ] = useMutation<
    DeleteListingData,
    DeleteListingVariables
    >(DELETE_LISTING);

  const handleDeleteListing = async (id: string) => {
    await deleteListing({ variables: { id } });
    refetch();
  }

  const listings = data?.listings;

  const listingsList = listings ? (
    <List
      itemLayout="horizontal"
      dataSource={listings}
      renderItem={listing => (
        <List.Item
          actions={
            [
              <Button
                type="primary"
                onClick={ ()=> handleDeleteListing(listing.id)}>
                Delete
              </Button>
            ]
          }
        >
          <List.Item.Meta
            title={listing.title}
            description={listing.address}
            avatar={
              <Avatar
                src={listing.image}
                size={48}
                shape="square"
              />}
          />
        </List.Item>
      )}
    />
  ) : null;

  if (loading) {
    return (
      <div className="listings">
        <ListingsSkeleton title={title}/>
      </div>
    )
  }

  if (error) {
    return (
      <div className="listings">
        <ListingsSkeleton title={title} error={true}/>
      </div>
    )
  }

  const deleteListingErrorAlert = deleteListingError ? (
    <Alert
      className="listings-alert"
      type="error"
      message="Uh oh! Something went wrong with deleting - please try again later :("
    />
  ) : null;

  return (
    <div className="listings">
      <Spin spinning={deleteListingLoading}>
        {deleteListingErrorAlert}
        <h1>{title}</h1>
        {listingsList}
      </Spin>
    </div>
  )
}