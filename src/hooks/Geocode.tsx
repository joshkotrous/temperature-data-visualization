import axios, { AxiosResponse } from "axios";

interface Location {
  city: string;
  state: string;
  country: string;
}

interface GeocodeResponse {
  results: {
    types: string[];
    address_components: {
      long_name: string;
      // Add other properties as needed
    }[];
    // Add other properties as needed
  }[];
  // Add other properties as needed
}

export const Geocode = async (lat: number, lng: number): Promise<Location> => {
  let location: Location = { city: "", state: "", country: "" };
  let city: string = "";
  let state: string = "";
  let country: string = "";
  try {
    const response: AxiosResponse<GeocodeResponse> = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
        import.meta.env.VITE_GOOGLE_API_KEY
      }`
    );
    console.log(response.data);
    for (let i = 0; i < response.data["results"].length; i++) {
      if (response.data["results"][i]["types"].includes("postal_code")) {
        try {
          city =
            response.data["results"][i]["address_components"][1]["long_name"];
        } catch {}
        try {
          state =
            response.data["results"][i]["address_components"][2]["long_name"];
        } catch {}
        try {
          country =
            response.data["results"][i]["address_components"][3]["long_name"];
        } catch {}
      }
    }

    location = {
      city: city,
      state: state,
      country: country,
    };
    console.log(location);
    return location;
  } catch {}
  return location;
};

// export async function geoCode(lat, lng) {
//   let city;
//   let state;
//   let country;
//   console.log(lat, lng);
//   return await fetch(
//     `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCdBWJ4AXT-ofTvY4bR9qrvtPEFvFyJp-M`
//   )
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json(); // Parse the JSON response
//     })
//     .then((data) => {
//       // Process the data
//       //   console.log(data);
//       try {
//         console.log(data["results"]);

//         // console.log(data["results"][0]["address_components"][1]["long_name"]);
//         // console.log(data["results"][0]["address_components"][2]["long_name"]);
//         // console.log(data["results"][0]["address_components"][3]["long_name"]);
//         // console.log(data["results"][0]["address_components"][4]["long_name"]);
//         // console.log(data["results"][0]["address_components"][5]["long_name"]);
//         // console.log(data["results"][0]["address_components"][6]["long_name"]);
//         for (let i = 0; i < data["results"].length; i++) {
//           if (data["results"][i]["types"].includes("postal_code")) {
//             try {
//               city = data["results"][i]["address_components"][1]["long_name"];
//             } catch {}
//             try {
//               state = data["results"][i]["address_components"][2]["long_name"];
//             } catch {}
//             try {
//               country =
//                 data["results"][i]["address_components"][3]["long_name"];
//             } catch {}
//           }
//         }
//         return {
//           city: city,
//           state: state,
//           country: country,
//         };
//       } catch {}
//     })
//     .catch((error) => {
//       console.error("There was a problem with the fetch operation:", error);
//     });
// }
