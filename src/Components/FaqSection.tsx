
const FaqSection: React.FC = () => {
    return (
        <div className="bg-[#111010] py-5">
            <h2 className="font-bold lg:text-3xl text-2xl  text-center my-10">Frequently Asked Questions in <br /><span className="text-[#2DD4BF]">UrabanDrive</span></h2>
            <div className="lg:flex w-full gap-4 mx-auto ">
                <div className="w-full">
                    <div className="collapse collapse-arrow ">
                        <input type="radio" name="my-accordion-2" defaultChecked />
                        <div className="collapse-title text-xl font-medium">What documents do I need to rent a car?
                        </div>
                        <div className="collapse-content">
                            <p>You will need a valid driver's license, a credit card in your name, and a form of identification (e.g., passport or ID card). Some locations may require additional documents, so it's best to confirm with your rental location.

                            </p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow ">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">What is the minimum age requirement to rent a car?
                        </div>
                        <div className="collapse-content">
                            <p>The minimum age to rent a car is usually 21, but it may vary depending on the rental company and location. Drivers under 25 may incur an additional young driver surcharge.

                            </p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow ">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">Can I rent a car with a debit card?
                        </div>
                        <div className="collapse-content">
                            <p>Some rental companies allow debit card rentals, but it’s subject to terms and conditions. A larger security deposit may be required, and not all car categories may be available for debit card customers.

                            </p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow ">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium"> Can I return the car to a different location?
                        </div>
                        <div className="collapse-content">
                            <p>Yes, many rental companies offer one-way rentals, allowing you to pick up a car in one location and drop it off at another. Additional fees may apply.

                            </p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow ">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">Is there a mileage limit?
                        </div>
                        <div className="collapse-content">
                            <p>Most car rentals come with unlimited mileage, but some vehicles or special offers may have restrictions. Be sure to confirm mileage limits when booking.

                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <div className="collapse collapse-arrow ">
                        <input type="radio" name="my-accordion-2" defaultChecked />
                        <div className="collapse-title text-xl font-medium">Do I need insurance to rent a car?
                        </div>
                        <div className="collapse-content">
                            <p>Basic insurance coverage is usually included in the rental rate. However, additional insurance, such as collision damage waivers or personal accident insurance, can be purchased for extra protection.

                            </p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow ">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">Can I add an additional driver?
                        </div>
                        <div className="collapse-content">
                            <p>Yes, most car rental companies allow you to add additional drivers. They must meet the same age and license requirements, and an additional fee may apply.

                            </p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow ">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">What happens if I return the car late?
                        </div>
                        <div className="collapse-content">
                            <p>Returning the car after the agreed time may result in additional charges. Some companies offer a grace period, but it’s best to check with your rental provider for their specific policy.

                            </p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow ">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">. What should I do if I have an accident or breakdown?
                        </div>
                        <div className="collapse-content">
                            <p>In case of an accident, contact the rental company immediately and follow their instructions. For breakdowns, most rental cars are covered by roadside assistance services, which you can call for help.

                            </p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow ">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">What fuel policy do you offer?
                        </div>
                        <div className="collapse-content">
                            <p>Car rental companies typically offer two options: (1) full-to-full, where you return the car with the same amount of fuel as when you picked it up, or (2) pre-purchase fuel, where you pay for a full tank upfront and can return the car empty.

                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaqSection;