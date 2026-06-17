import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { Work } from "./components/Work";
import { WorkExperience } from "./components/WorkExperience";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "work", Component: Work },
      { path: "experience", Component: WorkExperience },
    ],
  },
]);
