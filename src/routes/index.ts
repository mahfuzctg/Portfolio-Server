import express from "express";

import { AuthRoutes } from "../modules/auth/auth.route";
import { BlogRoutes } from "../modules/blogs/blog.route";
import { ProjectRoutes } from "../modules/projects/project.routes";
import { UserRoutes } from "../modules/users/user.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/blogs",
    route: BlogRoutes,
  },
  {
    path: "/projects",
    route: ProjectRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
