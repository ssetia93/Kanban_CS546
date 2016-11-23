const express = require('express');
const router = express.Router();
const data = require("../data");
const recipeData = data.recipes;
const commentData = data.comments;



router.get("/recipe/:recipeId", (req, res) => {

    if (!req.params.recipeId) {
        res.status(400).json({ error: "Please provide recipe id for getting the comment details" });
        return;
    }

    commentData.getCommentByRecipeId(req.params.recipeId).then((comment) => {
        res.json(comment)
    }).catch(() => {
        res.status(404).json({ error: "Could not find the comment for the recipeId provided" });
    });
});

router.get("/:commentId", (req, res) => {

    if (!req.params.commentId) {
        res.status(400).json({ error: "Please provide the comment Id" });
        return;
    }

    commentData.getCommentById(req.params.commentId).then((comment) => {
        res.json(comment);
    }).catch((e) => {
        res.status(404).json({ error: "Comment not found" });
    });

});

router.post("/:recipeId", (req, res) => {
	let blogCommentData = req.body;
	const recipeId=req.params.recipeId;

    if (!recipeId) {
        res.status(400).json({ error: "Please provide a recipe Id for commenting on it" });
        return;
    }
	
	if (!blogCommentData) {
        res.status(400).json({ error: "Please provide inputs for posting the comment for a recipe" });
        return;
    }
	
	if (!blogCommentData.title) {
        res.status(400).json({ error: "Please provide a title for the recipe you wish to comment on" });
        return;
    }
	
	if (!blogCommentData.name ) {
        res.status(400).json({ error: "Please provide the comment name" });
        return;
    }
	
	if (!blogCommentData.poster ) {
        res.status(400).json({ error: "Please provide a poster name for the comment" });
        return;
    }
	
	if (blogCommentData._id) {
        res.status(400).json({ error: "You cannot provide an id for your comment. It will be generated for you." });
        return;
    }
	
    commentData.addComment(recipeId, blogCommentData.title, blogCommentData.name, blogCommentData.poster)
        .then((newComment) => {
            res.json(newComment);
        }).catch((e) => {
            res.status(500).json({ error: e });
        });
});

router.put("/:recipeId/:commentId", (req, res) => {
	let updatedData = req.body;
	const recipeId=req.params.recipeId;
	const commentId=req.params.commentId;
    

    if (!recipeId) {
        res.status(400).json({ error: "Please provide the Recipe ID of the recipe whose comments you wish to update" });
        return;
    }
    if (!commentId) {
        res.status(400).json({ error: "Please provide the Comment Id for updating a comment" });
        return;
    }
    if (!updatedData) {
        res.status(400).json({ error: "Please provide the data for updating a comment" });
        return;
    }
	
    if(!updatedData.name || !updatedData.poster){
        res.status(400).json({ error: "Please provide the comment name and poster information for updating a comment" });
        return;
    }
	
    if (updatedData._id) {
        res.status(400).json({ error: "You cannot update a comment Id" });
        return;
    }

    let getCommentsByRecipe = commentData.getCommentByRecipeId(recipeId);

    getCommentsByRecipe.then(() => {
        return commentData.updateComment(commentId, updatedData).then(() => {
            return recipeData.updateCommentInRecipe(recipeId,commentId, updatedData);
        }).then((updatedComment) => {
                res.json(updatedComment);
            }).catch((e) => {
                res.status(500).json({ error: e });
            });
    }).catch((error) => {
        res.status(404).json({ error: "Recipe not found" });
    });

});

router.delete("/:id", (req, res) => {
    let getComment = commentData.getCommentById(req.params.id);

    if (!req.params.id) {
        res.status(400).json({ error: "Please provide an Id for the comment that you wish to delete" });
        return;
    }

    getComment.then((res) => {
        let commentId=res._id;
        let recipeId=res.recipeId;
        return recipeData.removeCommentFromRecipe(recipeId,commentId);
    }).then(() => {
        return commentData.removeComment(req.params.id)
        .then(() => {
                res.sendStatus(200);
            }).catch((e) => {
                res.status(500).json({ error: e });
            });
    }).catch(() => {
        res.status(404).json({ error: "Recipe not found" });
    });
});

module.exports = router;