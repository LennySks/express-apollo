import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { CREATE_POST } from "@/graphql/mutations.ts";
import { GET_POSTS } from "@/graphql/queries.ts";
import { useMutation } from "@apollo/client";

export const CreatePostModal = () => {
  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [GET_POSTS],
  });

  const handleCreatePost = async (values: {
    title: string;
    content: string;
  }) => {
    try {
      const response = await toast.promise(
        createPost({
          variables: {
            input: values,
          },
        }),
        {
          pending: "Creating post...",
          success: "Post created successfully",
          error: "Failed to create post",
        },
      );

      console.log(response);
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
        <Button variant="outline">Create Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>
            Insert the following fields to create a new post.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={{ title: "", content: "" }}
          validationSchema={validationSchema}
          onSubmit={handleCreatePost}
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
                  disabled={isSubmitting}
                >
                  Add Post
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
