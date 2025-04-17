const { model, Schema } = require('mongoose');

const GeotargetSchema = new Schema({
  criteriaId: String,
  name: String,
  canonicalName: String,
  targetType: String,
  countryCode: String,
});

const GeotargetModel = model('Geotarget', GeotargetSchema);

module.exports = GeotargetModel;
