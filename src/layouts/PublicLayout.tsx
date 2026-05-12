import type { ComponentChild } from "@/app/types/basic.type";


export default function PublicLayout({ children }: ComponentChild) {
  return (
    <main>
      {children}
    </main>
  )
}
