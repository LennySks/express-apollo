import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GET_POSTS } from "@/graphql/queries";
import { DELETE_POST } from "@/graphql/mutations.ts";
import { useState } from "react";
import { Oval } from "react-loader-spinner";

export function DeletePostModal({ id }: { id: string }) {
  const [deletePost] = useMutation(DELETE_POST, {
    variables: { deletePostId: id },
    refetchQueries: [GET_POSTS],
  });

  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  const handleDeletePost = async () => {
    try {
      setIsDeleting(true);
      const response = await toast.promise(deletePost(), {
        pending: "Deleting post...",
        success: "Post deleted successfully",
        error: "Failed to delete post",
      });
      console.log(response);
      setIsDeleting(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 /> Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Post</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the post?
          </DialogDescription>
        </DialogHeader>
        <div className="flex ml-auto gap-2 mt-5">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDeletePost}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Oval visible={true} height="18" width="18" color="white" />
            ) : (
              "Yes, I am Sure"
            )}
          </Button>
          <DialogClose asChild>
            <Button type="button" size="sm" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </div>
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
