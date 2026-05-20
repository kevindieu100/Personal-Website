import { DemoCard } from '@/components/DemoCard';

export default function ElevenLabsPage() {
  return (
    <article>
      <h1 className="font-serif text-4xl font-normal leading-tight text-gray-900 mb-4 md:text-5xl">
        Demo playground
      </h1>
      <p className="text-gray-600 text-lg mb-12 max-w-2xl">
        Kevin's thought exercises to build more meaningful AI experiences.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
        <DemoCard
          title="Wikipodcasts"
          description="Turn any Wikipedia article into a narrated audio briefing. A partnership concept between Wikipedia and ElevenLabs."
          href="/elevenlabs/wikipodcast/"
          icon="wikipedia"
        />
        <DemoCard
          title="Nike Assistant"
          description="A voice-powered shopping assistant embedded into a product page. Ask about sizing, fit, and get personalized recommendations."
          href="/elevenlabs/nike-assistant/"
          icon="nike"
        />
      </div>
    </article>
  );
}
