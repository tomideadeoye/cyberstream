import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogTrigger, DialogContent } from "@radix-ui/react-dialog";
import { DialogHeader } from "./ui/dialog";

export type ReviewType = {
  "@type": "Review";
  itemReviewed: {
    "@type": "Movie";
    url: string;
  };
  author: {
    "@type": "Person";
    name: string;
  };
  inLanguage: string;
  dateCreated: string;
  name: string;
  reviewBody: string;
  reviewRating: {
    "@type": "Rating";
    worstRating: number;
    bestRating: number;
    ratingValue: number;
  };
};

export default function Review({ review }: { review: ReviewType }) {
  const author = review?.author;
  if (!author) {
    return null;
  }

  const content = review?.reviewBody.replace(/&apos;/g, " ");

  return (
    <article className="text-start">
      <div className="flex items-center mb-4 gap-4">
        <Avatar>
          <AvatarFallback>{review?.author?.name[0]}</AvatarFallback>
        </Avatar>
        <div className="font-medium dark:text-white">
          <p>
            {review.author.name}
            <time className="block text-sm text-gray-500 dark:text-gray-400">
              {review.dateCreated}
            </time>
          </p>
        </div>
      </div>
      <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
        {Array.from({ length: review?.reviewRating?.ratingValue }).map(
          (_, i) => (
            <svg
              key={i}
              className="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          )
        )}
        <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">
          {review.name}
        </h3>
      </div>
      <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
        <p>
          Reviewed in {review?.inLanguage} on <time>{review?.dateCreated}</time>
        </p>
      </footer>

      <Dialog>
        <DialogTrigger asChild>
          <div>
            <p className="mb-3 text-gray-500 dark:text-gray-400 text-start line-clamp-3">
              {content}
            </p>
            <a className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
              Read more
            </a>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <p className="mb-3 text-gray-500 dark:text-gray-400 text-start">
              {content}
            </p>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {review?.reviewRating?.ratingValue && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Rating value: {review?.reviewRating?.ratingValue}
        </p>
      )}
    </article>
  );
}
