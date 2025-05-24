import Wrapper from "../../components/Wrapper";
import Navbar from "../../components/Navbar";
import Category from "../../components/Category";
import Pharmacy from "../../components/Pharmacy";
import Footer from "../../components/Footer";
import Nearyou from "../../components/Nearyou";

const pharmacies: React.FC = async () => {
  const pharmaciesRes = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/pharmacies?limit=5"
  );

  const parsePharmas = (await pharmaciesRes.json()).data.data;
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

      <Wrapper backgroundClass="bg-white">
        <div>
          <Footer />
        </div>
      </Wrapper>
    </>
  );
};

export default pharmacies;
