const Drink = require("../models/drink");

const drinkController = {
  //get all drink for admin
  getAllForAdmin: async (req, res) => {
    try {
      const drinks = await Drink.find({ isDeleted: false });
      res.status(200).send({ data: drinks });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //get all drink for user
  getAllForUser: async (req, res) => {
    try {
      const drinks = await Drink.find({ isActive: true, isDeleted: false });
      res.status(200).send({ data: drinks });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //create a drink
  create: async (req, res) => {
    try {
      const { name, type, price, isActive } = req.body;
      const existedName = await Drink.findOne({ name });
      if (existedName) {
        return res.status(400).json({ message: "Name already existed" });
      }
      const newDrink = new Drink({ name, type, price, isActive });
      const drink = await newDrink.save();
      res.status(200).json(drink);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //get a drink
  getOne: async ({ params }, res) => {
    try {
      const result = await Drink.findOne({ _id: params.id });
      if (result == null || result?.isDeleted == true) {
        res.status(400).json("Drink not exist or has been deleted");
      }
      res.status(result ? 200 : 400).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  //update a drink
  update: async (req, res) => {
    const { name, type, price, isActive } = req.body;
    if (!name.trim()) {
      res.status(400).json("Missing Name");
      return;
    }
    if (!type.trim()) {
      res.status(400).json("Missing Type");
      return;
    }
    if (!price) {
      res.status(400).json("Missing Price");
      return;
    }
    const result = await Drink.findOne({ _id: req.params.id });
    if (result == null || result?.isDeleted == true) {
      res.status(400).json("Drink not exist or has been deleteced");
      return;
    }
    try {
      const updatedDrink = await Drink.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(200).json(updatedDrink);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  //delete a drink
  delete: async (req, res) => {
    try {
      const result = await Drink.findOne({ _id: req.params.id });

      if (result && !result.isDeleted) {
        await Drink.findOneAndUpdate(
          { _id: req.params.id },
          { isDeleted: true },
          { new: true }
        );
        res.status(200).json("Delete success");
      } else {
        res.status(404).json("Drink not found or already deleted");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = drinkController;
