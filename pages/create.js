import Link from "next/link.js";
import styled from "styled-components";
import Form from "../components/Form.js";
import { StyledLink } from "../components/StyledLink.js";
import useSWR from "swr";
import { useState } from "react";

const StyledBackLink = styled(StyledLink)`
  justify-self: flex-start;
`;

export default function CreatePlacePage() {
  const [place, setPlace] = useState("");
  // const { mutate } = useSWR("/api/places");

  async function addPlace(place) {
    const response = await fetch("/api/places", {
      method: "POST",
      body: JSON.stringify(placeData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    router.push("/");

    if (response.ok) {
      await response.json();
      places.mutate();
      event.target.reset();
    } else {
      console.error(`Error: ${response.status}`);
    }
  }
  return (
    <>
      <h2 id="add-place">Add Place</h2>
      <Link href="/" passHref legacyBehavior>
        <StyledBackLink>back</StyledBackLink>
      </Link>
      <Form onSubmit={addPlace} formName={"add-place"} />
    </>
  );
}
