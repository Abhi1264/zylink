import { db } from "@/lib/db";
import { user, links } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ProfileLink } from "@/components/profile/profile-link";
import { Metadata } from "next";
import Image from "next/image";
import { Link2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

interface PageProps {
  params: Promise<{ domain: string }>;
}

async function getUserWithLinks(username: string) {
  const [foundUser] = await db
    .select()
    .from(user)
    .where(eq(user.name, username))
    .limit(1);

  if (!foundUser) return null;

  const userLinks = await db
    .select()
    .from(links)
    .where(eq(links.userId, foundUser.id))
    .orderBy(links.order);

  return {
    user: foundUser,
    links: userLinks.filter((link) => link.isEnabled),
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { domain } = await params;
  const data = await getUserWithLinks(domain);

  if (!data) {
    return {
      title: "User Not Found",
    };
  }

  return {
    title: `${data.user.name} | Solo Link`,
    description: `Check out ${data.user.name}'s links`,
    openGraph: {
      title: `${data.user.name} | Solo Link`,
      description: `Check out ${data.user.name}'s links`,
      images: data.user.image ? [{ url: data.user.image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.user.name} | Solo Link`,
      description: `Check out ${data.user.name}'s links`,
      images: data.user.image ? [data.user.image] : [],
    },
  };
}

export default async function ProfilePage({ params }: PageProps) {
  const { domain } = await params;
  const data = await getUserWithLinks(domain);

  if (!data) {
    notFound();
  }

  // Strategy: First link is featured, rest are standard
  const [firstLink, ...restLinks] = data.links;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 noise-bg relative">
      {/* Dot Pattern */}
      <div className="fixed inset-0 dot-pattern dark:dot-pattern-dark pointer-events-none opacity-10" />

      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-10">
        <ThemeToggle />
      </div>

      <div className="container max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-20 relative">
        {/* Profile Header */}
        <header className="text-center mb-8 sm:mb-12 space-y-4 sm:space-y-6">
          {/* Avatar */}
          {data.user.image ? (
            <div className="relative inline-block">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-neutral-200 dark:border-neutral-800 shadow-sm">
                <Image
                  src={data.user.image}
                  alt={data.user.name}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="relative inline-block">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-neutral-900 dark:bg-neutral-50 border-2 border-neutral-200 dark:border-neutral-800 flex items-center justify-center shadow-sm">
                <span className="text-3xl sm:text-4xl font-bold text-neutral-50 dark:text-neutral-900 mono-meta">
                  {data.user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          )}

          {/* Name & Stats */}
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold heading-tight">
              @{data.user.name}
            </h1>
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
              <Link2 size={14} strokeWidth={1.5} />
              <span className="text-xs sm:text-sm mono-meta">
                {data.links.length} {data.links.length === 1 ? "link" : "links"}
              </span>
            </div>
          </div>
        </header>

        {/* Bento Grid Links */}
        {data.links.length > 0 ? (
          <div className="bento-grid mb-8 sm:mb-12">
            {/* Featured Link (first one, spans 2 columns on desktop) */}
            {firstLink && (
              <div className="bento-span-2">
                <ProfileLink link={firstLink} variant="featured" />
              </div>
            )}
            
            {/* Rest of links in grid */}
            {restLinks.map((link) => (
              <ProfileLink 
                key={link.id} 
                link={link} 
                variant="standard"
              />
            ))}
          </div>
        ) : (
          <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-tight p-12 sm:p-16 text-center shadow-sm">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
              <Link2 size={24} className="sm:w-7 sm:h-7 text-neutral-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-2">No links yet</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-500">
              Check back soon!
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center pt-8 sm:pt-12 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover-lift-subtle transition-all text-xs sm:text-sm">
            <span className="text-neutral-500">Powered by</span>
            <Link2 size={12} className="sm:w-3.5 sm:h-3.5" strokeWidth={1.5} />
            <span className="font-semibold">Solo Link</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
