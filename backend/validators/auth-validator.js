const {z} = require("zod");

const signupschema = z.object({
    fname : z
    .string()
    .trim()
    .min(1, { message: "Full Name can not be empty." })
    .min(3,{message: "Full Name must not be less than 3 charcters."})
    .max(30,{message: "Full Name must not be more than 30 charcters."})
    ,
    email: z
        .string()
        .email({ message: "Invalid email format." })
        .min(1, { message: "Email can not be empty." })
        .max(255, { message: "Email must not be more than 255 characters." }),
    password: z
        .string()
        .min(1, { message: "Password can not be empty." })
        .min(6, { message: "Password must be at least 6 characters long." })
        .max(50, { message: "Password must not be more than 50 characters." })
        .refine((value) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value), {
            message: "Password must contain at least one special character."
        }),
    usertype: z
    .string()
    .min(1, { message: "Select at least one option." })
});

module.exports = signupschema;