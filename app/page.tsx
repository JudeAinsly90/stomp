import { BookingFlow } from '@/components/booking-flow';
import { Header } from '@/components/header';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <BookingFlow />
      </div>
    </main>
  );
}