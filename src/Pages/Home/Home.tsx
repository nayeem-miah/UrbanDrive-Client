import BookAutoRental from "../../components/BookAutoRental";
import CarRental from "../../components/CarRental";

const Home: React.FC = () => {
  return (
    <div>
      <CarRental></CarRental>
      <BookAutoRental></BookAutoRental>
    </div>
  );
}
export default Home