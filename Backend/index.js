const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://gajananahegde002:9481774800@pricingclusterv2.ge13mym.mongodb.net/pricing_module', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const pricingSchema = new mongoose.Schema({
  name: String,
  isEnabled: Boolean,
  dayOfWeek: [String],
  distanceBasePrice: Number,
  distanceAdditionalPrice: Number,
  timeMultiplierFactor: Number,
  waitingCharges: Number,
});

const PricingConfig = mongoose.model('PricingConfig', pricingSchema);

app.post('/calculatePrice', async (req, res) => {
  try {
    const pricingConfig = await PricingConfig.findOne({ isEnabled: true, dayOfWeek: req.body.dayOfWeek });

    if (!pricingConfig) {
      return res.status(404).json({ error: 'Pricing configuration not found for the given day.' });
    }

    const distanceBasePrice = pricingConfig.distanceBasePrice;
    const distanceAdditionalPrice = pricingConfig.distanceAdditionalPrice;
    const timeMultiplierFactor = pricingConfig.timeMultiplierFactor;
    const waitingCharges = pricingConfig.waitingCharges;

    const additionalDistance = req.body.distance;
    const totalTime = req.body.time;
    const totalWaitingTime = req.body.waitingTime;

    const price = (distanceBasePrice + (additionalDistance * distanceAdditionalPrice)) + (totalTime * timeMultiplierFactor) + (totalWaitingTime * waitingCharges);

    res.json({ price });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
