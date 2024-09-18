import BookAutoRental from "../../Components/BookAutoRental";
import BrowseByCar from "../../Components/BrowseByCar";
import BrowseByDestination from "../../Components/BrowseByDestination";

import CarRental from "../../Components/CarRental";

const Home: React.FC = () => {
  return (
    <div>
      <CarRental></CarRental>
      <BookAutoRental></BookAutoRental>
      <BrowseByDestination/>
      <BrowseByCar></BrowseByCar>
    </div>
  );
}
export default Home