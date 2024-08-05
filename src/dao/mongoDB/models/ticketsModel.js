import mongoose, { Schema } from "mongoose";
import crypto from "crypto";

const collectionTickets = "Tickets";

const schemaTickets = new Schema({
  code: {
    type: String,
    default: function () {
      return crypto.randomUUID()
    },
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  },
});

export const ticketsModel = mongoose.model(collectionTickets, schemaTickets)