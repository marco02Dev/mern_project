import { Dispatch, Fragment, ReactElement, SetStateAction, useState } from "react";
import { FC } from "react";
import { StyledText } from "../themed/StyledText";
import { useFetchGet } from "../../hooks/data/useFetchGet";
import { Course } from "../../types/course.types";
import { CourseBox } from "../boxes/CourseBox";
import { determineUseFetchGetEndpoint } from "../../utils/components/determine-use-fetch-get-endpoint.util";
import { endpoints, Endpoints } from "../../config/endpoints.config";
import { StyledSpace } from "../themed/StyledSpace";
import styled from "styled-components";
import { UseMediaQuery, useMediaQuery } from "../../hooks/ui/useMediaQuery";
import { sizes } from "../../config/sizes.config";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { CategoriesFilterLoop } from "./CategoriesFilterLoop";
import { sumStringDelays } from "../../utils/components/sum-string-delays.util";
import { useThemeColors, ThemeColors } from "../../hooks/theme/useThemeColors";
import { CoursesDataChangedState } from "../../store/slices/courses-data-changed.slice";

const CoursesWrapper = styled.ul<{$backgroundColor: string}>`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

type CoursesLoop = {
  limit?: number,
  latest?: boolean,
  category?: string,
  purchasedProducts?: string[] | null,
  setProductsNumber?: Dispatch<SetStateAction<number | undefined>>,
  categoriesFilter?: boolean,
  resetIncrementalDelay?: boolean,
  setResetIncrementalDelay?: Dispatch<SetStateAction<boolean>>,
  AdditionalButtons?: FC
}

export const CoursesLoop: FC<CoursesLoop> = ({
  limit, 
  latest, 
  category, 
  purchasedProducts, 
  setProductsNumber, 
  categoriesFilter,
  AdditionalButtons
}: CoursesLoop): ReactElement => {
  const { isMobile, isTablet}: UseMediaQuery = useMediaQuery();
  const { backgroundColor }: ThemeColors = useThemeColors();
  const { coursesEndpoint }: Endpoints = endpoints;
  const { dataChanged }: CoursesDataChangedState = useSelector((state: RootState) => state.coursesDataChanged);
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>("");
  const isCategory: string | undefined = categoryFilter ? categoryFilter : category ? category : "";
  let incrementalDelay: string = "100ms";

  const endpoint: string = determineUseFetchGetEndpoint({
    defaultEndpoint: coursesEndpoint,
    latest: latest,
    category: isCategory,
    productsId: purchasedProducts && purchasedProducts
  });

  const { objectData } = useFetchGet<Course[]>(endpoint, setProductsNumber, dataChanged);
  const courses = objectData?.data;
  const limitedCourses: Course[] | undefined = courses?.slice(0, limit);

  if (!courses) {
      return <StyledText content="No courses available" tag="h3" />;
  }

  return <>

    {categoriesFilter && <CategoriesFilterLoop setCategoryFilter={setCategoryFilter} categoryFilter={categoryFilter} />}

    <StyledSpace medium vertical/>

    <CoursesWrapper $backgroundColor={backgroundColor}>
      {limitedCourses?.map((course: Course, index: number): ReactElement => {
        const istheThirdOne: boolean = (index + 1) % 3 === 0;
        const isEven: boolean = (index + 1) % 2 === 0;
        const isOdd: boolean = (index + 1) % 2 !== 0;

        if(index >= 1) {
          incrementalDelay = sumStringDelays(incrementalDelay, "100ms");
          
          if(index % 3 === 0) {
            incrementalDelay = "200ms";
          }
        }
        
        return <Fragment key={dataChanged ? `${categoriesFilter}-${index}` : index}>
          <CourseBox 
            courseId={course?._id}
            title={course?.name!}
            price={`${String(course?.price)}$`}
            link={`/courses/${course?.category}/${course?.name?.replace(/\s+/g, '-')}`}
            category={course?.category}
            imageUrl={`https://res.cloudinary.com/dqwoo44z8/image/upload/web-courses/products/${course.category}/${course._id}/product-image-${course._id}.webp`}
            heroImage={`https://res.cloudinary.com/dqwoo44z8/image/upload/web-courses/products/${course.category}/${course._id}/hero-image-${course._id}.webp`}
            details={course.details}
            delay={incrementalDelay}
            AdditionalButtons={AdditionalButtons}
          />

          {/* Mobile */}
          {isMobile && <StyledSpace small vertical height={sizes.spaces.medium} width="100%"/>} 

          {/* Tablet */}
          {!isMobile && isTablet && isOdd && <StyledSpace horizontal height="100%" width={"3.4%"}/>}
          {!isMobile && isTablet && isEven && <StyledSpace vertical height={sizes.spaces.medium} width={"100%"}/>}

          {/* Desktop */}
          {!isMobile && !isTablet && !istheThirdOne && <StyledSpace horizontal height="100%" width={"1.7%"}/>}
          {!isMobile && !isTablet && istheThirdOne && <StyledSpace vertical height={sizes.spaces.medium} width={"100%"}/>}
        </Fragment >
      })}
    </CoursesWrapper>
  </>
};
