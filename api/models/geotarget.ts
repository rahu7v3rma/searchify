import { Schema, model } from "mongoose";

const GeotargetSchema = new Schema({
  criteriaId: String,
  name: String,
  canonicalName: String,
  targetType: String,
  countryCode: String,
});

const GeotargetModel = model('Geotarget', GeotargetSchema);

module.exports = GeotargetModel;
