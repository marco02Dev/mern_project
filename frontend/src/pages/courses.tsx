import { ReactElement } from "react";
import { StyledText } from "../styles/styled-text";
import { useFetchGet } from "../hooks/useFetchGet";
import { coursesEndpoint } from "../config/endpoints.config";
import { Course } from "../types/course";

export const Courses = (): ReactElement => {
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

    return (
      <div>
        <h1>Fetched Courses</h1>
        <ul>
          {courses.map((course: Course) => (
            <li key={course._id}>
              {course.name} - {course.price}
            </li>
          ))}
        </ul>
      </div>
    );
};
