//Importing Router
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//Importing Controller for Index
const index=require('../controller/Index.controller');

//Configuring routing
router.post('/login', index.login );
router.get('/logout',index.logout);
router.post('/signup',index.signup);
// Endpoint to drop a collection
router.delete('/delete-collection/:collectionName', async (req, res) => {
    const { collectionName } = req.params;
    try {
        // Check if the collection exists
        const collections = await mongoose.connection.db.listCollections({ name: collectionName }).toArray();
        if (collections.length === 0) {
            return res.status(404).json({ message: `Collection "${collectionName}" not found` });
        }

        // Drop the collection
        await mongoose.connection.db.dropCollection(collectionName);
        res.status(200).json({ message: `Collection "${collectionName}" dropped successfully` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while dropping the collection', error: err.message });
    }
});
module.exports = router;