import { FaSackDollar } from "react-icons/fa6";
import { MdOutlinePendingActions, MdPaid } from "react-icons/md";

const AdminHome: React.FC =() => {
    return (
      <div className="text-4xl">
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-6 text-center underline">
            Admin Homepage
          </h2>
        </div>
        <div>
          <div className="stats mt-4">
            <div className="stat space-y-3 bg-green-400">
              <div className="stat-figure text-secondary">
                <FaSackDollar className="w-11 h-11" />
              </div>
              <div className="stat-title font-bold text-white">
                Total Car Owner
              </div>
              <div className="stat-value">$500</div>
              {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
            </div>

            <div className="stat space-y-3 bg-blue-500">
              <div className="stat-figure text-secondary">
                <MdOutlinePendingActions className="w-11 h-11" />
              </div>
              <div className="stat-title text-white font-bold">Paid Total</div>
              <div className="stat-value">$1200</div>
            </div>
            <div className="stat space-y-3 bg-red-400">
              <div className="stat-figure text-secondary">
                <MdPaid className="w-11 h-11" />
              </div>
              <div className="stat-title text-white font-bold">
                Pending Total
              </div>
              <div className="stat-value">$280</div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default AdminHome;