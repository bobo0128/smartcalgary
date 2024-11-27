import { getCrimeDataGroupedByCommunity } from "../services/crimeCityBoundaryService.js";

export const getCrimeData = async (req, res) => {
    try {
      const year = req.query.year;
      const data = await getCrimeDataGroupedByCommunity(year);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };