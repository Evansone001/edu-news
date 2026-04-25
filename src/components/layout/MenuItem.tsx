import Link from "next/link";

interface MenuItemProps {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

export function MenuItem({ href, icon: Icon, children }: MenuItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
      role="menuitem"
    >
      <Icon className="h-4 w-4 text-gray-400" />
      {children}
    </Link>
  );
}