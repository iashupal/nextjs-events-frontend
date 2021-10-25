import Link from "next/link";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";

export default function EventsPage({ events }) {
  console.log(events);
  return (
    <div>
      <Layout>
        <h1>Events</h1>
        {events.length === 0 && <h3>No events to show</h3>}
        {events.map((evt) => (
          <EventItem key={evt.id} evt={evt} />
        ))}
        {events.length > 0 && (
          <Link href="/events">
            <a className="btn-secondary">View All</a>
          </Link>
        )}
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);
  const events = await res.json();
  return {
    props: { events},
    revalidate: 1,
  };
}
