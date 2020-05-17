import React, {lazy} from 'react';

const Login = lazy(() => import('~/src/containers/User/Login'));
const Signup = lazy(() => import('~/src/containers/User/Signup'));

const Blog = lazy(() => import('~/src/containers/Blog'));
const BlogDetail = lazy(() => import('~/src/containers/Blog/components/BlogDetail'));
const CreateBlog = lazy(() => import('~/src/containers/Blog/components/CreateBlog'));

const routes = [
    {
        state: 'login',
        path: '/login',
        exact: true,
        name: 'Login',
        component: Login
    },
    {
        state: 'signup',
        path: '/signup',
        exact: true,
        name: 'Sign up',
        component: Signup
    },
    {
        state: 'blog',
        path: '/blog',
        exact: true,
        name: 'Blog',
        component: Blog,
        resources: [
            {
                state: 'blog.my-blog',
                path: '/blog/my-blog',
                exact: true,
                name: 'My blog',
                component: () => <Blog mine={true} />
            },
            {
                state: 'blog.create',
                path: '/blog/create',
                exact: true,
                name: 'CreateBlog',
                component: CreateBlog
            },
            {
                state: 'blog.detail',
                path: '/blog/:id/view',
                exact: true,
                name: 'BlogDetail',
                component: BlogDetail
            }
        ]
    },
];


// Convert nested routes to simple routes
function convertNestedRoutes(routes) {
    try {
        if (routes.length) {
            routes.forEach(function (route) {
                if (route.resources && route.resources.length) {
                    routes = routes.concat(convertNestedRoutes(route.resources));
                }
            });
        }

        return routes;
    } catch (e) {
        // Error
    }
}

export default convertNestedRoutes(routes);