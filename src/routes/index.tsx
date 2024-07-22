import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { HomePage } from "@/pages/Home"
import { MailPage } from "@/pages/Mail"
import { Layout } from "@/components/Layout"
import { RouterPath } from "./path"

const router = createBrowserRouter([
  {
    path: RouterPath.root,
    element: <Layout />,
    children: [
      { path: RouterPath.home, element: <HomePage /> },
      { path: RouterPath.mail, element: <MailPage /> },
    ],
  },
])

export const Routes = () => {
  return <RouterProvider router={router} />
}
