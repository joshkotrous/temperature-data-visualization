import axios, { AxiosResponse } from "axios";

export const GetHeatmapData = async (): Promise<string[][]> => {
  let dataArray: string[][] = [];

  const getData = async (): Promise<string> => {
    try {
      // Make GET request using Axios
      const response: AxiosResponse<string> = await axios.get<string>(
        "filtered_data.csv"
      );
      return response.data; // Return the data from the response
    } catch (error) {
      console.error("Error fetching posts:", error);
      return ""; // Return an empty array in case of error
    }
  };

  await getData()
    //   .then((response) => response.text())
    .then((csvData) => {
      // Parse the CSV data
      const rows = csvData.split("\n");
      dataArray = rows.map((row) => row.split(","));
    })
    .catch((error) => {
      console.error("Error fetching the CSV file:", error);
    });
  return dataArray;
};
