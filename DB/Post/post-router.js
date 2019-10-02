const express = require("express");
const Post = require("../../data/db.js");
const router = express.Router();

router.get("/", (req, res) => {
  Post.find(req.query)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the post"
      });
    });
});

//GET All Post
router.get("/", (req, res) => {
  Post.find(req.query)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the post"
      });
    });
});

//GET Post by id
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "This ID does not exist." });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the post"
      });
    });
});

//GET Comments by post id
router.get("/:id/comments", (req, res) => {
  Post.findPostComments(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the post"
      });
    });
});

//POST a post
router.post("/", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post." });
  } else {
    Post.insert(req.body)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: "Error Adding the post"
        });
      });
  }
});
//POST a Comment to an id
router.post("/:id/comments", (req, res) => {
  const comment = req.body;
  const id = req.params;

  if (!comment.text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  } else {
    Post.insertComment(id, comment)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: "Error adding the comment to the post"
        });
      });
  }
});
//DELETE a Post by id
router.delete("/:id", (req, res) => {
  Post.remove(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "This ID does not exist." });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error adding the comment to the post"
      });
    });
});
//PUT Update post by id
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  if (!changes.title || !changes.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    Post.update(id, changes)
      .then(post => {
        if (post) {
          res.json(post);
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        }
      })

      .catch(error => {
        res.json({ message: "There was a error Updating a post" });
      });
  }
});

module.exports = router;
