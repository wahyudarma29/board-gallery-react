import { Outlet, createBrowserRouter } from "react-router-dom";
import LayoutMain from "./layouts/main";

import PageHome from "./pages/home";
import PageBoardCreate from "./pages/board/create";
import PageBoardDetail from "./pages/board/detail";
import PageBoardEdit from "./pages/board/edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutMain />,
    children: [
      {
        index: true,
        element: <PageHome />,
      },
      {
        path: "/board",
        element: <Outlet />,
        children: [
          {
            path: ":id/detail",
            element: <PageBoardDetail />,
          },
          {
            path: "create",
            element: <PageBoardCreate />,
          },
          {
            path: ":id/edit",
            element: <PageBoardEdit />,
          },
        ],
      },
    ],
  },
]);

export default router;
