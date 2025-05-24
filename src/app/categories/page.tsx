import Wrapper from "../../components/Wrapper";
import Category from "../../components/Category";
import Offer from "../../components/Offer";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Title from "../../components/Title";
import Link from "next/link";
import Image from "next/image";

const CategoryCard = ({
  title,
  image,
  link,
}: {
  title: string;
  image: string;
  link: string;
}) => {
  return (
    <Link href={link} className="block">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative aspect-video">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600 mt-2">Browse our collection</p>
        </div>
      </div>
    </Link>
  );
};

const Categories: React.FC = () => {
  return (
    <>
      <Wrapper backgroundClass="bg-white">
        <Navbar />
      </Wrapper>

      <Wrapper backgroundClass="bg-gray-100">
        <div className="bg-gray-100 py-20 ">
          <Category image="/category.png" text="Categories" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            <CategoryCard
              title="Medicines"
              image="/cetal.png"
              link="/medicines"
            />
            <CategoryCard
              title="Care Products"
              image="/cosrx.png"
              link="/care"
            />
          </div>
        </div>
      </Wrapper>

      <div className="bg-gray-100 pt-8">
        <Wrapper backgroundClass="bg-gray-100">
          <Title
            image="/execlusive.png"
            text="Exclusive Offers"
            button={
              <button className="text-[#2BADE8] underline hover:text-black text-sm">
                View All
              </button>
            }
          />
        </Wrapper>
      </div>

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

      <Wrapper backgroundClass="bg-white">
        <div>
          <Footer />
        </div>
      </Wrapper>
    </>
  );
};

export default Categories;
