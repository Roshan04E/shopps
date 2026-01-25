// components/ui/spinner.tsx
export default function Spinner() {
  return (
    <div className="w-full flex items-center justify-center py-20">
      <div className="h-8 w-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
    </div>
  )
}
