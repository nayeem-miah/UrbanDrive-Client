import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Filter: React.FC = () => {
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [sortOption, setSortOption] = useState("");
  const [seatCount, setSeatCount] = useState<number | null>(null);
  const [homePickup,setHomePickup]=useState("");
  const {t} = useTranslation();


  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  const handleHomePickup = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHomePickup(e.target.value);
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "0-50") {
      setMinPrice(0);
      setMaxPrice(50);
    } else {
      const [min, max] = value.split("-").map(Number);
      setMinPrice(min);
      setMaxPrice(max);
    }
  };

  const handleSeatCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSeatCount(value ? Number(value) : null);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-4 lg:gap-6">
        <select
          className="select w-full border border-gray-300 rounded-2xl p-3 h-12 focus:outline-none"
          value={category} // Set the current selected value
          onChange={handleCategoryChange} // Handle change
        >
          <option disabled value="">
            {t("categorySelect.selectPlaceholder")}
          </option>
          <option value="Electric">{t("categorySelect.electric")}</option>
          <option value="suv">{t("categorySelect.suv")}</option>
          <option value="Sedan">{t("categorySelect.sedan")}</option>
          <option value="Luxury">{t("categorySelect.luxury")}</option>
          <option value="Truck">{t("categorySelect.truck")}</option>
        </select>

        <select
          className="select w-full border border-gray-300 rounded-2xl p-3 h-12 focus:outline-none"
          value={seatCount ?? ""}
          onChange={handleSeatCountChange}
        >
          <option disabled value="">
            {t("seatSelect.selectPlaceholder")}
          </option>
          <option value="4">{t("seatSelect.fourOrMore")}</option>
          <option value="5">{t("seatSelect.fiveOrMore")}</option>
          <option value="6">{t("seatSelect.sixOrMore")}</option>
          <option value="7">{t("seatSelect.sevenOrMore")}</option>
          <option value="8">{t("seatSelect.eightOrMore")}</option>
        </select>

        <select
          className="select w-full border border-gray-300 rounded-2xl p-3 h-12 focus:outline-none"
          value={minPrice && maxPrice ? `${minPrice}-${maxPrice}` : ""}
          onChange={handlePriceRangeChange}
        >
          <option disabled value="">
            {t("priceSelect.selectPlaceholder")}
          </option>
          <option value="0-50">{t("priceSelect.range0to50")}</option>
          <option value="51-100">{t("priceSelect.range51to100")}</option>
          <option value="101-200">{t("priceSelect.range101to200")}</option>
          <option value="201-500">{t("priceSelect.range201to500")}</option>
          <option value="501-1000">{t("priceSelect.range501to1000")}</option>
          <option value="1001-Infinity">{t("priceSelect.above1000")}</option>
        </select>

        <select
          className="select w-full border border-gray-300 rounded-2xl p-3 h-12 focus:outline-none"
          value={homePickup}
          onChange={handleHomePickup}
        >
          <option disabled value="">
            {t("homePickup.selectPlaceholder")}
          </option>
          <option value="yes">{t("homePickup.yes")}</option>
          <option value="no">{t("homePickup.no")}</option>
        </select>

        <select
          className="select w-full border border-gray-300 rounded-2xl p-3 h-12 focus:outline-none"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option disabled value="">
            {t("sortOptions.selectPlaceholder")}
          </option>
          <option value="price-asc">{t("sortOptions.priceAsc")}</option>
          <option value="price-desc">{t("sortOptions.priceDesc")}</option>
          <option value="date-desc">{t("sortOptions.dateDesc")}</option>
          <option value="date-asc">{t("sortOptions.dateAsc")}</option>
        </select>
      </div>

  );
};

export default Filter;