import Listing from "../models/listing.model.js"

export const createListing = async (req, rest, next) =>{
    try {
        const listing = await Listing.create(req.body);
        return rest.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}