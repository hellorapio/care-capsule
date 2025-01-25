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

const Home: React.FC = () => {
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

  return (
    <>
      <div>
        <Navbar />
      </div>
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
      <div className="flex flex-wrap gap-1 justify-center items-center  bg-gray-100">
        <Medicine
          image="/Antinal.png"
          name="Antinal 200 mg-24 capsules"
          price="EGP 60.00"
        />
        <Medicine
          image="/Panadol.png"
          name="Antinal 200 mg-24 capsules"
          price="EGP 60.00"
        />
        <Medicine
          image="/prufen.png"
          name="Brufen 600 mg - 30 Tablet"
          price="EGP 98.00"
        />
        <Medicine
          image="/cetal.png"
          name="Cetal 500mg 20 tablets "
          price="EGP 80.00"
        />
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
      <div className="flex flex-wrap gap-1 justify-center items-center  bg-gray-100">
        <Medicine
          image="/rawafrican.png"
          name="Raw African Follicle Booster Oil"
          price="EGP 180.00"
        />
        <Medicine
          image="/cosrx.png"
          name="COSRX Advanced Snail 96"
          price="EGP 1197.00"
        />
        <Medicine
          image="/garniee.png"
          name="Garnier pure micellar deals"
          price="EGP 200.00"
        />
        <Medicine
          image="/besline.png"
          name="Beesline Natural Whitening Roll-On  "
          price="EGP 250.00"
        />
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
      <div className="flex flex-wrap gap-6 justify-center items-center h-screen bg-gray-100">
        <Pharmacy
          image="/الطرشوبي.png"
          name="Tarshoby Pharmacy"
          address="15 El-Bahr Street, Near Tarshoby Square, Tanta"
          distance="1.3 KM"
          rating={3.5}
          reviews={200}
        />
        <Pharmacy
          image="/Fouda.png"
          name="Fouda Pharmacy"
          address="12 saeed Street, ElBahr District, Tanta"
          distance="1.7 KM"
          rating={3.5}
          reviews={200}
        />
        <Pharmacy
          image="/zikry.png"
          name="Zikry Pharmacy"
          address="89 El-Azhar Street, El-Horreya Area, Tanta"
          distance="2.1 KM"
          rating={4.0}
          reviews={109}
        />
        <Pharmacy
          image="/الاجزخانة.png"
          name="Alajzikhana Pharmacy"
          address="15 El-Sayed Badawi Street, El-Badawi , Tanta"
          distance="2.6 KM"
          rating={3.3}
          reviews={200}
        />
        <Pharmacy
          image="/العزبي.png"
          name="Ezaby Pharmacy"
          address="10 Saeed Street, El-Bahr District, Tanta"
          distance="3.0 KM"
          rating={3.5}
          reviews={270}
        />
      </div>
      <Wrapper backgroundClass="bg-gray-100">
        <div className="bg-gray-100 pt-20 ">
          <Category image="/why.png" text="Why Choose Us" />
        </div>
      </Wrapper>

      <div className="p-6 bg-gray-100 ">
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
        <div className=" p-6 bg-gray-100  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6  ">
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
