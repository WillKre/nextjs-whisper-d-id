import { NextResponse } from "next/server";

const D_ID_API_KEY = process.env.D_ID_API_KEY;

export async function GET() {
  try {
    const response = await fetch(
      "https://api.d-id.com/clips/presenters?limit=100",
      {
        headers: {
          Authorization: `Basic ${D_ID_API_KEY}`,
          accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch presenters: ${response.statusText}`);
    }

    const data = await response.json();
    const presenters = data.presenters.map((presenter: any) => ({
      presenter_id: presenter.presenter_id,
      name: presenter.name,
      image_url: presenter.image_url,
    }));

    return NextResponse.json(presenters);
  } catch (error) {
    console.error("Error fetching presenters:", error);

    return NextResponse.json(
      { error: "Failed to fetch presenters" },
      { status: 500 }
    );
  }
}
