import { auth } from "@/auth";
import Header from "@/components/shared/header/header";
import { getMyCart } from "@/lib/actions/action-cart";
import { getUserById } from "@/lib/actions/action-users";
import React from "react";
import PaymentMethodForm from "./payment-method-form";
import CheckoutSteps from "@/components/checkout-steps";

const PaymentMethod = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("User not found");

  const user = await getUserById(userId);
  const cart = await getMyCart();

  return (
    <>
      {/* <Header cart={cart} /> */}
      <div className="pt-20 px-3 md:px-15  min-h-screen bg-orange-50/30 font-sans text-slate-800 selection:bg-orange-200">
        <CheckoutSteps currentStep={3} />
        <PaymentMethodForm preferredPaymentMethod={user.PaymentMethod} />
        

      </div>
    </>
  );
};

export default PaymentMethod;
