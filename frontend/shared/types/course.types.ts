type NameOrTitle =
  | { name: string; title?: never }
  | { title: string; name?: never };

type ImageUrlVariant =
  | { featuredImageUrl: string; imageUrl?: never }
  | { imageUrl: string; featuredImageUrl?: never }
  | { featuredImageUrl?: undefined; imageUrl?: undefined };

type CourseBase = NameOrTitle &
  ImageUrlVariant & {
    price: number | string;
    category: string;
    details?: {
      title: string;
      content: string;
    }[];
    tags?: string[];
    heroImage?: string;
  };

export type Course =
| (CourseBase & { _id: string; courseId?: never })
| (CourseBase & { courseId: string; _id?: never })
| (CourseBase & { _id?: undefined; courseId?: undefined });
