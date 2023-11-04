import Listing from "../models/listing.model.js"
import { errorHandler } from "../utils/errors.js";

export const createListing = async (req, rest, next) =>{
    try {
        const listing = await Listing.create(req.body);
        return rest.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}

export const deleteListing =  async (req, res, next) =>{
    const listing = await Listing.findById(req.params.id)

    if(!listing){
        return next(errorHandler(404, 'Listing not found'))
    }

    if(req.user.id.toString() !== listing.userRef.toString()){ //convertirdos a strings antes de compararlos, ya que la comparación directa de objetos de ObjectId puede fallar incluso si representan el mismo ID.
        return next(errorHandler(401, 'You can only delete your own listings!'));
    } 

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted')
    } catch (error) {
        next(error)
    }
}

export const updateListing = async (req, res, next) =>{
    const listing = await Listing.findById(req.params.id)
    if(!listing){
        return next(errorHandler(404, 'Listing not found'))
    }
    if(req.user.id.toString() !== listing.userRef.toString()){
        return next(errorHandler(401, 'You can only update your own listings!'))
    }

    try {
        const updateListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        res.status(200).json(updateListing)
    } catch (error) {
        next(error)
    }
}

export const getListing = async (req, res, next) =>{
    try {
        const listing = await Listing.findById(req.params.id)
        if(!listing){
            return next(errorHandler(404, 'Listing not found'))
        }
        res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}