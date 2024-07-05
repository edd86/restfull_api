const express = require("express");
const router = express.Router();
const Client = require("../models/client");

/**
 * GET request to retrieve all clients
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find({});
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Handle POST request to create a new client.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - JSON response with the newly created client or error message.
 */
router.post("/", async (req, res) => {
  const client = new Client({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    city: req.body.city,
    socialNetworks: req.body.socialNetworks,
  });
  try {
    const newClient = await client.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * GET client by ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
router.get("/:id", getClient, (req, res) => {
  res.json(res.client);
});

router.patch("/:id", getClient, async (req, res) => {
  if (req.body.name != null) {
    res.client.name = req.body.name;
  }
  if (req.body.email != null) {
    res.client.email = req.body.email;
  }
  if (req.body.phone != null) {
    res.client.phone = req.body.phone;
  }
  if (req.body.address != null) {
    res.client.address = req.body.address;
  }
  if (req.body.city != null) {
    res.client.city = req.body.city;
  }
  if (req.body.socialNetworks != null) {
    res.client.socialNetworks = req.body.socialNetworks;
  }
  try {
    const updatedClient = await res.client.save();
    res.json(updatedClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", getClient, async (req, res) => {
  try {
    await res.client.remove();
    res.json({ message: "Client deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getClient(req, res, next) {
  let client;
  try {
    client = await Client.findById(req.params.id);
    if (client == null) {
      return res.status(404).json({ message: "Client not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.client = client;
  next();
}

module.exports = router;
