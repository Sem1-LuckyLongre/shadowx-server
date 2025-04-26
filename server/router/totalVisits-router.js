const express = require("express");
const router = express.Router();

const TotalVisits = require("../models/totalVisites-model");

// router.route("/totalvisits").get((req, res) => {
//   try {
//     const totalVisits = TotalVisits.find();
//     if (!totalVisits || totalVisits.length === 0) {
//       return res.status(404).json({ message: "Total Visits Not Found" });
//     }
//     res.status(200).json({ totalVisits: totalVisits.totalVisits });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

router.route("/totalvisits").patch(async (req, res) => {
  try {
    const totalVisits = TotalVisits.findOne({});
    if (totalVisits === undefined) {
      return res.status(400).json({ message: "Total Visits is required" });
    }
    const updatedTotalVisits = await TotalVisits.findOneAndUpdate(
      {},
      { totalVisits: totalVisits.totalVisits + 1 },
      { new: true }
    );
    res.status(200).json(updatedTotalVisits);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
