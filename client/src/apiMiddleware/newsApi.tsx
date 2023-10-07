import React from "react";
import axios from "axios";

export async function fetchHealthNews () {
  try {
    const res = await axios.get('https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=eea86d6ef7e94bb4a3e49ceaf2b0d188');
    return res;
  } catch (err) {
    throw err;
  }
}