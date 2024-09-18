import BookAutoRental from "../../Components/BookAutoRental";
import BrowseByCar from "../../Components/BrowseByCar";

import CarRental from "../../Components/CarRental";

const Home: React.FC = () => {
  return (
    <div>
      <CarRental></CarRental>
      <BookAutoRental></BookAutoRental>
      <BrowseByCar></BrowseByCar>
    </div>
  );
}
export default Home