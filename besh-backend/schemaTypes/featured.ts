import {   defineType } from "sanity";

export default defineType({
    name: "featured",
    title: "Featured",
    type: "document",
    fields: [
       {
            name: "name",
            title: "Featured Name",
            type: "string",
            validation: (rule) => rule.required(),
        },
     {
            name: "description",
            title: "Featured Description",
            type: "string",
            validation: (rule) => rule.max(200),
        },
         {
            name:  "restaurants",
            type: "array",
            of: [{type: "reference", to: [{type: "restaurant"}]}]
         }
    ],
})