<?php
namespace App\Services;

use App\Models\Project;
use App\Repositories\ProjectRepository;

class ProjectService
{
    public function __construct(protected ProjectRepository $repo)
    {}

    public function getPaginated(array $filters)
    {
        return $this->repo->allWithFilters($filters);
    }

    public function store(array $data)
    {
        return $this->repo->create($data);
    }

    public function update(Project $project, array $data)
    {
        return $this->repo->update($project, $data);
    }

    public function delete(Project $project)
    {
        return $this->repo->delete($project);
    }
}
