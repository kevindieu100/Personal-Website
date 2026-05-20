import { Accent } from '@/components/Accent';

export default function HomePage() {
  return (
    <article className="space-y-8">
      <p className="font-serif text-lg italic text-accent">
        Product builder.
      </p>
      <h1 className="font-serif text-4xl font-normal leading-tight text-gray-900 md:text-5xl">
        I&apos;m passionate about how <Accent>AI</Accent> can enhance the human experience.
      </h1>
      <div className="space-y-6 font-sans text-lg leading-relaxed text-gray-800">
        <p>
          I&apos;ve spent the past several years thinking about how people connect at work through communities, measuring belonging through analytics, and helping ecommerce businesses get more through <Accent>AI agents</Accent>.
        </p>
        <p>
          Outside of work I camp with my dog <Accent>Nobi</Accent> while unfortunately remaining a loyal <Accent>Warriors</Accent> and <Accent>49ers</Accent> fan.
        </p>
        <p>
          Recently took a career break to train as a <Accent>Warrior Monk</Accent> at the <Accent>Shaolin</Accent> <Accent>Temple</Accent> in China.
        </p>
        <p>Now I&apos;m looking for what to build next.</p>
      </div>
    </article>
  );
}
