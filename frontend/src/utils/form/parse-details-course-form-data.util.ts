export const parseDetailsCourseFormData = (detailsStr: string): { title: string, content: string }[] => {
    const regex = /title=([^,]+),\s*content=([^,]+(?:,[^,]+)*)/g;
    const result: { title: string, content: string }[] = [];
    let match: any;

    while ((match = regex.exec(detailsStr)) !== null) {
        const title = match[1].trim();
        const content = match[2].trim();
        result.push({ title, content });
    }

    return result;
};