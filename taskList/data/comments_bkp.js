const mongoCollections = require("../config/mongoCollections");
const comments = mongoCollections.comments;
const uuid = require('node-uuid');
const recipe=require("./recipes");

let exportedMethods = {
    getAllComments() {
        return comments().then((commentCollection) => {
            return commentCollection
				.find({})
				.toArray()
				.then((comment) => {
					return comment;
            });
        });
    },
    getCommentById(id) {
        return comments().then((commentCollection) => {
            return commentCollection
				.findOne({ _id: id })
				.then((comment) => {
					if (!comment) 
						throw "Comment not found";
					return comment;
				});
        });
    },
    getCommentByRecipeId(recipeId) {
        return comments().then((commentCollection) => {
            return commentCollection
			.find({ recipeId: recipeId })
			.toArray()
			.then((comment) => {
                if(comment.length==0){
                    throw "Could not find the comment for the recipeId provided";
                }
                return comment;
            });
        });
    },
    
    addComment(recipeId,recipeTitle, commentName, commentPosters) {
		
        return comments().then((commentCollection) => {
            return recipe.getRecipeById(recipeId).then((commentPostedBy) => {
            	
                let newComment = {
                	recipeId: recipeId,
					recipeTitle: recipeTitle,
					name: commentName, 
                	poster: commentPosters,
					_id:uuid.v4()                	 
                	
                };

                return commentCollection.insertOne(newComment).then((newInsertInformation) => {
					
                	
                    return newInsertInformation.insertedId;
					
                }).then((newId) => {
                    return this.getCommentById(newId);
					
                }).then((comment) => {
                   
                    recipe.addCommentToRecipe(comment.recipeId,comment._id,comment.name,comment.poster);
                    return comment;
                });
            });
        });
    },
    removeComment(id) {
        return comments().then((commentCollection) => {
            return commentCollection
			.removeOne({ _id: id })
			.then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw(`Could not delete post with id of ${id}`)
                } else {}
            });
        });
    },
    
    updateComment(id, updatedComment) {
        return comments().then((commentCollection) => {
           
            let updatedCommentData = {};

            if (updatedComment.name) {
                updatedCommentData.name =updatedComment.name;
            }

            if (updatedComment.poster) {
                updatedCommentData.poster = updatedComment.poster;
            }

            let updatedCommand = {
                $set: updatedCommentData 
            };

            return commentCollection
			.updateOne({ _id: id }, updatedCommand)
			.then((result) => {
                return this.getCommentById(id);
            });
        });
    }
}

module.exports = exportedMethods;