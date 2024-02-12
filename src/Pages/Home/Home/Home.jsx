import Banner from "../Banner/Banner";
import Categories from "../Categories/Categories";
import FlashDeals from "../FlashDeals/FlashDeals";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="bg-body-secondary mt-5 py-5">
        <div className="container">
          <Categories></Categories>
          <FlashDeals></FlashDeals>
        </div>
      </div>
    </div>
  );
};

export default Home;
