import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/experience/', label: 'Experience' },
  { href: '/contact/', label: 'Contact' },
];

export function Nav() {
  return (
    <nav className="flex items-center justify-end gap-6 text-sm text-gray-700">
      {navLinks.map(({ href, label }) => (
        <Link
          key={label}
          href={href}
          className="hover:text-accent transition-colors"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
