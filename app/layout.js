import { SpeedInsights } from "@vercel/speed-insights/next";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { GlobalProvider } from "@/app/context/GlobalContext";
import "./globals.css";

export const metadata = {
  title: "Trailer Plus",
  description: "Created with Next.js",
};

export default async function RootLayout({ children }) {
  let initialData = {};
  let error = null;

  async function fetchInitialData() {
    try {
      const res = await fetch(
        "https://www.trailerplus.eu/api/v1/pwa/buildmenu",
        {
          cache: "no-cache",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const menuData = await res.json();
      return { menu: menuData?.data };
    } catch (error) {
      throw error;
    }
  }

  try {
    initialData = await fetchInitialData();
  } catch (err) {
    console.error(err.message);
    error = err.message;
  }
  return (
    <html>
      <head>
        <link
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          as="style"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <GlobalProvider initialData={initialData}>
          <Header />
          {error ? (
            <div style={{ color: "red", textAlign: "center" }}>
              Failed to load data: {error}
            </div>
          ) : (
            children
          )}
          <Footer />
        </GlobalProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
