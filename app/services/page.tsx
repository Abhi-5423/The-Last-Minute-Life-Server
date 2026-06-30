import { ServiceCard } from '@/components/service-card';
import { SectionHeading } from '@/components/section-heading';
import { getServices } from '@/lib/api';

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Services"
        title="Practical options for urgent decisions"
        description="Sample service data powers the assistant rankings. The backend can later connect to live providers, maps, booking systems, or internal databases."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
