interface Listing {
  id: string;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfGuests: number;
  numOfBeds: number;
  numOfBaths: number;
  rating: number;
}

export interface DeleteListing {
  deleteListings: Listing;
}

export interface DeleteListingVariables {
  id: string;
}

export interface ListingData {
  listings: Listing[];
}

