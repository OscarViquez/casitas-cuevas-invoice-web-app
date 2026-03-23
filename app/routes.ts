import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("layouts/AppLayout.tsx", [
    index("routes/home.tsx"),
    route("new", "routes/invoice.new.tsx"),
    route("invoice/preview", "routes/invoice.preview.tsx"),
    route("invoice/:id", "routes/invoice.$id.tsx"),
    route("settings", "routes/settings.tsx"),
  ]),
] satisfies RouteConfig;
