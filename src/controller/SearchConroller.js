import Property from "../models/AddNest.js";

export const searchController = async (req, res) => {
    const searchParams = req.query;

    try {
        if (!searchParams || Object.keys(searchParams).length === 0) {
            return res.status(400).json({ message: "No search parameters provided" });
        }

        const query = {};

        if (searchParams.location) {
            query.location = { $regex: new RegExp(searchParams.location, 'i') }; // case-insensitive match
        }

        if (searchParams.flatType) {
            query.flatType = searchParams.flatType;
        }

        if (searchParams.rent) {
            query.rent = { $lte: Number(searchParams.rent) };
        }
        
        console.log("Search Query:", query);

        const properties = await Property.find(query);

        if (properties.length === 0) {
            return res.status(404).json({ message: "No properties found" });
        }

        res.status(200).json({ properties });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
