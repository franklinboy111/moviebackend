import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {

    // CREATE
    static async apiPostReview(req, res) {
        try {
            const movieId = req.body.movieId;
            const user = req.body.user;
            const review = req.body.review;

            await ReviewsDAO.addReview(movieId, user, review);

            res.json({ status: "success" });

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    // GET ONE REVIEW
    static async apiGetReview(req, res) {
        try {
            const id = req.params.id;

            const review = await ReviewsDAO.getReview(id);

            if (!review) {
                return res.status(404).json({ error: "not found" });
            }

            res.json(review);

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    // GET BY MOVIE ID
    static async apiGetReviewsByMovieId(req, res) {
        try {
            const movieId = req.params.id;

            const reviews = await ReviewsDAO.getReviewsByMovieId(movieId);

            res.json(reviews);

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    // UPDATE
    static async apiUpdateReview(req, res) {
        try {
            const reviewId = req.params.id;
            const user = req.body.user;
            const review = req.body.review;

            const response = await ReviewsDAO.updateReview(
                reviewId,
                user,
                review
            );

            if (!response || response.error) {
                return res.status(400).json({ error: "Update failed" });
            }

            if (response.modifiedCount === 0) {
                return res.status(404).json({ error: "No document updated" });
            }

            res.json({
                status: "success",
                response
            });

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    // DELETE
    static async apiDeleteReview(req, res) {
        try {
            const reviewId = req.params.id;

            await ReviewsDAO.deleteReview(reviewId);

            res.json({ status: "success" });

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}