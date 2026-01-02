import { Button } from "../../components/ui/Button";

export function CourseDetail() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold">React Masterclass</h1>
        <p className="text-[rgb(var(--muted))] mt-2">
          Learn React with live projects
        </p>
      </div>

      <div className="border rounded-xl p-4">
        <h3 className="text-xl font-semibold mb-2">₹1999</h3>
        <Button className="w-full">Buy Course</Button>
      </div>
    </div>
  );
}
