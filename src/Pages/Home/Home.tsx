import Banner from "../../Components/Banner";
import BookAutoRental from "../../Components/BookAutoRental";
import CarRental from "../../Components/CarRental";

const Home: React.FC = () => {
  return (
    <div>
      <Banner></Banner>
      <CarRental></CarRental>
      <BookAutoRental></BookAutoRental>
    </div>
  );
}
export default Home