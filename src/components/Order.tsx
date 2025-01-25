
interface OrderProps {
  orderId: string;
  customerName: string;
  status: "Pending" | "Delivered";
  totalPrice: number;
  timeOfOrder: string;
  onViewDetails: () => void;
  onMarkAsDelivered: () => void;
}

const Order: React.FC<OrderProps> = ({
  orderId,
  customerName,
  status,
  totalPrice,
  timeOfOrder,
  onViewDetails,
  onMarkAsDelivered,
}) => {
  return (
    <div className="border border-blue-400 rounded-lg p-4 shadow-sm bg-gray-100 w-[397px] h-[200px]">
      <div className="flex">
        <div className=" mb-4 w-2/3">
          <p className="text-sm text-gray-400  ">
            Order:{" "}
            <span className="font-semibold text-gray-700 ml-2">#{orderId}</span>
          </p>
          <p className="text-sm text-gray-400">
            Name:{" "}
            <span className="font-semibold text-gray-700 ml-2">{customerName}</span>
          </p>
        </div>

        <div className="flex items-center mb-4 w-1/3">
          <span
            className={`w-4 h-4 rounded-full mr-2 ${
              status === "Pending" ? "bg-yellow-500" : "bg-green-500"
            }`}
          ></span>
          <p className="text-sm font-medium text-gray-800">{status}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-400">
          Total Price:{" "}
          <span className="font-semibold text-gray-700 ml-6">
            {totalPrice.toFixed(2)}
          </span>
        </p>
        <p className="text-sm text-gray-400">
          Time of Order:{" "}
          <span className="font-semibold text-gray-700 ml-2">{timeOfOrder}</span>
        </p>
      </div>

      <div className="flex space-x-4 mt-4">
        <button
          onClick={onViewDetails}
          className="text-[#2BADE8] underline  text-sm hover:text-blue-600"
        >
          View Details
        </button>
        <button
          onClick={onMarkAsDelivered}
          className="text-[#2BADE8] underline  text-sm hover:text-blue-600"
        >
          Mark as Delivered
        </button>
      </div>
    </div>
  );
};

export default Order;
