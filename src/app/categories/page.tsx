
import Wrapper from "../../components/Wrapper";
import Category from "../../components/Category";
import Offer from "../../components/Offer";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Title from "../../components/Title";


const Categories: React.FC = () => {
    return (
      <>
        <div>
          <Navbar />
        </div>

        <Wrapper backgroundClass="bg-gray-100">
          <div className="bg-gray-100 pt-20 ">
            <Category image="/category.png" text="Categories" />
          </div>
            </Wrapper>
            















        <Wrapper backgroundClass="bg-gray-100">
          <div className="bg-gray-100 pt-8 ">
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

        <Wrapper backgroundClass="bg-white">
          <div>
            <Footer />
          </div>
        </Wrapper>
      </>
    );
};

export default Categories;
