import { IResolvers } from 'apollo-server-express';
import { Database, Listing } from '../../../lib/types';
import { ObjectID } from 'mongodb';

export const listingResolvers:IResolvers = {
  Query: {
    listings: async (_root: undefined, args: {}, { db }: { db: Database }): Promise<Listing[]> => {
      return await db.listings.find({}).toArray();
    }
  },
  Mutation: {
    deleteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
      ): Promise<Listing> => {
        const deleteResult = await db.listings.findOneAndDelete({
          _id: new ObjectID(id)
      });

      if (!deleteResult.value) {
        throw new Error("Failed to delete listing");
      }

      return deleteResult.value;
    }
  },
  Listing: {
    id: (listing:Listing):string => listing._id.toString()
  }
}