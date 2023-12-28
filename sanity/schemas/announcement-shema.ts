const announcement = {
  title: "Ανακοίνωση",
  name: "announcement",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Τίτλος",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Id",
      type: "slug",
      options: { source: "title" },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "content",
      title: "Περιγραφή",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule: any) => Rule.required(),
    },
  ],
};
export default announcement;
