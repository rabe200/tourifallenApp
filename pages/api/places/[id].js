import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id);
    if (!place) {
      return response.status(404).json({ status: "not found" });
    }
    response.status(200).json(place);
  } else if (request.method === "PATCH") {
    const placeToUpdate = await Place.findByIdAndUpdate(id, {
      $set: request.body,
    });
    response.status(200).json(placeToUpdate);
  } else if (request.method === "DELETE") {
    const placeToDelete = await Place.findByIdAndDelete(id);
    response.status(200).json(placeToDelete);
  } else {
    response.status(405).json({ status: "method not allowed" });
  }
}
