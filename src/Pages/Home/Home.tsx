import BookAutoRental from "../../Components/BookAutoRental";
import CarRental from "../../Components/CarRental";

const Home: React.FC = () => {
  return (
    <div>
      <CarRental></CarRental>
      <BookAutoRental></BookAutoRental>
    </div>
  );
}
export default Home