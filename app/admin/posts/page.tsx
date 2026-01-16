"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/lib/axios";
import { useAuthContext } from "@/components/AuthProvider/AuthProvider";
import ModalCreatePost from "@/components/ModalCreatePost/ModalCreatePost";
import { Button } from "@/components/ui/button";

type Post = {
  id: string | number;
  title: string;
  excerpt?: string;
  coverUrl?: string;
  createdAt?: string;
};

export default function Page() {
  const { isAuthenticated } = useAuthContext();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black">
      <ModalCreatePost open={showModal} onOpenChange={setShowModal} />
      <header className="border-b border-neutral-200">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6">
          <h1 className="text-xl font-semibold tracking-tight">Blog Loot</h1>
          {isAuthenticated ? (
            <Button
              onClick={() => setShowModal(true)}
              className="inline-flex h-9 items-center justify-center rounded-md bg-black px-4 text-sm font-medium text-white transition-colors hover:bg-neutral-900"
            >
              Criar post
            </Button>
          ) : null}
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-xl border border-neutral-200"
              >
                <div className="h-40 w-full bg-neutral-200" />
                <div className="space-y-2 p-4">
                  <div className="h-4 w-3/4 bg-neutral-200" />
                  <div className="h-3 w-1/2 bg-neutral-200" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-md border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-600">
            {error}
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-md border border-neutral-200 bg-neutral-50 p-8 text-center text-sm text-neutral-600">
            Nenhum post publicado ainda.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="overflow-hidden rounded-xl border border-neutral-200 transition-colors hover:border-neutral-300"
              >
                {post.coverUrl ? (
                  <div className="relative h-40 w-full bg-neutral-100">
                    <Image
                      src={post.coverUrl}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-40 w-full bg-neutral-100" />
                )}
                <div className="p-4">
                  <h2 className="line-clamp-2 text-base font-semibold">
                    {post.title}
                  </h2>
                  {post.excerpt ? (
                    <p className="mt-2 line-clamp-3 text-sm text-neutral-600">
                      {post.excerpt}
                    </p>
                  ) : null}
                  {post.createdAt ? (
                    <div className="mt-3 text-xs text-neutral-500">
                      {new Date(post.createdAt).toLocaleDateString("pt-BR")}
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
