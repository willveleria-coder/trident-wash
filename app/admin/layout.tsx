// app/admin/layout.tsx
import ServiceWorkerRegistration from './ServiceWorkerRegistration';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceWorkerRegistration />
      {children}
    </>
  );
}