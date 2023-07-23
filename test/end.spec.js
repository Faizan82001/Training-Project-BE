const { db } = require('../utils/fireStoreHelper');

describe('test end testcases', () => {
    it('delete data from firestore database', async () => {
        const data = await db.listCollections();
        const deletePromises = data.map(async (collection) => {
            const documents = await collection.listDocuments();
            return Promise.all(documents.map((document) => document.delete()));
        });

        await Promise.all(deletePromises);
    });
});
