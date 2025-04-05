import { ReactElement } from "react";
import { StyledText } from "../../styles/styled-text";
import { useFetchGet } from "../../hooks/useFetchGet";
import { coursesEndpoint } from "../../config/endpoints.config";
import { Course } from "../../types/course";
import { CourseBox } from "../boxes/course.box";
import { StyledSection } from "../../styles/styled-section";
import styled from "styled-components";

const CoursesWrapper = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const CoursesLoop = (): ReactElement => {
    const { objectData, loading, error } = useFetchGet<Course[]>(coursesEndpoint);
    const courses = objectData?.data;

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
      <StyledSection secondaryColor height="100%">
        <CoursesWrapper>
          {courses.map((course: Course) => (
            <CourseBox 
              courseId={course._id}
              title={course.name}
              price={String(course.price)}
              link={`courses/${course.name}`}
              imageUrl={course.featuredImageUrl}
            />
          ))}
        </CoursesWrapper>
      </ StyledSection>
    </>
};
