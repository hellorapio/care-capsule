import Navbar from "../components/Navbar";
import FindMedicineSlider from "../components/FindMedicineSlider";
import Title from "../components/Title";
import Offer from "../components/Offer";
import Category from "../components/Category";
import Medicine from "../components/Medicine";
import Pharmacy from "../components/Pharmacy";
import WhyChooseUs from "../components/WhyChooseUs";
import Article from "../components/Article";
import Footer from "../components/Footer";
import Wrapper from "../components/Wrapper";

const Home: React.FC = async () => {
  const slides = [
    {
      title: "Find Medicines",
      description:
        "Easily find your prescribed medicines from a variety of registered pharmacies, no matter where you are.",
      info: "Enjoy fast delivery, competitive prices, and reliable service tailored to your health needs.",
      buttonText: "Shop Now",
      imageUrl: "/findmedicine.png",
    },
    {
      title: "Select Pharmacy",
      description:
        "Pick the pharmacy that suits you best. We've got trusted options and reliable options in our network.",
      info: "",
      buttonText: "Start Now",
      imageUrl: "/pharmacy.png",
    },
    {
      title: "Pharmacy Management",
      description:
        "Easily manage orders and maintain an organized, top-notch service for customers. Update drug details manually or through file uploads for an up-to-date catalog.",
      info: "",
      buttonText: "Buy Here",
      imageUrl: "/management.png",
    },
  ];

  const medicines = await fetch(
    process.env.NEXT_PUBLIC_API_URL +
      "/medicines?category=medicine&limit=8&page=8"
  );
  const parsed = await medicines.json();
  const meds = parsed.data.data;

  const care = await fetch(
    process.env.NEXT_PUBLIC_API_URL +
      "/medicines?category=care&limit=8&page=8"
  );
  const parsed2 = await care.json();
  const cares = parsed2.data.data;

  const pharmaciesRes = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/pharmacies?limit=5"
  );

  const parsePharmas = (await pharmaciesRes.json()).data.data;
  return (
    <>
      <Wrapper backgroundClass="bg-white">
        <Navbar />
      </Wrapper>
      <Wrapper backgroundClass="bg-white">
        <div className="flex items-center justify-center pb-9 bg-white">
          <FindMedicineSlider slides={slides} />
        </div>
      </Wrapper>

      <Wrapper backgroundClass="bg-gray-100">
        <div className="bg-gray-100 pt-20 ">
          <Title
            image="/execlusive.png"
            text="Exclusive Offers"
            button={
              <button className="text-[#2BADE8] underline hover:text-black text-sm">
                View All
              </button>
            }
          />
        </div>
      </Wrapper>
      <div className="flex flex-wrap justify-center items-center gap-6 p-6 bg-gray-100 pt-10">
        <Offer
          title="Order Medicine"
          description="Upload Prescription and tell us what you need. We do the rest"
          offerText="Save Upto 60% off"
          buttonText="Order Now"
          image="/orderMedicine.png"
        />

        <Offer
          title="Offer by Pyramids"
          description="Save Up to 40% on Skin Care products!"
          offerText="40% off"
          buttonText="Shop Now"
          image="/pyramids.png"
        />

        <Offer
          title="Offer by Tarshoby"
          description="Buy 2 Bottles of Vitamin C, Get 1 Free!"
          offerText="Buy 2, Get 1 Free"
          buttonText="Shop Vitamin C"
          image="/tarshopy.png"
        />
      </div>

      <Wrapper backgroundClass="bg-gray-100">
        <div className="bg-gray-100 pt-20 ">
          <Category image="/category.png" text="Categories" />
        </div>
      </Wrapper>
      <Wrapper backgroundClass="bg-gray-100">
        <div className="bg-gray-100 pt-8 ">
          <Title
            image="/purchasd.png"
            text="Frequently Purchased"
            button={
              <button className="text-[#2BADE8] underline hover:text-black text-sm">
                View All
              </button>
            }
          />
        </div>
      </Wrapper>
      <div className="bg-gray-100">
        <Wrapper>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-1 justify-center items-center  bg-gray-100">
            {meds.map((med) => (
              <Medicine
                id={med.id}
                key={med.id}
                image={med.image}
                name={med.name}
                price={med.price}
              />
            ))}
          </div>
        </Wrapper>
      </div>

      <Wrapper backgroundClass="bg-gray-100">
        <div className="bg-gray-100 pt-3 ">
          <Title
            image="/purchased.png"
            text="Frequently Purchased"
            button={
              <button className="text-[#2BADE8] underline hover:text-black text-sm">
                View All
              </button>
            }
          />
        </div>
      </Wrapper>
      <div className="bg-gray-100">
        <Wrapper>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-1 justify-center items-center  bg-gray-100">
            {cares.map((med) => (
              <Medicine
                id={med.id}
                key={med.id}
                image={med.image}
                name={med.name}
                price={med.price}
              />
            ))}
          </div>
        </Wrapper>
      </div>
      <Wrapper backgroundClass="bg-gray-100">
        <div className="bg-gray-100 pt-8 ">
          <Title
            image="/nearu.png"
            text="Pharmacies Near You"
            button={
              <button className="text-[#2BADE8] underline hover:text-black text-sm">
                View All
              </button>
            }
          />
        </div>
      </Wrapper>
      <div className="flex flex-wrap gap-6 justify-center items-center bg-gray-100">
        {parsePharmas.map((phar) => (
          <Pharmacy
            id={phar.id}
            key={phar.id}
            address={phar.address}
            image={
              "https://www.enigmaglobal.com/wp-content/uploads/2024/01/Costas-Constantopoulos-Pharmacy-4.jpg"
            }
            distance="1.7KM"
            rating={3.7}
            reviews={312}
            name={phar.name}
          />
        ))}
      </div>
      <Wrapper backgroundClass="bg-gray-100">
        <div className="bg-gray-100 pt-20 ">
          <Category image="/why.png" text="Why Choose Us" />
        </div>
      </Wrapper>

      <div className="p-6 bg-gray-100">
        <WhyChooseUs
          image="/chooseus.png"
          features={[
            {
              icon: "/map-icon.png",
              title: "Wide Pharmacy Network",
              description:
                "Find the medicines you need from a trusted network of pharmacies.",
            },
            {
              icon: "/notif-icon.png",
              title: "Refill Reminders",
              description:
                "Get timely reminders to refill your prescriptions with ease.",
            },
            {
              icon: "/percen-icon.png",
              title: "Exclusive Discounts",
              description:
                "Save big with special offers and promotions on health products.",
            },
            {
              icon: "/stop-icon.png",
              title: "Fast Delivery",
              description:
                "Receive your orders quickly with our reliable delivery service.",
            },
          ]}
        />
      </div>

      <Wrapper backgroundClass="bg-gray-100">
        <div className="bg-gray-100 pt-8 ">
          <Title
            image="/article.png"
            text="Health Articles"
            button={
              <button className="text-[#2BADE8] underline hover:text-black text-sm">
                View All
              </button>
            }
          />
        </div>
      </Wrapper>
      <Wrapper backgroundClass="bg-gray-100">
        <div className="p-6 bg-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6  ">
          <Article
            image="/covid19.png"
            title="COVID-19 vaccines"
            description="WHO recommends a simplified single-dose regime for for primary immunization for most COVID-19 vaccines which would improve acceptance and uptake and ....."
          />
          <Article
            image="/antibiotics.png"
            title="Antibiotics"
            description="Antibiotics include a range of powerful drugs that kill bacteria or slow their growth. They include a range of powerful drugs used to treat diseases caused by ...."
          />
          <Article
            image="/bloodcancer.png"
            title="Blood Cancers"
            description="Blood cancers affect the production and function of your blood cells. Most of these cancers start in your bone marrow where blood is produced...."
          />
        </div>
      </Wrapper>
      <Wrapper backgroundClass="bg-white">
        <div>
          <Footer />
        </div>
      </Wrapper>
    </>
  );
};

export default Home;
