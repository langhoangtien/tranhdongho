import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/emails/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/emails/create"!</div>
}
