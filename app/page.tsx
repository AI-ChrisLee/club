export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center mb-16">
        <h1 className="text-6xl font-bold mb-4">
          STOP BLEEDING $190K/YEAR ON SAAS
        </h1>
        <p className="text-2xl mb-8">
          Build what you need. Cancel the rest.
        </p>
        <div className="border-4 border-black p-8 bg-yellow-200 max-w-2xl mx-auto mb-8">
          <h2 className="text-3xl font-bold mb-4">TODAY'S VICTIM: CIRCLE</h2>
          <p className="text-xl mb-4">
            They charge $419/month for community features.
            <br />
            We built a better one in 4 hours.
          </p>
          <p className="text-lg">
            Download the source code. Implement it. Cancel Circle.
          </p>
        </div>
        <a
          href="/auth/signup"
          className="inline-block border-4 border-black bg-black text-white px-8 py-4 text-xl font-bold hover:bg-white hover:text-black"
        >
          JOIN FOR $97/MONTH → SAVE $322/MONTH INSTANTLY
        </a>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="border-4 border-black p-6">
          <h3 className="text-2xl font-bold mb-4">DAILY BUILDS</h3>
          <p className="mb-4">
            Every day at 7 AM, we destroy another overpriced SaaS. 
            You get the source code. You implement it. You cancel them.
          </p>
          <p className="text-sm text-gray-600">
            30 SaaS destroyed so far. $10,470/month saved.
          </p>
        </div>
        <div className="border-4 border-black p-6">
          <h3 className="text-2xl font-bold mb-4">4-HOUR BUILDS</h3>
          <p className="mb-4">
            If it takes more than 4 hours to build, you don't need it. 
            We prove every feature is simpler than they claim.
          </p>
          <p className="text-sm text-gray-600">
            Average build time: 2.5 hours. Maximum: 4 hours.
          </p>
        </div>
        <div className="border-4 border-black p-6">
          <h3 className="text-2xl font-bold mb-4">WORKING CODE</h3>
          <p className="mb-4">
            Not tutorials. Not templates. Actual working applications 
            you can deploy today and cancel your subscription tomorrow.
          </p>
          <p className="text-sm text-gray-600">
            Members have cancelled $2.3M in subscriptions.
          </p>
        </div>
      </section>

      <section className="border-t-4 border-black pt-16">
        <h2 className="text-4xl font-bold mb-8 text-center">
          THE SAAS GRAVEYARD
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Calendly", price: "$192", time: "2 hours" },
            { name: "ConvertKit", price: "$119", time: "3 hours" },
            { name: "Typeform", price: "$99", time: "1.5 hours" },
            { name: "Notion", price: "$20", time: "4 hours" },
            { name: "Loom", price: "$15", time: "2 hours" },
            { name: "Webflow", price: "$39", time: "3.5 hours" },
          ].map((saas) => (
            <div key={saas.name} className="border-2 border-black p-4">
              <h4 className="font-bold">{saas.name}</h4>
              <p>Was: ${saas.price}/month</p>
              <p>Built in: {saas.time}</p>
              <p className="text-green-600 font-bold">STATUS: DESTROYED</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
