// import { notFound } from "next/navigation";
import Image from "next/image";

import Link from "next/link";

export default async function PharmacyPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/pharmacies/" + id
  );
  const pharmacy = (await res.json()).data;
  // if (!pharmacy) {
  //   notFound();
  // }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {pharmacy.name}
          </h1>
          <Link
            href="/pharmacies"
            className="text-blue-600 hover:text-blue-800 flex items-center transition-colors"
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
            Back to All Pharmacies
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="w-full aspect-video relative bg-blue-100">
            <Image
              src={pharmacy.image}
              alt="Pharmacy Image"
              fill
              className="object-cover"
            />
          </div>

          <div className="p-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              <div className="mb-6 md:mb-0 md:w-1/2">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-3 text-blue-500 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">
                        ADDRESS
                      </h3>
                      <p className="text-gray-700">{pharmacy.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-3 text-blue-500 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">
                        PHONE
                      </h3>
                      <p className="text-gray-700">{pharmacy.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-3 text-blue-500 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">
                        HOURS
                      </h3>
                      <p className="text-gray-700">{pharmacy.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  About This Pharmacy
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {pharmacy.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
