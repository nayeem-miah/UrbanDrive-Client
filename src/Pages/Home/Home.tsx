import Banner from "../../Components/Banner";
import BookAutoRental from "../../Components/BookAutoRental";
import CarRental from "../../Components/CarRental";
import BrowseByCar from "../../Components/BrowseByCar";
import BrowseByDestination from "../../Components/BrowseByDestination";
import Reviews from "../../Components/Reviews";

const Home: React.FC = () => {
  return (
    <div>
      <Banner></Banner>
      <CarRental></CarRental>
      <BookAutoRental></BookAutoRental>
      <BrowseByDestination />
      <BrowseByCar></BrowseByCar>
      <Reviews></Reviews>

    </div>
  );
}
export default Home;