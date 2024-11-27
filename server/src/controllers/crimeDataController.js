import { Router } from "express";
import {
  getDataGroupedByYear,
  getDataByCommunityAndYear,
  getDataGroupedByCategory,
  getYearlyDataGroupedByCategory,
  getDataGroupedByCrimeType,
} from "../services/crimeDataService.js";

export const crimeDataGroupedByYear = async (req, res) => {
  console.log(
    ">>>>>crimeDataGroupedByYear:" + JSON.stringify(req.query.community)
  );
  const community = req.query.community;
  try {
    const dataByYear = await getDataGroupedByYear(community);
    res.json(dataByYear);
  } catch (error) {
    res.status(500).send("Error fetching data by year");
  }
};

export const crimeDataByYearAndCommunity = async (req, res) => {
  const community = req.query.community;
  const year = req.query.year;
  console.log(
    ">>>>>crimeDataByYearAndCommunity community:" + community + ", year:" + year
  );
  try {
    const dataByYear = await getDataByCommunityAndYear(community, year);
    res.json(dataByYear);
  } catch (error) {
    res.status(500).send("Error fetching data by year");
  }
};

export const crimeDataGroupedByCrimeType = async (req, res) => {
  console.log(">>>>>crimeDataGroupedByCrimeType:" + req.query.community);
  const community = req.query.community;
  try {
    const dataByCategory = await getDataGroupedByCategory(community);
    res.json(dataByCategory);
  } catch (error) {
    res.status(500).send("Error fetching data by category");
  }
};

export const crimeYearlyDataGroupedByCrimeType = async (req, res) => {
  const community = req.query.community;
  const year = req.query.year;
  console.log(">>>>>crimeDataGroupedByCrimeTypeAndYear:" + req.query.community+", year:"+year);
  try {
    const dataByCategory = await getYearlyDataGroupedByCategory(community, year);
    res.json(dataByCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data by category");
  }
};
/* Created by Isha starts */
/* CCS-28 Get Crime data group by crime type with Parameters Year & Community Name*/

export const crimeDataGroupedByCrimeTypePieChart = async (req, res) => {
  console.log(
    ">>>>>crimeDataGroupedByCrimeType for Pie Chart:" +
      req.query.community +
      "====" +
      req.query.year
  );
  const community = req.query.community;
  const year = req.query.year;
  try {
    const dataByCrimeType = await getDataGroupedByCrimeType(community, year);
    res.json(dataByCrimeType);
  } catch (error) {
    res.status(500).send("Error fetching data by category");
  }
};

/* CCS-45 Get Crime data group by crime type & Month with Parameters Year & Community Name*/

export const crimeDataGroupedByCrimeTypeAndMonth = async (req, res) => {
  console.log(
    ">>>>>crimeDataGroupedByCrimeType for Pie Chart:" +
      req.query.community +
      "====" +
      req.query.year
  );
  const community = req.query.community;
  const year = req.query.year;
  try {
    const dataByMonth = await getDataGroupedByCrimeTypeAndMonth(
      community,
      year
    );
    res.json(dataByMonth);
  } catch (error) {
    res.status(500).send("Error fetching data by category");
  }
};

/* Created by Isha Ends */
