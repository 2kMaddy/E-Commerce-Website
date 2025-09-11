const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full max-w-4xl min-h-dvh p-5">
        <h1 className="font-bold text-[#333] text-2xl">Privacy Policy</h1>
        <p className="mt-4">
          At FYNL WEAR, we value your privacy and are committed to protecting
          your personal information. This Privacy Policy outlines how we
          collect, use, and safeguard the data you provide when you visit our
          website or make a purchase from us. By accessing or using our website,
          you agree to the practices described in this policy.
        </p>
        <p className="mt-4">
          When you place an order or engage with our website, we collect
          personal information such as your full name, email address, phone
          number, billing and shipping address, and payment details. Payment
          data is processed securely via trusted third-party gateways like
          Razorpay, and we do not store any payment information on our servers.
          This data is collected solely to process your order, ensure timely
          delivery, and provide customer support.
        </p>
        <p className="mt-4">
          In addition, we may automatically collect non-personal information
          such as your IP address, browser type, device information, and the
          pages you visit. This information is used to analyze website traffic,
          improve performance, and enhance your user experience.
        </p>
        <p className="mt-4">
          We use your personal information to fulfill orders, communicate order
          updates, provide customer support, send optional marketing
          communications (only if you opt-in), and enhance our services. We do
          not sell, rent, or trade your information to third parties. However,
          we may share necessary information with trusted service providers such
          as payment processors, logistics partners, and analytics
          tools—strictly for order fulfillment and service improvement. These
          providers are obligated to handle your data with confidentiality and
          care.
        </p>{" "}
        <p className="mt-4">
          Our website uses cookies and similar tracking technologies to remember
          your preferences, track website activity, and offer a better
          experience. You may choose to disable cookies through your browser
          settings, although doing so may limit certain site functions.
        </p>
        <p className="mt-4">
          {" "}
          We maintain strong security protocols to protect your data. All
          transactions are encrypted via SSL (Secure Socket Layer), and your
          personal data is stored in secure environments with limited access.
          Your payment details are never stored or visible to us.
        </p>{" "}
        <p className="mt-4">
          As a customer, you have the right to access, correct, update, or
          delete your personal information at any time. You may also opt out of
          marketing communications. To exercise these rights or for any
          privacy-related concerns, please email us at{" "}
          <span className="font-bold"> contact@fynlwear.shop.</span>
        </p>
        <p className="mt-4">
          We reserve the right to update this Privacy Policy as necessary to
          reflect changes in our practices or legal requirements. Any updates
          will be posted on this page with an updated effective date. We
          encourage you to review this policy periodically.
        </p>
        <p className="mt-4">
          If you have any questions or need assistance, please contact us at
          <span className="font-bold"> contact@fynlwear.shop.</span>. Thank you
          for trusting FYNL. WEAR.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
