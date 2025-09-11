const ShippingPolicy = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full max-w-4xl min-h-dvh p-5">
        <h1 className="font-bold text-[#333] text-2xl">Shipping Policy</h1>
        <p className="mt-4">
          At FYNL WEAR, we strive to ensure your orders are delivered quickly,
          safely, and efficiently. Once an order is placed, it is typically
          processed within 1–2 business days (Monday to Saturday). Orders placed
          on Sundays or public holidays are processed on the following business
          day. After processing, customers will receive a shipping confirmation
          email containing tracking details to monitor the shipment status.
        </p>
        <p className="mt-4">
          We currently ship across India through reliable courier partners.
          Delivery timelines vary based on location: metro cities can expect
          delivery within 3–5 business days, other cities typically within 5–8
          business days, and remote or rural areas may take 7–10 business days.
          While we do our best to ensure timely delivery, occasional delays may
          occur during peak seasons, festivals, or due to logistics disruptions
          beyond our control.
        </p>
        <p className="mt-4">
          Shipping is free for all prepaid orders above ₹999. For orders below
          this amount, a flat shipping fee of ₹60 will be charged at checkout.
          Please note that shipping charges, once applied, are non-refundable
          after the order has been dispatched. At present, we do not offer Cash
          on Delivery (COD). All orders must be paid for online via secure
          payment methods such as UPI, Razorpay, debit/credit cards, or net
          banking.
        </p>
        <p className="mt-4">
          Once your order is shipped, you will receive a tracking link via email
          or SMS, which you can use to check the real-time status of your
          package. If you haven’t received your tracking information within 3
          days of placing your order, please reach out to us at
          <span className="font-bold"> contact@fynlwear.shop </span>so we can
          assist you promptly.
        </p>{" "}
        <p className="mt-4">
          In case your package is delayed, arrives damaged, or is marked as
          delivered but hasn’t been received, we request that you contact us
          immediately. We will coordinate with our delivery partner to
          investigate and resolve the issue. Please ensure that you provide an
          accurate and complete shipping address at the time of checkout, as
          FYNL. WEAR will not be responsible for undelivered packages resulting
          from incorrect address details.
        </p>
        <p className="mt-4">
          {" "}
          Currently, we do not offer international shipping. However, we are
          actively working on expanding our service and hope to launch
          international delivery soon.
        </p>{" "}
        <p className="mt-4">
          For any questions related to shipping, delivery, or tracking, feel
          free to contact us at{" "}
          <span className="font-bold"> contact@fynlwear.shop</span>. Our support
          team is available Monday to Saturday, between 10 AM and 6 PM (IST).
          Thank you for shopping with FYNL. WEAR — we appreciate your trust and
          support.
        </p>
      </div>
    </div>
  );
};

export default ShippingPolicy;
