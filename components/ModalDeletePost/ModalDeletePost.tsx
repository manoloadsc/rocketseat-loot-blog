import React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { deletePost } from "../../routes/post";
import { toast } from "sonner";

type ModalDeletePostProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId: string | null;
  getPosts: () => void;
};

export default function ModalDeletePost({
  open,
  onOpenChange,
  postId,
  getPosts,
}: ModalDeletePostProps) {
  const onDelete = async () => {
    if (!postId) {
      return;
    }
    try {
      const response = await deletePost(postId);

      if (response.status === 200) {
        toast.success("Post excluído com sucesso!");
        getPosts();
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que quer excluir?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente o
            post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onDelete()}
            className="bg-red-500 hover:bg-red-600 border border-red-700 cursor-pointer"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
