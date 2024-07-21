import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { HomePage } from "@/pages/Home"
import { MailPage } from "@/pages/Mail"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/mail",
    element: <MailPage />,
  },
])

export const Routes = () => {
  return <RouterProvider router={router} />
}
