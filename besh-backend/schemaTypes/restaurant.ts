 
export default {
    name: "restaurant",
    title: "Restaurants",
    type: "document",
    fields: [
        {
            name: "name",
            type: "string",
            validation: (rule) => rule.required(),
        },
        
 
        {
            name: "description",
            type: "string",
            validation: (rule) => rule.max(200),
        },
        {
            name: "image",
            type: "image",
            title: "Image of the restaurant"
        },
        {
            name: "lat",
            type:"number",
            title: "latitude"
        },
        {
            name: "lng",
            type: "number",
            title: "longtitude"
        },
        {
            name: "address",
            type: "string",
            title: "Restaurant Address",
            validation: (rule) => rule.required(),
        },
        {
            name: 'rating',
            type: "number",
            title: "Enter number 1 to 5",
            validation: (rule) => rule.required(),
        },
        {
            name: "Reviews",
            type: "string",
            title: "Reviews"
        },
        {
            name: "type",
            title: "Category",
            validation: rule => rule.required(),
            type: "reference",
            to: [{type: "category"}]
        },
        {
            name: "dishes",
            type: "array",
            of: [{ type: "reference", to: [{ type: "dish" }] }],
        }
    ]
}