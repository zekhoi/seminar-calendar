import Head from "next/head";
import Script from "next/script";
import { getCalendar } from "../utils/google";
import Calendar from "../components/calendar/Calendar";
import Event from "../components/calendar/Event";

export default function seminar({ data }) {
  return (
    <>
      <Head>
        <title>Seminar Schedule | Khoironi Kurnia Syah</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-4 py-8 text-gray-700 md:flex-row bg-basecolor">
        <Calendar events={data} />
        <Event data={data} />
      </div>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-TP8NHRCTN2"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-TP8NHRCTN2');
        `}
      </Script>
    </>
  );
}

export async function getServerSideProps() {
  const date = new Date();
  const calendar = await getCalendar(
    new Date(date.getFullYear(), date.getMonth() - 2, 1),
  );

  return {
    props: { data: calendar }, // will be passed to the page component as props
  };
}
