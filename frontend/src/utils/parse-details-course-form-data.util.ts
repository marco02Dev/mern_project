export const parseDetailsCourseFormData = (detailsStr: string): { title: string, content: string }[] => {
    const parts = detailsStr.split(',');
    const result: { title: string, content: string }[] = [];

    for (let i = 0; i < parts.length; i += 2) {
        const titlePart = parts[i];
        const contentPart = parts[i + 1];

        if (titlePart && contentPart) {
            const title = titlePart.replace(/^title="/, '').replace(/"$/, '');
            const content = contentPart.replace(/^content="/, '').replace(/"$/, '');

            result.push({ title, content });
        }
    }

    return result;
}
