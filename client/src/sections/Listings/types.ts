export interface Listing {
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

export interface DeleteListingData {
  deleteListings: Listing;
}

export interface DeleteListingVariables {
  id: string;
}

export interface ListingData {
  listings: Listing[];
}

