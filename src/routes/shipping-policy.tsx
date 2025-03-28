import MainLayout from "@/layout/main-layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shipping-policy")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <ShippingPolicy />
    </MainLayout>
  );
}
function ShippingPolicy() {
  return (
    <div className="max-w-4xl w-full mx-auto p-4">
      <h2 className="font-semibold text-accent-foreground text-3xl text-center my-8">
        Shipping policy
      </h2>
      <div>
        <p
          style={{
            margin: "0px 0px 16.6667px",
            fontStyle: "normal",
            textAlign: "start",
            textIndent: 0,
            whiteSpace: "normal",

            textDecoration: "none",
            color: "var(--accent-foreground)",
            fontFamily: "Montserrat, sans-serif",

            fontWeight: 400,
            letterSpacing: "normal",
          }}
        >
          <span>
            We are proud to offer international shipping services that currently
            operate in over 200 countries and islands worldwide. Nothing means
            more to us than bringing our customers great value and service. We
            will continue to grow to meet the needs of all our customers,
            delivering a service beyond all expectations anywhere in the world.
          </span>
        </p>
        <p
          style={{
            fontStyle: "normal",
            textAlign: "start",
            textIndent: 0,
            whiteSpace: "normal",

            textDecoration: "none",
            color: "var(--accent-foreground)",
            margin: "0px 0px 16.6667px",
            fontFamily: "Montserrat, sans-serif",

            fontWeight: 400,
            letterSpacing: "normal",
          }}
        >
          <span>
            <strong style={{ fontWeight: "bold" }}>How do you shi</strong>
            <strong style={{ fontWeight: "bold" }}>p packages?</strong>
          </span>
        </p>
        <p
          style={{
            fontStyle: "normal",
            textAlign: "start",
            textIndent: 0,
            whiteSpace: "normal",

            textDecoration: "none",
            color: "var(--accent-foreground)",
            margin: "0px 0px 16.6667px",
            fontFamily: "Montserrat, sans-serif",

            fontWeight: 400,
            letterSpacing: "normal",
          }}
        >
          <span>
            Packages from our international warehouses will be shipped by
            ePacket or EMS depending on the weight and size of the product.
            Packages shipped from our US warehouse are shipped through USPS.
          </span>
        </p>
        <p
          style={{
            fontStyle: "normal",
            textAlign: "start",
            textIndent: 0,
            whiteSpace: "normal",

            textDecoration: "none",
            color: "var(--accent-foreground)",
            margin: "0px 0px 16.6667px",
            fontFamily: "Montserrat, sans-serif",

            fontWeight: 400,
            letterSpacing: "normal",
          }}
        >
          <strong style={{ fontWeight: "bold" }}>Do you ship worldwide?</strong>
        </p>
        <p
          style={{
            fontStyle: "normal",
            textAlign: "start",
            textIndent: 0,
            whiteSpace: "normal",

            textDecoration: "none",
            color: "var(--accent-foreground)",
            margin: "0px 0px 16.6667px",
            fontFamily: "Montserrat, sans-serif",

            fontWeight: 400,
            letterSpacing: "normal",
          }}
        >
          <span>
            Yes. We provide free shipping to over 200 countries around the
            world. However, there are some locations we are unable to ship to.
            If you happen to be located in one of those countries we will
            contact you.
          </span>
        </p>
        <p
          style={{
            fontStyle: "normal",
            textAlign: "start",
            textIndent: 0,
            whiteSpace: "normal",

            textDecoration: "none",
            color: "var(--accent-foreground)",
            margin: "0px 0px 16.6667px",
            fontFamily: "Montserrat, sans-serif",

            fontWeight: 400,
            letterSpacing: "normal",
          }}
        >
          <strong style={{ fontWeight: "bold" }}>What about customs?</strong>
        </p>
        <p
          style={{
            fontStyle: "normal",
            textAlign: "start",
            textIndent: 0,
            whiteSpace: "normal",

            textDecoration: "none",
            color: "var(--accent-foreground)",
            margin: "0px 0px 16.6667px",
            fontFamily: "Montserrat, sans-serif",

            fontWeight: 400,
            letterSpacing: "normal",
          }}
        >
          <span>
            We are not responsible for any custom fees once the items have
            shipped. By purchasing our products, you consent that one or more
            packages may be shipped to you and may get custom fees when they
            arrive to your country.&nbsp;
          </span>
        </p>
        <p
          style={{
            fontStyle: "normal",
            textAlign: "start",
            textIndent: 0,
            whiteSpace: "normal",

            textDecoration: "none",
            color: "var(--accent-foreground)",
            margin: "0px 0px 16.6667px",
            fontFamily: "Montserrat, sans-serif",

            fontWeight: 400,
            letterSpacing: "normal",
          }}
        >
          <strong style={{ fontWeight: "bold" }}>
            How long does shipping take?
          </strong>
        </p>
        <p
          style={{
            fontStyle: "normal",
            textAlign: "start",
            textIndent: 0,
            whiteSpace: "normal",

            textDecoration: "none",
            color: "var(--accent-foreground)",
            margin: "0px 0px 16.6667px",
            fontFamily: "Montserrat, sans-serif",

            fontWeight: 400,
            letterSpacing: "normal",
          }}
        >
          <span>
            Shipping time varies by location. These are our estimates:
          </span>
        </p>
        <p
          style={{
            fontStyle: "normal",
            textAlign: "start",
            textIndent: 0,
            whiteSpace: "normal",

            textDecoration: "none",
            color: "var(--accent-foreground)",
            margin: "0px 0px 16.6667px",
            fontFamily: "Montserrat, sans-serif",

            fontWeight: 400,
            letterSpacing: "normal",
          }}
        >
          <span>&nbsp;</span>
        </p>
        <div
          className="scrollable-wrapper"
          style={{
            fontStyle: "normal",
            textAlign: "start",
            textIndent: 0,
            whiteSpace: "normal",

            textDecoration: "none",
            maxWidth: "100%",
            overflow: "auto",
            color: "var(--accent-foreground)",
            fontFamily: "Montserrat, sans-serif",

            fontWeight: 400,
            letterSpacing: "normal",
          }}
        >
          <div
            className="scrollable-wrapper"
            style={{ maxWidth: "100%", overflow: "auto" }}
          >
            <div
              className="scrollable-wrapper"
              style={{ maxWidth: "100%", overflow: "auto" }}
            >
              <table
                width={485}
                style={{
                  borderCollapse: "collapse",
                  fontSize: "1rem",
                  borderStyle: "hidden",
                  backgroundColor: "var(--accent)",
                  width: "562.406px",
                  borderSpacing: 0,
                  marginBottom: 15,
                }}
              >
                <thead style={{}}>
                  <tr style={{}}>
                    <td
                      style={{
                        padding: "10px 14px",
                        border: "1px solid var(--border)",
                        textAlign: "left",
                      }}
                    >
                      <p
                        style={{ color: "var(--accent-foreground)", margin: 0 }}
                      >
                        <strong style={{ fontWeight: "bold" }}>Location</strong>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        border: "1px solid var(--border)",
                        textAlign: "left",
                      }}
                    >
                      <p
                        style={{ color: "var(--accent-foreground)", margin: 0 }}
                      >
                        <strong style={{ fontWeight: "bold" }}>
                          *Estimated Shipping Time
                        </strong>
                      </p>
                    </td>
                  </tr>
                </thead>
                <tbody style={{}}>
                  <tr style={{}}>
                    <td
                      style={{
                        padding: "10px 14px",
                        border: "1px solid var(--border)",
                        textAlign: "left",
                      }}
                    >
                      <p
                        style={{ color: "var(--accent-foreground)", margin: 0 }}
                      >
                        <span>United States</span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        border: "1px solid var(--border)",
                        textAlign: "left",
                      }}
                    >
                      <p
                        style={{ color: "var(--accent-foreground)", margin: 0 }}
                      >
                        <span>7-14 Business days</span>
                      </p>
                    </td>
                  </tr>
                  <tr style={{}}>
                    <td
                      style={{
                        padding: "10px 14px",
                        border: "1px solid var(--border)",
                        textAlign: "left",
                      }}
                    >
                      <p
                        style={{ color: "var(--accent-foreground)", margin: 0 }}
                      >
                        <span>Canada, Europe</span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        border: "1px solid var(--border)",
                        textAlign: "left",
                      }}
                    >
                      <p
                        style={{ color: "var(--accent-foreground)", margin: 0 }}
                      >
                        <span>7-14 Business days</span>
                      </p>
                    </td>
                  </tr>
                  <tr style={{}}>
                    <td
                      style={{
                        padding: "10px 14px",
                        border: "1px solid var(--border)",
                        textAlign: "left",
                      }}
                    >
                      <p
                        style={{ color: "var(--accent-foreground)", margin: 0 }}
                      >
                        <span>Australia, New Zealand</span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        border: "1px solid var(--border)",
                        textAlign: "left",
                      }}
                    >
                      <p
                        style={{ color: "var(--accent-foreground)", margin: 0 }}
                      >
                        <span>12-18 Business days</span>
                      </p>
                    </td>
                  </tr>
                  <tr style={{}}>
                    <td
                      style={{
                        padding: "10px 14px",
                        border: "1px solid var(--border)",
                        textAlign: "left",
                      }}
                    >
                      <p
                        style={{ color: "var(--accent-foreground)", margin: 0 }}
                      >
                        <span>Mexico, Central America, South America</span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        border: "1px solid var(--border)",
                        textAlign: "left",
                      }}
                    >
                      <p
                        style={{ color: "var(--accent-foreground)", margin: 0 }}
                      >
                        <span>14-25 Business days</span>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <p
          style={{
            fontStyle: "normal",
            textAlign: "start",
            textIndent: 0,
            whiteSpace: "normal",

            textDecoration: "none",
            color: "var(--accent-foreground)",
            margin: "0px 0px 16.6667px",
            fontFamily: "Montserrat, sans-serif",

            fontWeight: 400,
            letterSpacing: "normal",
          }}
        >
          <strong style={{ fontWeight: "bold" }}>
            **&nbsp;OptiLife&nbsp;<span style={{}}>is&nbsp;</span>not
            <span style={{}}>&nbsp;</span>
            <span style={{}}>responsible for&nbsp;</span>
            <span style={{}}>
              any delays due to the shipping carrier or customs clearance.&nbsp;
            </span>
          </strong>
        </p>
        <p
          style={{
            fontStyle: "normal",
            textAlign: "start",
            textIndent: 0,
            whiteSpace: "normal",

            textDecoration: "none",
            color: "var(--accent-foreground)",
            margin: "0px 0px 16.6667px",
            fontFamily: "Montserrat, sans-serif",

            fontWeight: 400,
            letterSpacing: "normal",
          }}
        >
          <strong style={{ fontWeight: "bold" }}>
            Do you provide tracking information?
          </strong>
        </p>
        <p
          style={{
            fontStyle: "normal",
            textAlign: "start",
            textIndent: 0,
            whiteSpace: "normal",

            textDecoration: "none",
            color: "var(--accent-foreground)",
            margin: "0px 0px 16.6667px",
            fontFamily: "Montserrat, sans-serif",

            fontWeight: 400,
            letterSpacing: "normal",
          }}
        >
          <span>
            Yes, you will receive an email once your order ships that contain
            your tracking information, but sometimes due to free shipping
            tracking is not available.
          </span>
        </p>
        <p
          style={{
            fontStyle: "normal",
            textAlign: "start",
            textIndent: 0,
            whiteSpace: "normal",

            textDecoration: "none",
            color: "var(--accent-foreground)",
            margin: "0px 0px 16.6667px",
            fontFamily: "Montserrat, sans-serif",

            fontWeight: 400,
            letterSpacing: "normal",
          }}
        >
          <strong style={{ fontWeight: "bold" }}>
            My tracking says “No information available at the moment”.
          </strong>
        </p>
        <p
          style={{
            fontStyle: "normal",
            textAlign: "start",
            textIndent: 0,
            whiteSpace: "normal",

            textDecoration: "none",
            color: "var(--accent-foreground)",
            margin: "0px 0px 16.6667px",
            fontFamily: "Montserrat, sans-serif",

            fontWeight: 400,
            letterSpacing: "normal",
          }}
        >
          <span>
            For some shipping companies, it takes 2-5 business days for the
            tracking information to update on the system.
          </span>
        </p>
        <p
          style={{
            margin: "0px 0px 16.6667px",
            fontStyle: "normal",
            textAlign: "start",
            textIndent: 0,
            whiteSpace: "normal",

            textDecoration: "none",
            color: "var(--accent-foreground)",
            fontFamily: "Montserrat, sans-serif",

            fontWeight: 400,
            letterSpacing: "normal",
          }}
        >
          <span>
            For logistical reasons, items in the same purchase will sometimes be
            sent in separate packages, even if you’ve specified combined
            shipping.
          </span>
        </p>
      </div>
    </div>
  );
}
