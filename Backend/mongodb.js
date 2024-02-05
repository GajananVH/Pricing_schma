const mongoose = require('mongoose');

// Define the schema
const pricingSchema = new mongoose.Schema({
  name: String,
  isEnabled: Boolean,
  dayOfWeek: [String],
  distanceBasePrice: Number,
  distanceAdditionalPrice: Number,
  timeMultiplierFactor: Number,
  waitingCharges: Number,
});

// Create a Mongoose model based on the schema
const PricingConfig = mongoose.model('PricingConfig', pricingSchema);

// Sample data
const defaultPricingConfigs = [
  {
    name: 'DefaultTueWedThu',
    isEnabled: true,
    dayOfWeek: ['Tue', 'Wed', 'Thu'],
    distanceBasePrice: 80,
    distanceAdditionalPrice: 30,
    timeMultiplierFactor: 1,
    waitingCharges: 5,
  },
  {
    name: 'DefaultSatMon',
    isEnabled: true,
    dayOfWeek: ['Sat', 'Mon'],
    distanceBasePrice: 90,
    distanceAdditionalPrice: 28,
    timeMultiplierFactor: 1.25,
    waitingCharges: 5,
  },
  {
    name: 'DefaultSun',
    isEnabled: true,
    dayOfWeek: ['Sun'],
    distanceBasePrice: 95,
    distanceAdditionalPrice: 28,
    timeMultiplierFactor: 2.2,
    waitingCharges: 5,
  },
];

// Insert the data into the MongoDB collection
async function insertDefaultPricingConfigs() {
  try {
    await PricingConfig.insertMany(defaultPricingConfigs);
    console.log('Default pricing configurations added to the database.');
  } catch (error) {
    console.error('Error inserting default pricing configurations:', error);
  }
}

// Connect to MongoDB and insert data
mongoose.connect('mongodb://localhost:27017/pricing_module', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    insertDefaultPricingConfigs();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
