import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/products/optilife-blend')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/products/optilife-blend"!</div>
}
