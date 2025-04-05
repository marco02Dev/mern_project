import { ReactElement, useContext } from "react";
import { StyledText } from "../themed/StyledText";
import { useFetchGet } from "../../hooks/useFetchGet";
import { Course } from "../../types/course.types";
import { CourseBox } from "../boxes/CourseBox";
import { StyledSection } from "../themed/StyledSection";
import { determineEndpoint } from "../../utils/determine-endpoint.utils";
import { endpoints, Endpoints } from "../../config/endpoints.config";
import { StyledSpace } from "../themed/StyledSpace";
import styled from "styled-components";
import { ThemeModeContextProps, ThemeModeContext } from "../../contexts/ThemeModeProvider";
import { colors } from "../../config/colors.config";

const CoursesWrapper = styled.ul<{$backgroundColor: string}>`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: ${({$backgroundColor}) => $backgroundColor};
`;

type CoursesLoop = {
  limit?: number,
  latest?: boolean
}

export const CoursesLoop = ({limit, latest}: CoursesLoop): ReactElement => {

  const { imagesEndpoint, coursesEndpoint }: Endpoints = endpoints;
  const { mode }: ThemeModeContextProps = useContext(ThemeModeContext);

  const endpoint: string = determineEndpoint({
    defaultEndpoint: coursesEndpoint,
    limit: limit,
    latest: latest
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

  return <>
    <StyledSection height="100%">
      <StyledSpace medium vertical />
      <CoursesWrapper $backgroundColor={backgroundColor}>
        {courses.map((course: Course, index: number): ReactElement => {

          const lastIndex: number = courses.length - 1;
          const isLastCourse: boolean = index === lastIndex;
          const isEven: boolean = (index + 1) % 2 === 0;

          return <>
            <CourseBox 
              key={course._id}
              courseId={course._id}
              title={course.name}
              price={`${String(course.price)}$`}
              link={`courses/${course.category}/${course.name}`}
              imageUrl={`${imagesEndpoint}/products/${course.category}/${course.featuredImageUrl}`}
            />

            {!isEven && <StyledSpace backgroundColor vertical small width={"2%"} height={'100%'} />}
            {isEven && !isLastCourse && <StyledSpace backgroundColor vertical small width={"100%"} />}
          </>
        })}
      </CoursesWrapper>
    </StyledSection>
    </>
};
