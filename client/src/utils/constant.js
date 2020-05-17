export const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a validate email!',
        number: '${label} is not a validate number!'
    },
    number: {
        range: '${label} must be between ${min} and ${max}'
    }
};

export const userPathNames = [
    '/login',
    '/signup'
];

export const needAuthPathnames = [
    '/blog/create',
    '/blog/my-blog'
];