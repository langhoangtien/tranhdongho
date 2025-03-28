import MainLayout from "@/layout/main-layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/disclaimer")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <Disclaimer />
    </MainLayout>
  );
}
function Disclaimer() {
  return (
    <div className="max-w-4xl w-full mx-auto p-4">
      <h2 className="font-semibold text-accent-foreground text-3xl text-center my-8">
        DISCLAIMER
      </h2>
      <div className="space-y-2 " data-text-editor-id="content">
        <p>
          <strong>WEBSITE DISCLAIMER</strong>
        </p>
        <p />
        <p>
          The information provided by OptiLife LLC. (&quot;we,&quot;
          &quot;us,&quot; or &quot;our&quot;) on https://www.optilifecompany.com
          (the &quot;Site&quot;) is for general informational purposes only. All
          information on the Site is provided in good faith, however, we make no
          representation or warranty of any kind, express or implied, regarding
          the accuracy, adequacy, validity, reliability, availability, or
          completeness of any information on the Site.
        </p>
        <p />
        <p>
          UNDER NO CIRCUMSTANCES shall we have any liability to you for any loss
          or damage of any kind incurred as a result of the use of the Site or
          reliance on any information provided on the Site. Your use of the Site
          and reliance on any information on the Site is solely at your own
          risk.
        </p>
        <p />
        <p>
          <strong>PROFESSIONAL DISCLAIMER</strong>
        </p>
        <p />
        <p>
          The Site cannot and does not contain medical health advice. The
          medical health information provided is for general informational and
          educational purposes only and is not a substitute for professional
          advice. Accordingly, before taking any actions based on such
          information, we encourage you to consult with appropriate medical
          professionals.
        </p>
        <p />
        <p>
          We do not provide any kind of medical advice. THE USE OR RELIANCE ON
          ANY INFORMATION contained on the Site is entirely at your own risk.
        </p>
        <p />
        <p>
          <strong>TESTIMONIALS DISCLAIMER</strong>
        </p>
        <p />
        <p>
          The Site may contain testimonials from users of our products and/or
          services. These testimonials reflect the real-life experiences and
          opinions of such users. However, these experiences are personal to
          those particular users and may not necessarily be representative of
          all users of our products and/or services. We do not claim, and you
          should not assume, that all users will have the same experiences.
        </p>
        <p />
        <p>
          The testimonials on the Site are displayed verbatim, except for
          grammatical or typing corrections, if necessary. These corrections do
          not alter the essence of the testimonials. Reliance on any
          testimonials is at your own risk.
        </p>
        <p />
        <p>
          <strong>EXTERNAL LINKS DISCLAIMER</strong>
        </p>
        <p />
        <p>
          The Site may contain links to other websites or content belonging to
          or originating from third parties or links to websites and features in
          advertisements. We do not investigate, monitor, or check such external
          links for accuracy, reliability, validity, or completeness. We do not
          assume any responsibility for the content of any third-party sites
          linked to from our Site. Your access to and use of such third-party
          links is solely at your own risk.
        </p>
        <p />
        <p>
          <strong>ERRORS AND OMISSIONS DISCLAIMER</strong>
        </p>
        <p />
        <p>
          While we have made every effort to ensure the accuracy of the
          information on the Site, we are not responsible for any errors or
          omissions in the content.
        </p>
        <p />
        <p>
          If you require any further information or have any questions about our
          disclaimer, please contact us by email at:{" "}
          <a
            target="_blank"
            rel="noopener noreferrer nofollow"
            title=""
            role="url"
            href="mailto:contact@gudmuscle.com"
          >
            contact@optilifecompany.com
          </a>
          .
        </p>
        <p />
      </div>
    </div>
  );
}
