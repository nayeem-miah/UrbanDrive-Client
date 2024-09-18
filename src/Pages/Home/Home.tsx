import BookAutoRental from "../../Components/BookAutoRental";
import CarRental from "../../Components/CarRental";
import Reviews from "../../Components/Reviews";

const Home: React.FC = () => {
  return (
    <div>
      <CarRental></CarRental>
      <BookAutoRental></BookAutoRental>
      <Reviews></Reviews>
    </div>
  );
}
export default Home