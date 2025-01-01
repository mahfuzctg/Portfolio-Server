import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BlogRoutes } from "../modules/blogs/blog.route";
import { CertificateRoutes } from "../modules/certificates/certificate.routes";
import { CoursesRoutes } from "../modules/courses/course.routes";
import { EducationRoutes } from "../modules/educations/education.routes";
import { ProjectRoutes } from "../modules/projects/project.routes";
import { SkillRoutes } from "../modules/skills/skill.routes";
import { UserRoutes } from "../modules/users/user.route";

const router = express.Router();

// Define all module routes
const moduleRoutes = [
  { path: "/auth", route: AuthRoutes },
  { path: "/users", route: UserRoutes },
  { path: "/blogs", route: BlogRoutes },
  { path: "/projects", route: ProjectRoutes },
  { path: "/certificates", route: CertificateRoutes },
  { path: "/educations", route: EducationRoutes },
  { path: "/skills", route: SkillRoutes },
  { path: "/courses", route: CoursesRoutes },
];

// Register each module's routes
moduleRoutes.forEach((module) => router.use(module.path, module.route));

export default router;
