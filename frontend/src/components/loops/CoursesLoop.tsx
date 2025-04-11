import { Fragment, ReactElement, useContext } from "react";
import { FC } from "react";
import { StyledText } from "../themed/StyledText";
import { useFetchGet } from "../../hooks/useFetchGet";
import { Course } from "../../types/course.types";
import { CourseBox } from "../boxes/CourseBox";
import { determineUseFetchGetEndpoint } from "../../utils/determine-endpoint.util";
import { endpoints, Endpoints } from "../../config/endpoints.config";
import { StyledSpace } from "../themed/StyledSpace";
import styled from "styled-components";
import { ThemeModeContextProps, ThemeModeContext } from "../../contexts/ThemeModeProvider";
import { colors } from "../../config/colors.config";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { sizes } from "../../config/sizes.config";

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
  category?: string
}

export const CoursesLoop: FC<CoursesLoop> = ({limit, latest, category }: CoursesLoop): ReactElement => {
  const { isMobile, isTablet} = useMediaQuery();
  const { imagesEndpoint, coursesEndpoint }: Endpoints = endpoints;
  const { mode }: ThemeModeContextProps = useContext(ThemeModeContext);

  const endpoint: string = determineUseFetchGetEndpoint({
    defaultEndpoint: coursesEndpoint,
    limit: limit,
    latest: latest,
    category: category
  });

  const { objectData, loading, error } = useFetchGet<Course[]>(endpoint);
  const courses = objectData?.data;
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

  return <CoursesWrapper $backgroundColor={backgroundColor}>
    {courses.map((course: Course, index: number): ReactElement => {
      const istheThirdOne: boolean = (index + 1) % 3 === 0;
      const isEven: boolean = (index + 1) % 2 === 0;
      const isOdd: boolean = (index + 1) % 2 !== 0;
      
      return <Fragment key={index}>
        <CourseBox 
          courseId={course._id}
          title={course.name}
          price={`${String(course.price)}$`}
          link={`${course.category}/${course.name}`}
          category={course.category}
          imageUrl={`${imagesEndpoint}/products/${course.category}/${course._id}/feature-image.webp`}
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
};
