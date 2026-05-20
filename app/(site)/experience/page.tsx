import Link from 'next/link';

const experiences = [
  {
    company: 'Today',
    role: 'Open to Opportunities',
    years: null as string | null,
    isToday: true,
  },
  {
    company: 'Shaolin Temple (China)',
    role: 'Warrior Monk',
    years: '2026',
    isToday: false,
  },
  {
    company: 'ReachFaster',
    role: 'Product Manager',
    years: '2025',
    isToday: false,
  },
  {
    company: 'Microsoft',
    role: 'Senior Product Manager',
    years: '2021 ~ 2025',
    isToday: false,
  },
  {
    company: 'Yammer',
    role: 'Product Manager',
    years: '2019 ~ 2021',
    isToday: false,
  },
  {
    company: 'Microsoft Azure',
    role: 'Technical Program Manager',
    years: '2018',
    isToday: false,
  },
  {
    company: 'Code The Change',
    role: 'Product Manager',
    years: '2017 ~ 2018',
    isToday: false,
  },
  {
    company: 'Seagate Technology',
    role: 'Software Engineer',
    years: '2017',
    isToday: false,
  },
  {
    company: 'RideTag',
    role: 'Technical Program Manager',
    years: '2017',
    isToday: false,
  },
  {
    company: 'Sandia National Laboratories',
    role: 'Software Engineer',
    years: '2016',
    isToday: false,
  },
];

export default function ExperiencePage() {
  return (
    <article className="space-y-12">
      <h1 className="font-serif text-xl italic text-gray-800">Experience</h1>

      <ul className="space-y-0">
        {experiences.map((item, i) => (
          <li key={i}>
            <div className="flex items-center gap-4 border-b border-gray-200 py-6 first:pt-0 last:border-b-0">
              <div className="min-w-0 flex-1">
                <p className="font-sans font-medium text-gray-900">{item.company}</p>
                <p className="mt-0.5 font-sans text-sm font-normal text-gray-600">
                  {item.role}
                </p>
              </div>
              <span className="h-px min-w-[16px] flex-1 shrink bg-gray-200" aria-hidden />
              <span
                  className={`
                    inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50/80 px-3 py-1.5 font-sans text-sm text-gray-700
                    ${item.isToday ? 'text-accent border-accent/30 bg-accent/5' : ''}
                  `}
                >
                  {item.isToday && (
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  )}
                  {item.isToday ? 'Today' : item.years}
                </span>
            </div>
          </li>
        ))}
      </ul>

      <footer className="pt-4">
        <Link
          href="/"
          className="font-sans text-sm text-gray-600 hover:text-accent transition-colors"
        >
          ← Home
        </Link>
      </footer>
    </article>
  );
}
