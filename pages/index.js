import Head from "next/head";
import { getCalendar } from "../utils/google";
import Calendar from "../components/calendar/Calendar";

export default function seminar({ data }) {
  return (
    <>
      <Head>
        <title>Seminar Schedule | Khoironi Kurnia Syah</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Calendar events={data} />
    </>
  );
}

export async function getServerSideProps() {
  const date = new Date();
  const calendar = await getCalendar(
    new Date(date.getFullYear(), date.getMonth() - 1, 1),
  );

  return {
    props: { data: calendar }, // will be passed to the page component as props
  };
}
