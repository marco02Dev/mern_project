import { Dispatch, Fragment, ReactElement, SetStateAction, useContext, useState } from "react";
import { FC } from "react";
import { StyledText } from "../themed/StyledText";
import { useFetchGet } from "../../hooks/useFetchGet";
import { Course } from "../../types/course.types";
import { CourseBox } from "../boxes/CourseBox";
import { determineUseFetchGetEndpoint } from "../../utils/components/determine-use-fetch-get-endpoint.util";
import { endpoints, Endpoints } from "../../config/endpoints.config";
import { StyledSpace } from "../themed/StyledSpace";
import styled from "styled-components";
import { ThemeModeContextProps, ThemeModeContext } from "../../contexts/ThemeModeProvider";
import { colors } from "../../config/colors.config";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { sizes } from "../../config/sizes.config";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { CategoriesFilterLoop } from "./CategoriesFilterLoop";
import { sumStringDelays } from "../../utils/components/sum-string-delays.util";
import { useLocation, Location } from "react-router-dom";

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
}

export const CoursesLoop: FC<CoursesLoop> = ({
  limit, 
  latest, 
  category, 
  purchasedProducts, 
  setProductsNumber, 
  categoriesFilter
}: CoursesLoop): ReactElement => {
  const { isMobile, isTablet} = useMediaQuery();
  const { imagesEndpoint, coursesEndpoint }: Endpoints = endpoints;
  const { mode }: ThemeModeContextProps = useContext(ThemeModeContext);
  const { dataChanged } = useSelector((state: RootState) => state.coursesDataChanged);
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>("");
  const isCategory: string | undefined = categoryFilter ? categoryFilter : category ? category : "";
  const location: Location = useLocation();
  const path: string = location.pathname;
  const isAdminPage: boolean = path === "/admin";
  let incrementalDelay: string = "100ms";

  const endpoint: string = determineUseFetchGetEndpoint({
    defaultEndpoint: coursesEndpoint,
    latest: latest,
    category: isCategory,
    productsId: purchasedProducts && purchasedProducts
  });

  const { objectData, loading, error } = useFetchGet<Course[]>(endpoint, setProductsNumber, dataChanged);
  const courses = objectData?.data;
  const limitedCourses: Course[] | undefined = courses?.slice(0, limit);
  const backgroundColor: string = mode === "dark" ? colors.dark.backgroundColorSecondary : colors.light.backgroundColorSecondary;

  if (loading) {
    return <StyledText content="Loading..." tag="h2" />;
  }

  if (error) {
    return <StyledText content="Error" tag="h2" />;
  }

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
            details={course.details}
            delay={incrementalDelay}
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
