import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/products/purfect-fuel-blend')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/products/purfect-fuel-blend"!</div>
}
