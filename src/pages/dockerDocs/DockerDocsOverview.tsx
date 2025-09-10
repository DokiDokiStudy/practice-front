import { DockerDocsSectionList } from "@/widgets/dockerDocs";

export function DockerDocsOverview() {
  return (
    <div className="flex-1 bg-white py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Docker Docs</h1>
        <DockerDocsSectionList />
      </div>
    </div>
  );
}
