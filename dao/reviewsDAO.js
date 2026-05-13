import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {

    static async injectDB(conn) {
        if (reviews) return;

        try {
            reviews = await conn.db("reviews").collection("reviews");
        } catch (e) {
            console.error("Failed to connect DB:", e);
        }
    }

    // CREATE
    static async addReview(movieId, user, review) {
        try {
            const doc = {
                movieId: parseInt(movieId),
                user,
                review
            };

            return await reviews.insertOne(doc);

        } catch (e) {
            console.error("addReview error:", e);
            return { error: e };
        }
    }

    // GET ONE REVIEW BY ID
    static async getReview(id) {
        try {
            return await reviews.findOne({
                _id: new ObjectId(id)
            });

        } catch (e) {
            console.error("getReview error:", e);
            return null;
        }
    }

    // UPDATE REVIEW
    static async updateReview(reviewId, user, review) {
        try {
            return await reviews.updateOne(
                { _id: new ObjectId(reviewId) },
                { $set: { user, review } }
            );

        } catch (e) {
            console.error("updateReview error:", e);
            return { error: e };
        }
    }

    // DELETE REVIEW
    static async deleteReview(reviewId) {
        try {
            return await reviews.deleteOne({
                _id: new ObjectId(reviewId)
            });

        } catch (e) {
            console.error("deleteReview error:", e);
            return { error: e };
        }
    }

    // GET REVIEWS BY MOVIE ID
    static async getReviewsByMovieId(movieId) {
        try {
            return await reviews.find({
                movieId: parseInt(movieId)
            }).toArray();

        } catch (e) {
            console.error("getReviewsByMovieId error:", e);
            return [];
        }
    }
}