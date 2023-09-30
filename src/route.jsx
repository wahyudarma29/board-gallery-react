import { Outlet, createBrowserRouter } from "react-router-dom";
import LayoutMain from "./layouts/main";

import PageHome, { loader as loaderBoardList } from "./pages/home";
import PageBoardCreate from "./pages/board/create";
import PageBoardDetail, {
  loader as loaderBoardDetail,
} from "./pages/board/detail";
import PageBoardEdit, { loader as loaderBoardEdit } from "./pages/board/edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutMain />,
    children: [
      {
        index: true,
        element: <PageHome />,
        loader: loaderBoardList,
      },
      {
        path: "/board",
        element: <Outlet />,
        children: [
          {
            path: ":id/detail",
            element: <PageBoardDetail />,
            loader: loaderBoardDetail,
          },
          {
            path: "create",
            element: <PageBoardCreate />,
          },
          {
            path: ":id/edit",
            element: <PageBoardEdit />,
            loader: loaderBoardEdit,
          },
        ],
      },
    ],
  },
]);

export default router;
