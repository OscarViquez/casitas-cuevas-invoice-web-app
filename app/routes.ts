import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("new", "routes/invoice.new.tsx"),
] satisfies RouteConfig;
