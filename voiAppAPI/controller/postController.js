const Post = require("../models/post");

const postController = {
  //create a post
  create: async (req, res) => {
    if (!req.body?.header.trim()) {
      return res.status(400).send({
        message: "Missing header value",
      });
    }
    if (!req.body?.title.trim()) {
      return res.status(400).send({
        message: "Missing title value",
      });
    }
    if (!req.body?.desc.trim()) {
      return res.status(400).send({
        message: "Missing desc value",
      });
    }
    if (!req.body?.image.trim()) {
      return res.status(400).send({
        message: "Missing image value",
      });
    }
    try {
      const { header, title, desc, image, isActive } = req.body;
      const existedHeader = await Post.findOne({ header });
      if (existedHeader) {
        return res.status(400).json({ message: "Header already existed" });
      }
      const newPost = new Post({ header, title, desc, image, isActive });
      const post = await newPost.save();
      res.status(200).send({
        message: "Create successfull",
        data: post,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //get all post for admin
  getAllForAdmin: async (req, res) => {
    try {
      const posts = await Post.find({ isDeleted: false });
      res.status(200).send({ data: posts });
    } catch (error) {
      console.log(error);
      res.status(400).send({ messegae: "Get failed" });
    }
  },
  //get all post for user
  getAllForUser: async (req, res) => {
    try {
      const posts = await Post.find({ isActive: true, isDeleted: false });
      res.status(200).send({ data: posts });
    } catch (error) {
      res.status.json(error);
    }
  },
  //get a post
  getOne: async ({ params }, res) => {
    try {
      const result = await Post.findOne({ _id: params.id });
      if (result == null || result?.isDeleted == true) {
        res.status(400).json("Post not exist or has been deleted");
      }
      res.status(result ? 200 : 400).send({ result });
    } catch (error) {
      res.status(400).json(error);
    }
  },

  //update a post
  update: async (req, res) => {
    const { header, title, desc, image, isActive } = req.body;
    if (!header.trim()) {
      res.status(400).json("Missing header value");
      return;
    }
    if (!title.trim()) {
      res.status(400).json("Missing title value");
      return;
    }
    if (!desc.trim()) {
      res.status(400).json("Missing desc value");
      return;
    }
    if (!image.trim()) {
      res.status(400).json("Missing image value");
      return;
    }

    const result = await Post.findOne({ _id: req.params.id });
    if (result == null || result?.isDeleted == true) {
      res.status(400).json("Post not exist or has been deleteced");
      return;
    }
    const existedHeader = await Post.findOne({
      header: header,
      _id: { $ne: result._id },
    });
    console.log(existedHeader);
    if (existedHeader != null || existedHeader?.isDeleted == false) {
      res.status(400).json("Header already used");
      return;
    }
    try {
      const updatedPost = await Post.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(200).send({ data: updatedPost });
    } catch (error) {
      res.status(400).json(error);
    }
  },
  //delete a post
  delete: async (req, res) => {
    try {
      const result = await Post.findOne({ _id: req.params.id });
      if (result && !result.isDeleted) {
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          { isDeleted: true },
          { new: true }
        );
        res.status(200).json("Delete success");
      } else {
        res.status(404).json("Post not found or already deleted");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = postController;
