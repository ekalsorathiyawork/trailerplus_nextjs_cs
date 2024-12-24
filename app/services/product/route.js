// import { NextResponse } from "next/server";
// export async function GET() {
//   try {
//     // Fetch brand data from the provided API endpoint
//     const response = await fetch(
//       "https://www.trailerplus.eu/api/v1/pwa/products"
//     );
//     const data = await response.json();
//     const res = data.data;
//     return NextResponse.json({
//       res,
//     });
//   } catch (error) {
//     console.error("Error fetching brand data:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch brand data" },
//       { status: 500 }
//     );
//   }
// }
