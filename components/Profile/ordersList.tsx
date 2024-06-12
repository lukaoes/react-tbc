"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { createRefund } from "../../actions";

const OrdersList = ({ orders }: any) => {
  const { user } = useUser();
  const email = user?.email;

  const refundHandler = async (charge: string) => {
    await createRefund(charge);
  };

  const filteredOrders = orders.filter(
    (order: any) => order.latest_charge.billing_details.email === email
  );

  return (
    <div className="user-orders-layout">
      <div className="admin-table">
        <div className="row admin-table-header blue">
          <div className="cell">თანხა</div>
          <div className="cell">ინვოისი</div>
          <div className="cell">თანხა</div>
          <div className="cell">შეკვეთის გაუქმება</div>
        </div>

        {filteredOrders.map((order: any) => (
          <div key={order.latest_charge.id} className="row">
            <div className="cell" data-title="თანხა">
              ₾{(order.amount / 100).toFixed(2)}
            </div>
            <div className="cell" data-title="ინვოისი">
              <a
                href={order.latest_charge.receipt_url}
                aria-label="Order Receipt"
                target="_blank"
                rel="noopener noreferrer"
              >
                ნახვა
              </a>
            </div>
            <div className="cell" data-title="თანხა">
              {order.latest_charge.refunded === true
                ? "დაბრუნებულია"
                : "გადახდილია"}
            </div>
            <div className="cell" data-title="შეკვეთის გაუქმება">
              {order.latest_charge.refunded ? (
                <p>შეკვეთა გაუქმებულია</p>
              ) : (
                <button
                  disabled={order.latest_charge.refunded}
                  onClick={() => refundHandler(order.latest_charge.id)}
                >
                  შეკვეთის გაუქმება
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;
