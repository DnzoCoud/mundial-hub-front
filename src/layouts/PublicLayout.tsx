import type { ComponentChild } from "@app/app/types/basic.type";

export default function PublicLayout({ children }: ComponentChild) {
  return (
    <main>
      {children}
    </main>
  )
}
