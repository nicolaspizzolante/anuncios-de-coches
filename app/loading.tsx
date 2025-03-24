import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
    </div>
  );
}