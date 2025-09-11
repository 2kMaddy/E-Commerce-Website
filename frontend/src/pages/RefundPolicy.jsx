const RefundPolicy = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full max-w-4xl min-h-dvh p-5">
        <h1 className="font-bold text-[#333] text-2xl">
          Refund & Return Policy
        </h1>
        <p className="mt-4">
          At FYNL WEAR, customer satisfaction is our top priority. We take great
          care to deliver quality products, but if you're not completely happy
          with your order, we're here to help. This Refund & Return Policy
          outlines the conditions under which returns and refunds are accepted.
        </p>
        <ol className="mt-5 flex flex-col gap-10">
          <li>
            <h2 className="font-bold text-[#333] text-2xl">
              1. Eligibility for Returns
            </h2>
            <p className="mt-4">
              We accept returns within 7 days from the date of delivery. To be
              eligible for a return, the item must be:
            </p>
            <ul className="flex flex-col gap-3 list-disc p-5">
              <li>Unworn and unused</li>
              <li>In its original packaging</li>
              <li>Free from damage, stains, or strong odors</li>
              <li>
                Accompanied by the original order receipt or proof of purchase
              </li>
            </ul>
            <p>
              Please note that{" "}
              <span className="font-bold">
                {" "}
                items purchased on sale or during special promotions are not
                eligible for return or exchange,
              </span>{" "}
              unless the product is damaged or defective.
            </p>
          </li>
          <li>
            <h2 className="font-bold text-[#333] text-2xl">
              2. Non-Returnable Items
            </h2>
            <p className="mt-4">
              The following items are not eligible for return or refund:
            </p>
            <ul className="flex flex-col gap-3 list-disc p-5">
              <li>Products marked as "Final Sale"</li>
              <li>Customized or personalized items</li>
              <li>Items damaged due to misuse or wear and tear</li>
              <li>Washed or altered garments</li>
            </ul>
          </li>
          <li>
            <h2 className="font-bold text-[#333] text-2xl">
              3. Damaged or Defective Products
            </h2>
            <p className="mt-4">
              If you receive a damaged or defective product, please contact us
              within <span className="font-bold"> 48 hours</span> of delivery at
              <span className="font-bold"> contact@fynlwear.shop</span> with
              clear photos of the item and packaging. We will arrange for a
              replacement or initiate a refund after verifying the issue.
            </p>
          </li>
          <li>
            <h2 className="font-bold text-[#333] text-2xl">
              4. Return Process
            </h2>
            <p className="mt-4">
              To initiate a return, please email contact@fynlwear.shop with your
              order number and reason for return. Our support team will respond
              with the return instructions.
              <br />
              Please note:
            </p>
            <ul className="flex flex-col gap-3 list-disc p-5">
              <li>
                Customers are responsible for the return shipping costs unless
                the item is defective or wrong.
              </li>
              <li>
                Returned products must reach us in original condition for a
                refund or exchange to be processed.
              </li>
              <li>
                We recommend using a trackable courier service for your return.
              </li>
            </ul>
          </li>
          <li>
            <h2 className="font-bold text-[#333] text-2xl">5. Refunds</h2>
            <p className="mt-4">
              Once your returned item is received and inspected, we will notify
              you of the approval or rejection of your refund.
              <br />
              If approved:
            </p>
            <ul className="flex flex-col gap-3 list-disc p-5">
              <li>
                Refunds will be processed within{" "}
                <span className="font-bold"> 7–10 business days</span>
              </li>
              <li>
                The amount will be credited to your original payment method
              </li>
              <li>Shipping charges (if any) are non-refundable</li>
            </ul>
          </li>
          <li>
            <h2 className="font-bold text-[#333] text-2xl">
              6. Exchange Policy
            </h2>
            <p className="mt-4">
              We currently offer exchanges{" "}
              <span className="font-bold"> only for size-related issues</span>,
              subject to availability. Please email us to check stock
              availability before initiating an exchange. The process and
              conditions are the same as returns.
            </p>
          </li>
          <li>
            <h2 className="font-bold text-[#333] text-2xl">
              7. Order Cancellations
            </h2>
            <p className="mt-4">
              Orders can be cancelled within{" "}
              <span className="font-bold"> 12 hours</span> of placing them,
              provided the order has not been shipped. Once dispatched, the
              order cannot be cancelled.
            </p>
          </li>
          <li>
            <h2 className="font-bold text-[#333] text-2xl">Contact Us </h2>
            <p className="mt-4">
              If you have any questions about your order, returns, or refunds,
              feel free to reach out to us at:
            </p>
            <ul className="flex flex-col gap-3 mt-5 mb-5">
              <li>📩 Email: contact@fynlwear.shop</li>
              <li>🌐 Website: www.fynlwear.shop</li>{" "}
              <li>🕒 Support Hours: Monday to Saturday, 10 AM – 6 PM (IST)</li>
            </ul>
            <p>
              Thank you for shopping with FYNL WEAR. We truly appreciate your
              support!
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default RefundPolicy;
