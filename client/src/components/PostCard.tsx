"use client";

import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Post } from "@/__generated__/graphql.ts";

export const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const { title, content, addedAt, user } = post;
  const voteCount = 120;

  return (
    <Card className="mx-auto max-w-2xl">
      <CardContent className="p-4">
        <div className="flex">
          <div className="mr-4 flex flex-col items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-orange-500 hover:text-orange-600"
            >
              <ArrowBigUp className="h-6 w-6" />
            </Button>
            <span className="text-sm font-medium">{voteCount}</span>
            <Button
              variant="ghost"
              size="icon"
              className="text-blue-500 hover:text-blue-600"
            >
              <ArrowBigDown className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex-grow">
            <div className="mb-2 flex items-center gap-1">
              <img
                src="https://placehold.co/24x24/000000/FFFFFF.svg"
                className="rounded-full"
                alt="placeholder image"
                width={24}
                height={24}
              />
              <span className="text-xs text-gray-500 ">• {user?.username}</span>
            </div>
            <h2 className="mb-2 text-xl font-semibold">{title}</h2>
            <p className="mb-4 text-gray-600 ">{content}</p>
            <p className="text-xs text-gray-500 ">{formattedDate}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between bg-gray-50 px-4 py-2 ">
        <Button variant="ghost" size="sm" className="text-black ">
          <ArrowBigUp className="mr-2 h-4 w-4" />
          {voteCount} Votes
        </Button>
      </CardFooter>
    </Card>
  );
};
