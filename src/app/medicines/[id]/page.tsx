import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Wrapper from "../../../components/Wrapper";
import MedicineDetails, { Medicine } from "../../../components/MedicineDetails";

async function getMedicine(id: string): Promise<Medicine | null> {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://api.example.com";
    const res = await fetch(`${apiUrl}/medicines/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch medicine with ID: ${id}`);
    }

    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error("Error fetching medicine data:", error);
    return null;
  }
}

export default async function MedicinePage({
  params,
}: {
  params: { id: string };
}) {
  const medicine = await getMedicine(params.id);

  if (!medicine) {
    notFound();
  }

  return (
    <>
      <Wrapper backgroundClass="bg-white">
        <Navbar />
      </Wrapper>

      <div className="bg-gray-50 py-8">
        <Wrapper backgroundClass="bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-6">
              <Link
                href="/medicines"
                className="flex items-center text-[#2BADE8] hover:text-blue-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Medicines
              </Link>
            </div>

            <MedicineDetails medicine={medicine} />
          </div>
        </Wrapper>
      </div>

      <Wrapper backgroundClass="bg-white">
        <Footer />
      </Wrapper>
    </>
  );
}
