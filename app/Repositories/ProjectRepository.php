<?php
namespace App\Repositories;

use App\Models\Project;

class ProjectRepository
{
    public function allWithFilters(array $filters = [])
    {
        $query = Project::query();

        if (! empty($filters['search'])) {
            $query->where('name', 'like', '%' . $filters['search'] . '%');
        }

        return $query->latest()->paginate(10)->appends($filters);
    }

    public function create(array $data): Project
    {
        return Project::create($data);
    }

    public function update(Project $project, array $data): bool
    {
        return $project->update($data);
    }

    public function delete(Project $project): ?bool
    {
        return $project->delete();
    }
}
