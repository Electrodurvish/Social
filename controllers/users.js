import User from '../models/user.js';

// Read: Get user by ID
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id); // Corrected to findById (instead of findbyId)
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Get user's friends
export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id); // Corrected to findById (instead of findbyId)

        // Await Promise.all for fetching all friends
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        // Map friends' data into a formatted array
        const formattedFriends = friends.map(({ _id, firstName, lastName, picturePath, location, occupation }) => {
            return { _id, firstName, lastName, picturePath, location, occupation }; // Fixed typo __id to _id
        });

        res.status(200).json(formattedFriends);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
