"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/lib/axios";
import { useAuthContext } from "@/components/AuthProvider/AuthProvider";
import ModalCreatePost from "@/components/ModalCreatePost/ModalCreatePost";
import { Button } from "@/components/ui/button";
import { getPosts } from "@/routes/post";
import ModalEditPost from "@/components/ModalEditPost/ModalEditPost";
import { Trash2 } from "lucide-react";
import ModalDeletePost from "@/components/ModalDeletePost/ModalDeletePost";

type Post = {
  id: string;
  title: string;
  content: string;
  category: {
    name: string;
    id: string;
  };
  createdAt?: string;
};

export default function Page() {
  const { isAuthenticated } = useAuthContext();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [postsData, setPostsData] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  async function getPostsData() {
    try {
      const response = await getPosts();
      setPostsData(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async () => {
      await getPostsData();
    })();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <ModalCreatePost
        getPosts={getPostsData}
        open={showModal}
        onOpenChange={setShowModal}
      />
      <ModalEditPost
        getPosts={getPostsData}
        open={showEditModal}
        onOpenChange={setShowEditModal}
        postId={selectedPostId}
      />
      <ModalDeletePost
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        postId={selectedPostId}
        getPosts={getPostsData}
      />
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
        ) : postsData.length === 0 ? (
          <div className="rounded-md border border-neutral-200 bg-neutral-50 p-8 text-center text-sm text-neutral-600">
            Nenhum post publicado ainda.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {postsData.map((post) => (
              <article
                key={post.id}
                className="overflow-hidden rounded-xl border border-neutral-200 transition-colors hover:border-neutral-300"
              >
                <div className="p-4">
                  <div className="flex justify-between items-center gap-2">
                    <span className="inline-flex text-foreground items-center rounded-full bg-neutral-100 px-2 py-1 text-xs font-mediu">
                      {post.category?.name || "Sem categoria"}
                    </span>
                    <div className="flex gap-1">
                      <Button
                        className="cursor-pointer"
                        onClick={() => {
                          setShowEditModal(true);
                          setSelectedPostId(post.id);
                        }}
                      >
                        Editar
                      </Button>
                      <Button
                        onClick={() => {
                          setShowDeleteModal(true);
                          setSelectedPostId(post.id);
                        }}
                        className="cursor-pointer bg-red-500 hover:bg-red-600 border border-red-700 text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <h2 className="mt-2 line-clamp-2 text-base font-semibold">
                    {post.title}
                  </h2>
                  {post.content ? (
                    <p className="mt-2 line-clamp-3 text-sm text-neutral-600">
                      {post.content}
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
