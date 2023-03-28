import Place from "../../../db/models/Place";
import dbConnect from "../../../db/connect";

export default async function handler(request, response) {
  // return response.status(200).json(places);
  await dbConnect();
  if (request.method === "GET") {
    const places = await Place.find();
    return response.status(200).json(places);
  }

  if (request.method === "POST") {
    try {
      const placeData = request.body;
      const place = new Place(placeData);
      await place.save();
      response.status(201).json({ status: "place created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  } else {
    return response.status(405).json({ message: "method not allowed" });
  }
}
