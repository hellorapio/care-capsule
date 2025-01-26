import Wrapper from "../../components/Wrapper";
import Navbar from "../../components/Navbar";
import Category from "../../components/Category";
import Pharmacy from "../../components/Pharmacy";
import Footer from "../../components/Footer";
import Nearyou from "../../components/Nearyou";

const pharmacies: React.FC = () => {
  return (
    <>
      <Wrapper backgroundClass="bg-white">
        <Navbar />
      </Wrapper>

      <div className="p-0">
        <Nearyou
          image="/pharmacynear.png"
          title="Find Trusted Pharmacies Near You"
          description="Search for reliable pharmacies close to your location and get everything you need with ease."
          buttonText="Start Browsing"
        />
      </div>

      <Wrapper backgroundClass="bg-gray-100">
        <div className="bg-gray-100 pt-20 ">
          <Category image="/nearu.png" text="Pharmacies Near You" />
        </div>
      </Wrapper>

      <div className="flex flex-wrap gap-6 justify-center items-center bg-gray-100">
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

      <Wrapper backgroundClass="bg-white">
        <div>
          <Footer />
        </div>
      </Wrapper>
    </>
  );
};

export default pharmacies;
