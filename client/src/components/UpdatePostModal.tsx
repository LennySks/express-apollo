import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Post } from "@/__generated__/types.ts";
import { UPDATE_POST } from "@/graphql/mutations.ts";
import { useMutation } from "@apollo/client";
import { GET_POST } from "@/graphql/queries.ts";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";

export const UpdatePostModal: React.FC<{ post: Post }> = ({ post }) => {
  const [updatePost] = useMutation(UPDATE_POST, {
    variables: {
      updatePostId: post.id,
      updatePostInput: {
        title: post.title,
        content: post.content,
      },
      refetchQueries: [GET_POST],
    },
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdatePost = async (values: {
    title: string;
    content: string;
  }) => {
    try {
      setIsUpdating(true);

      const response = await toast.promise(
        updatePost({
          variables: {
            updatePostId: post.id,
            input: values,
          },
        }),
        {
          pending: "Updating post...",
          success: "Post updated successfully",
          error: "Failed to update post",
        },
      );

      console.log(response);
      setIsUpdating(false);
    } catch (error) {
      console.error(error);
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
          <DialogDescription>
            Make changes to your post here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={{ title: post.title, content: post.content }}
          validationSchema={validationSchema}
          onSubmit={handleUpdatePost}
        >
          {({ isSubmitting }) => (
            <Form className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Field
                  id="title"
                  name="title"
                  as={Input}
                  className="col-span-3"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="col-span-4 text-red-500 text-xs"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">
                  Content
                </Label>
                <Field
                  id="content"
                  name="content"
                  as={Input}
                  className="col-span-3"
                />
                <ErrorMessage
                  name="content"
                  component="div"
                  className="col-span-4 text-red-500 text-xs"
                />
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  variant={"secondary"}
                  disabled={isSubmitting || isUpdating}
                >
                  Save changes
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
