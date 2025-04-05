import { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { StyledText } from "../components/themed/StyledText";
import { coursesEndpoint } from "../config/endpoints.config";
import { useFetchGet } from "../hooks/useFetchGet";
import { Course } from "../types/course.types";

export const Categories = ({}): ReactElement => {
    const { category } = useParams(); 
    const endpointWithCategory = `${coursesEndpoint}/${category}`;

    const { objectData, loading, error } = useFetchGet<Course[]>(endpointWithCategory);
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
        <h2>{category}</h2>
        <ul>
          {courses.map((course: Course) => (
            <li key={course._id}>
              {course.name} - {course.price}
            </li>
          ))}
        </ul>
      </div>
    );
}