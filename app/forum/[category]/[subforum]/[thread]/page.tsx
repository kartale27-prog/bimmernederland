import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";
import { createPost } from "@/app/actions/forum";

type Props = { params: Promise<{ category: string; subforum: string; thread: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { thread: threadId } = await params;
  const t = await prisma.thread.findUnique({ where: { id: threadId } });
  return t ? { title: `${t.titel} | BMW Forum` } : { title: "Forum" };
}

function timeAgo(date: Date) {
  const diff = Date.now() - date.getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "zojuist";
  if (m < 60) return `${m} min geleden`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} uur geleden`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d} dagen geleden`;
  return date.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

export default async function ThreadPage({ params }: Props) {
  const { category: catSlug, subforum: subSlug, thread: threadId } = await params;

  const [thread, session] = await Promise.all([
    prisma.thread.findUnique({
      where: { id: threadId },
      include: {
        author: { select: { username: true, createdAt: true, avatarUrl: true, _count: { select: { posts: true } } } },
        subforum: { include: { category: true } },
        posts: {
          orderBy: { createdAt: "asc" },
          include: { author: { select: { username: true, createdAt: true, avatarUrl: true, _count: { select: { posts: true } } } } },
        },
      },
    }),
    getSession(),
  ]);

  if (!thread || thread.subforum.slug !== subSlug || thread.subforum.category.slug !== catSlug) notFound();

  await prisma.thread.update({ where: { id: threadId }, data: { views: { increment: 1 } } });

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header */}
      <section style={{ background: "linear-gradient(135deg, #0a0a0a, #0d1b3e)", padding: "3rem 1.5rem 2rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "0.5rem", fontSize: "0.85rem", color: "#555", marginBottom: "1rem", flexWrap: "wrap" }}>
            <Link href="/forum" style={{ color: "#1c69d4", textDecoration: "none" }}>Forum</Link>
            <span>›</span>
            <Link href={`/forum/${catSlug}/${subSlug}`} style={{ color: "#1c69d4", textDecoration: "none" }}>{thread.subforum.naam}</Link>
            <span>›</span>
            <span style={{ color: "#888" }}>{thread.titel}</span>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center", marginBottom: "0.75rem" }}>
            {thread.isPinned && <span style={{ background: "rgba(28,105,212,0.2)", color: "#1c69d4", padding: "0.2rem 0.6rem", borderRadius: "0.3rem", fontSize: "0.75rem", fontWeight: 700 }}>📌 Vastgezet</span>}
            {thread.isLocked && <span style={{ background: "rgba(231,76,60,0.15)", color: "#e74c3c", padding: "0.2rem 0.6rem", borderRadius: "0.3rem", fontSize: "0.75rem", fontWeight: 700 }}>🔒 Gesloten</span>}
          </div>
          <h1 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 900, lineHeight: 1.3 }}>{thread.titel}</h1>
          <div style={{ color: "#666", fontSize: "0.85rem", marginTop: "0.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <span>👁 {thread.views} weergaven</span>
            <span>💬 {thread.posts.length} reacties</span>
            <span>📅 {timeAgo(thread.createdAt)}</span>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>
        {/* Posts */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem" }}>
          {thread.posts.map((post, i) => (
            <article key={post.id} style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: "1rem", overflow: "hidden", display: "flex" }}>
              {/* Avatar sidebar */}
              <div style={{ width: "140px", flexShrink: 0, padding: "1.25rem 1rem", borderRight: "1px solid #1e1e1e", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", background: "#141414" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "50%", overflow: "hidden", border: "2px solid #2a2a2a", flexShrink: 0 }}>
                  {post.author.avatarUrl ? (
                    <img src={post.author.avatarUrl} alt={post.author.username} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", background: `hsl(${post.author.username.charCodeAt(0) * 15}, 60%, 35%)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1.1rem", color: "white" }}>
                      {post.author.username[0].toUpperCase()}
                    </div>
                  )}
                </div>
                <div style={{ fontWeight: 700, fontSize: "0.85rem", textAlign: "center", wordBreak: "break-all" }}>{post.author.username}</div>
                <div style={{ color: "#555", fontSize: "0.72rem", textAlign: "center" }}>{post.author._count.posts} berichten</div>
                {i === 0 && <div style={{ background: "rgba(28,105,212,0.2)", color: "#1c69d4", padding: "0.15rem 0.5rem", borderRadius: "0.25rem", fontSize: "0.7rem", fontWeight: 700 }}>OP</div>}
              </div>
              {/* Post content */}
              <div style={{ flex: 1, padding: "1.25rem 1.5rem" }}>
                <div style={{ color: "#555", fontSize: "0.8rem", marginBottom: "0.75rem" }}>
                  #{i + 1} · {timeAgo(post.createdAt)}
                </div>
                <div style={{ color: "#ddd", lineHeight: 1.8, fontSize: "0.95rem", whiteSpace: "pre-wrap" }}>{post.inhoud}</div>
              </div>
            </article>
          ))}
        </div>

        {/* Reply form */}
        {!thread.isLocked && session ? (
          <div style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: "1rem", padding: "1.75rem" }}>
            <h3 style={{ fontWeight: 700, marginBottom: "1rem" }}>Reageren</h3>
            <form action={createPost} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <input type="hidden" name="threadId" value={thread.id} />
              <textarea name="inhoud" rows={6} placeholder="Schrijf je reactie..." required
                style={{ width: "100%", background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: "0.5rem", padding: "0.75rem 1rem", color: "white", fontSize: "0.95rem", outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="submit"
                  style={{ background: "#1c69d4", color: "white", border: "none", borderRadius: "0.5rem", padding: "0.75rem 1.75rem", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer" }}>
                  Reactie plaatsen
                </button>
              </div>
            </form>
          </div>
        ) : !thread.isLocked && !session ? (
          <div style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: "1rem", padding: "2rem", textAlign: "center" }}>
            <p style={{ color: "#888", marginBottom: "1rem" }}>Je moet ingelogd zijn om te reageren</p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
              <Link href="/inloggen" style={{ background: "transparent", color: "white", border: "1px solid #2a2a2a", padding: "0.6rem 1.25rem", borderRadius: "0.5rem", textDecoration: "none", fontWeight: 600 }}>Inloggen</Link>
              <Link href="/registreren" style={{ background: "#1c69d4", color: "white", padding: "0.6rem 1.25rem", borderRadius: "0.5rem", textDecoration: "none", fontWeight: 600 }}>Registreren</Link>
            </div>
          </div>
        ) : (
          <div style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: "1rem", padding: "1.5rem", textAlign: "center", color: "#666" }}>
            🔒 Dit topic is gesloten voor nieuwe reacties.
          </div>
        )}
      </div>
    </div>
  );
}
